/**
 * Locations (wave 4). The hub links down to each city page once it is published.
 * A city page ships only with at least five dated local facts from government sources,
 * and never names, ranks or endorses dispensaries. Statewide figures checked 13 Oct 2026.
 */
export type Fact = { title: string; text: string; date: string; source: [string, string] };
export type City = {
  slug: string; name: string; county: string; published: boolean;
  court?: [string, string];          // municipal court that handles most city cases
  dispensaries?: { county: number; city: number };
  facts?: Fact[];                    // ≥ 5 dated, government-sourced; page doesn't ship otherwise
  faq?: [string, string][];
};

export const cities: City[] = [
  {
    slug: 'columbus', name: 'Columbus', county: 'Franklin County', published: true,
    court: ['Franklin County Municipal Court', 'https://www.fcmcclerk.com/'],
    dispensaries: { county: 32, city: 25 },
    facts: [
      { title: 'Where dispensaries can open', date: 'December 2018',
        text: 'Under the zoning rules Columbus City Council voted on in December 2018, dispensaries go in C-4 commercial districts and must be at least 500 feet from another dispensary. Owners of property within 250 feet are told by mail.',
        source: ['City of Columbus: Council to update city code for medical marijuana', 'https://www.columbus.gov/council/information/Council-to-Update-City-Code-for-Medicinal-Marijuana-Sales,-Distribution,-Processing/'] },
      { title: 'Lower city penalties and help sealing records', date: '22 July 2019',
        text: 'Columbus City Council cut the city penalty for possessing under 100 grams to $10, said a minor misdemeanor arrest or conviction no longer counts as a criminal record, and funded a record-sealing program run by the Legal Aid Society of Columbus.',
        source: ['City of Columbus: City Council passes marijuana reform', 'https://www.columbus.gov/council/News-and-Media/City-Council-Passes-Marijuana-Reform/'] },
      { title: 'Cannabis tax money for the city', date: '2025 revenue estimate',
        text: 'The City Auditor’s 2025 revenue estimate counted on about $8 million from Ohio’s 10% adult-use cannabis tax, paid through the state’s Host Community Cannabis Fund. Medical marijuana isn’t subject to that tax.',
        source: ['City of Columbus Auditor: 2025 revenue estimate', 'https://www.columbus.gov/files/sharedassets/city/v/1/city-auditor/resources-and-reports/accessible-resources-and-reports/pdfua-compliant-2025-revenue-estimate.pdf'] },
    ],
    faq: [
      ['Is there a medical marijuana doctor’s office in Columbus?', 'You don’t need one. Our Ohio-licensed physicians see you by video, so you can have your visit from home anywhere in Columbus or Franklin County.'],
      ['Where are the dispensaries in Columbus?', 'Use the Division of Cannabis Control’s official dispensary map. On the state’s list dated 9 October 2026, 25 of Franklin County’s 32 dual-use dispensaries were in Columbus. We don’t recommend or partner with any dispensary.'],
      ['Can I clear an old marijuana possession charge from Columbus?', 'Since 20 March 2026, Ohio lets you apply to the court that sentenced you to expunge an old minor misdemeanor marijuana possession conviction. For most Columbus cases that is Franklin County Municipal Court. The filing fee is $50 unless you can’t afford it.'],
    ],
  },
  {
    slug: 'cleveland', name: 'Cleveland', county: 'Cuyahoga County', published: true,
    court: ['Cleveland Municipal Court', 'https://clevelandmunicipalcourt.org/judicial-services/administrative-services/central-scheduling/expungement'],
    dispensaries: { county: 28, city: 10 },
    facts: [
      { title: 'Zoning for adult-use businesses', date: 'Passed 3 June 2024, effective 3 July 2024',
        text: 'Cleveland City Council passed Ordinance 529-2024, which updated the city’s zoning code for state-licensed adult-use cannabis businesses.',
        source: ['Cleveland City Council: File 529-2024', 'https://cityofcleveland.legistar.com/LegislationDetail.aspx?ID=6657708&GUID=C637B18F-757E-41EA-8B76-8C074416AE51'] },
      { title: 'More districts, same buffer', date: '3 May 2024',
        text: 'The change presented to the City Planning Commission let dispensaries open in Local Retail, Limited Retail, Shopping Center and University Retail districts, not just General Retail. Cleveland kept its 500-foot buffer from churches, parks, schools, day cares, recreation centers and libraries.',
        source: ['Cleveland City Planning Commission: presentation, 3 May 2024', 'https://planning.clevelandohio.gov/designreview/drcagenda/2024/PDF/slides/CPC-presentation-05-03-2024.pdf'] },
      { title: 'Old possession records cleared', date: '6 April 2022',
        text: 'The City of Cleveland filed motions to expunge 4,077 minor misdemeanor marijuana possession records, following the low-level possession ordinance City Council passed in January 2020.',
        source: ['City of Cleveland: motion to expunge over 4,000 marijuana records', 'https://www.clevelandohio.gov/news/city-cleveland-files-motion-expunge-over-4000-marijuana-records'] },
    ],
    faq: [
      ['Is there a medical marijuana doctor’s office in Cleveland?', 'You don’t need one. Our Ohio-licensed physicians see you by video, so you can have your visit from home anywhere in Cleveland or Cuyahoga County.'],
      ['Where are the dispensaries in Cleveland?', 'Use the Division of Cannabis Control’s official dispensary map. On the state’s list dated 9 October 2026, 10 of Cuyahoga County’s 28 dual-use dispensaries were in Cleveland. We don’t recommend or partner with any dispensary.'],
      ['Was my old Cleveland marijuana record cleared?', 'In April 2022 the city asked Cleveland Municipal Court to expunge 4,077 minor misdemeanor possession records. If yours wasn’t included, Ohio law since 20 March 2026 lets you apply to the court that sentenced you. The filing fee is $50 unless you can’t afford it.'],
    ],
  },
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

export const DISPENSARY_LIST_DATE = '9 Oct 2026';
export const SB56: [string, string] = ['Ohio Legislative Service Commission: SB 56 final analysis (expungement, use rules)', 'https://www.legislature.ohio.gov/download?key=27450'];
export const getCity = (slug: string) => cities.find((c) => c.slug === slug && c.published);

export const DISPENSARY_MAP = 'https://com.ohio.gov/divisions-and-programs/cannabis-control/about-dcc/licenses/what-we-do/cannabis-dispensary-map';
export const DISPENSARY_LIST = 'https://com.ohio.gov/divisions-and-programs/cannabis-control/about-dcc/licenses/dispensaries/dispensary-licenses';
