'use client';
/**
 * Ohio dispensary locator. Neutral by design: every state-licensed dispensary, no ranking,
 * no sponsored spots, no reviews. Data: content/dispensaries.json (Division of Cannabis Control).
 * Map: Leaflet + OpenStreetMap tiles, loaded only in the browser.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Map as LMap, CircleMarker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import data from '@/content/dispensaries.json';
import s from './locator.module.css';

export type Dispensary = (typeof data.dispensaries)[number];
type Origin = { lat: number; lng: number; label: string };
type Places = { zips: Record<string, [number, number]>; cities: Record<string, [number, number]> };

const OHIO: [number, number] = [40.3, -82.8];
const all = data.dispensaries;
const counties = Array.from(new Set(all.map((d) => d.county))).sort();

const miles = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const r = (x: number) => (x * Math.PI) / 180;
  const h = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2;
  return 2 * 3958.8 * Math.asin(Math.sqrt(h));
};
const esc = (t: string) => t.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const fullAddress = (d: Dispensary) => `${d.address}, ${d.city}, OH ${d.zip}`;
const directions = (d: Dispensary) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${d.name}, ${fullAddress(d)}`)}`;

export function Locator() {
  const [query, setQuery] = useState('');
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [county, setCounty] = useState('');
  const [radius, setRadius] = useState(0);
  const [sort, setSort] = useState<'nearest' | 'az'>('az');
  const [text, setText] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [message, setMessage] = useState('');
  const [locating, setLocating] = useState(false);

  const mapEl = useRef<HTMLDivElement>(null);
  const map = useRef<LMap | null>(null);
  const markers = useRef(new Map<number, CircleMarker>());
  const places = useRef<Places | null>(null);
  const listEl = useRef<HTMLOListElement>(null);

  const results = useMemo(() => {
    let r = all.map((d) => ({ d, dist: origin ? miles(origin, d) : null as number | null }));
    if (county) r = r.filter((x) => x.d.county === county);
    if (text) { const t = text.toLowerCase(); r = r.filter((x) => `${x.d.name} ${x.d.legalName} ${x.d.address} ${x.d.city}`.toLowerCase().includes(t)); }
    if (origin && radius) r = r.filter((x) => (x.dist ?? 0) <= radius);
    r.sort((a, b) => (sort === 'nearest' && a.dist !== null && b.dist !== null ? a.dist - b.dist : a.d.name.localeCompare(b.d.name) || a.d.city.localeCompare(b.d.city)));
    return r;
  }, [origin, county, text, radius, sort]);

  // Create the map once, in the browser only.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !mapEl.current || map.current) return;
      const m = L.map(mapEl.current, { center: OHIO, zoom: 7, scrollWheelZoom: true });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(m);
      all.forEach((d) => {
        const mk = L.circleMarker([d.lat, d.lng], { radius: 7, color: '#ffffff', weight: 2, fillColor: '#0E4D4A', fillOpacity: 1 })
          .bindPopup(`<strong>${esc(d.name)}</strong><br>${esc(fullAddress(d))}${d.approx ? '<br><em>Approximate map location</em>' : ''}<br><a href="${directions(d)}" target="_blank" rel="noopener noreferrer">Get directions</a>`)
          .on('click', () => setSelected(d.id));
        mk.addTo(m); markers.current.set(d.id, mk);
      });
      map.current = m;
    })();
    return () => { cancelled = true; map.current?.remove(); map.current = null; markers.current.clear(); };
  }, []);

  // Show only the current results and fit the view to them.
  useEffect(() => {
    const m = map.current; if (!m) return;
    const ids = new Set(results.map((x) => x.d.id));
    markers.current.forEach((mk, id) => { if (ids.has(id)) { if (!m.hasLayer(mk)) mk.addTo(m); } else mk.remove(); });
    (async () => {
      const L = (await import('leaflet')).default;
      const pts = (origin ? results.slice(0, 15) : results).map((x) => [x.d.lat, x.d.lng] as [number, number]);
      if (origin) pts.push([origin.lat, origin.lng]);
      if (pts.length) m.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 13 });
    })();
  }, [results, origin]);

  // Highlight the selected pin and card.
  useEffect(() => {
    markers.current.forEach((mk, id) => mk.setStyle(id === selected ? { fillColor: '#F2C14E', radius: 10 } : { fillColor: '#0E4D4A', radius: 7 }));
    if (selected !== null) {
      markers.current.get(selected)?.bringToFront();
      listEl.current?.querySelector(`[data-id="${selected}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selected, results]);

  // Invalidate size when the phone view switches to the map.
  useEffect(() => { if (view === 'map') setTimeout(() => map.current?.invalidateSize(), 50); }, [view]);

  const loadPlaces = useCallback(async () => {
    if (!places.current) places.current = await (await fetch('/data/ohio-places.json')).json();
    return places.current!;
  }, []);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim(); setMessage('');
    if (!q) { setOrigin(null); setText(''); setSort('az'); return; }
    const p = await loadPlaces();
    const zip = q.match(/^\d{5}$/)?.[0];
    const cityKey = q.toLowerCase().replace(/,?\s*(oh|ohio)$/i, '').trim();
    const countyKey = cityKey.replace(/\s+county$/, '');
    const countyMatch = counties.find((c) => c.toLowerCase() === countyKey);
    if (zip && p.zips[zip]) { setOrigin({ lat: p.zips[zip][0], lng: p.zips[zip][1], label: `ZIP ${zip}` }); setText(''); setSort('nearest'); }
    else if (zip) setMessage(`${zip} isn’t an Ohio ZIP code. Try a city or another ZIP.`);
    else if (p.cities[cityKey]) { const [lat, lng] = p.cities[cityKey]; setOrigin({ lat, lng, label: q.replace(/\b\w/g, (c) => c.toUpperCase()) }); setText(''); setSort('nearest'); }
    else if (countyMatch && /county$/i.test(cityKey)) { setCounty(countyMatch); setOrigin(null); setText(''); }
    else { setText(q); setOrigin(null); setSort('az'); }
    setSelected(null);
  };

  const locate = () => {
    if (!('geolocation' in navigator)) { setMessage('Your browser can’t share your location. Search by city or ZIP instead.'); return; }
    setLocating(true); setMessage('');
    navigator.geolocation.getCurrentPosition(
      (pos) => { setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: 'your location' }); setSort('nearest'); setText(''); setQuery(''); setLocating(false); },
      () => { setMessage('We couldn’t get your location. Search by city or ZIP instead.'); setLocating(false); },
      { enableHighAccuracy: false, timeout: 10000 },
    );
  };

  const reset = () => { setQuery(''); setOrigin(null); setCounty(''); setRadius(0); setText(''); setSort('az'); setSelected(null); setMessage(''); };

  const focus = (d: Dispensary) => {
    setSelected(d.id);
    setView('map');
    // Wait for the map to be visible (phones) before moving it.
    setTimeout(() => {
      const m = map.current; if (!m) return;
      m.invalidateSize();
      m.setView([d.lat, d.lng], Math.max(m.getZoom(), 13));
      markers.current.get(d.id)?.openPopup();
    }, 80);
  };

  return (
    <div className={s.wrap}>
      <div className={s.toggle} role="group" aria-label="Show results as">
        <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')}>List</button>
        <button type="button" aria-pressed={view === 'map'} onClick={() => setView('map')}>Map</button>
      </div>

      <section className={`${s.panel} ${view === 'map' ? s.hideSm : ''}`} aria-labelledby="locator-title">
        <div className={s.head}>
          <h1 id="locator-title" className={s.title}>Ohio dispensary locator</h1>
          <p className={s.sub}>All {data.count} licensed dispensaries in Ohio, from the state’s official data. No ads, no rankings.</p>
          <form className={s.search} onSubmit={search} role="search">
            <label htmlFor="loc-q" className="visually-hidden">City, ZIP code, county or dispensary name</label>
            <input id="loc-q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="City, ZIP, county or name" inputMode="search" />
            <button type="submit">Search</button>
          </form>
          <div className={s.filters}>
            <button type="button" className={s.chip} onClick={locate} disabled={locating}>{locating ? 'Finding you…' : 'Use my location'}</button>
            <label className={s.chip}><span className="visually-hidden">County</span>
              <select value={county} onChange={(e) => setCounty(e.target.value)}>
                <option value="">All counties</option>
                {counties.map((c) => <option key={c} value={c}>{c} County</option>)}
              </select>
            </label>
            {origin ? (
              <label className={s.chip}><span className="visually-hidden">Distance</span>
                <select value={radius} onChange={(e) => setRadius(Number(e.target.value))}>
                  <option value={0}>Any distance</option>
                  {[5, 10, 25, 50].map((r) => <option key={r} value={r}>Within {r} miles</option>)}
                </select>
              </label>
            ) : null}
            {(origin || county || text || radius) ? <button type="button" className={s.chipGhost} onClick={reset}>Clear</button> : null}
          </div>
          {message ? <p className={s.message} role="alert">{message}</p> : null}
          <div className={s.meta}>
            <p aria-live="polite">{results.length} {results.length === 1 ? 'dispensary' : 'dispensaries'}{origin ? ` near ${origin.label}` : ''}{county ? ` in ${county} County` : ''}{text ? ` matching “${text}”` : ''}</p>
            <label><span className="visually-hidden">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as 'nearest' | 'az')}>
                <option value="az">Sort: A to Z</option>
                <option value="nearest" disabled={!origin}>Sort: Nearest</option>
              </select>
            </label>
          </div>
        </div>

        <ol className={s.list} ref={listEl}>
          {results.map(({ d, dist }) => (
            <li key={d.id} data-id={d.id} className={`${s.card} ${selected === d.id ? s.active : ''}`}>
              <div className={s.cardTop}>
                <h2 className={s.name}>{d.name}</h2>
                <span className={s.badge}>Medical + adult-use</span>
              </div>
              {d.legalName !== d.name ? <p className={s.legal}>{d.legalName}</p> : null}
              <p className={s.addr}>{d.address}<br />{d.city}, OH {d.zip} · {d.county} County{dist !== null ? <> · <strong>{dist < 10 ? dist.toFixed(1) : Math.round(dist)} mi</strong></> : null}</p>
              {d.hours ? <p className={s.hours}><span className="visually-hidden">Hours: </span>{d.hours}</p> : null}
              <div className={s.actions}>
                <button type="button" onClick={() => focus(d)}>Show on map</button>
                <a href={directions(d)} target="_blank" rel="noopener noreferrer">Directions<span className="visually-hidden"> to {d.name} (opens Google Maps)</span></a>
                {d.phone ? <a href={`tel:${d.phone.replace(/\D/g, '')}`}>{d.phone}</a> : null}
              </div>
            </li>
          ))}
          {!results.length ? <li className={s.empty}>No licensed dispensaries match. Try a wider distance or clear the filters.</li> : null}
        </ol>
      </section>

      <div className={`${s.mapBox} ${view === 'list' ? s.hideSm : ''}`}>
        <div ref={mapEl} className={s.map} role="region" aria-label="Map of licensed Ohio dispensaries" />
      </div>
    </div>
  );
}
