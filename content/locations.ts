/**
 * Locations (wave 4). The hub links down to each city page once it is published.
 * A city page ships only with at least five dated local facts from government sources,
 * and never names, ranks or endorses dispensaries. Statewide figures checked 13 Oct 2026.
 */
export type City = { slug: string; name: string; county: string; published: boolean };

export const cities: City[] = [
  { slug: 'columbus', name: 'Columbus', county: 'Franklin County', published: false },
  { slug: 'cleveland', name: 'Cleveland', county: 'Cuyahoga County', published: false },
  { slug: 'cincinnati', name: 'Cincinnati', county: 'Hamilton County', published: false },
  { slug: 'dayton', name: 'Dayton', county: 'Montgomery County', published: false },
  { slug: 'toledo', name: 'Toledo', county: 'Lucas County', published: false },
  { slug: 'akron', name: 'Akron', county: 'Summit County', published: false },
];

/** Division of Cannabis Control, "DCC Update By The Numbers" (page last updated 5 Oct 2026). */
export const ohioFigures = {
  registeredPatients: { value: '475,281', asOf: '31 Aug 2026' },
  certificatesToRecommend: { value: '490', asOf: '9 Sep 2026' },
  dualUseDispensaries: { value: '231', asOf: '5 Oct 2026' },
  sourceUrl: 'https://dam.assets.ohio.gov/image/upload/com.ohio.gov/DCC/DCC%20Stats/DCC_Update_By_The_Numbers.pdf',
};

export const DISPENSARY_MAP = 'https://com.ohio.gov/divisions-and-programs/cannabis-control/about-dcc/licenses/what-we-do/cannabis-dispensary-map';
export const DISPENSARY_LIST = 'https://com.ohio.gov/divisions-and-programs/cannabis-control/about-dcc/licenses/dispensaries/dispensary-licenses';
