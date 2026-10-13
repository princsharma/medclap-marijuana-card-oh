// Homepage story video. Files live in /public/media. Keep `ready` false until
// the MP4, poster and captions are committed, so the section never renders a broken player.
export type SiteVideo = {
  title: string; description: string; src: string; poster: string; captions: string;
  durationIso: string; durationLabel: string; uploadDate: string; label: string; transcript: string[];
};

export const storyVideo: SiteVideo & { ready: boolean } = {
  ready: true,
  title: 'How Maya got her Ohio medical marijuana card',
  description: 'A one-minute animated story: an Ohio adult answers a few questions, gathers her records, sees an Ohio physician by video, and activates her registration.',
  // Hosted on the Higgsfield CDN for now; swap to /media/maya-story.mp4 once the file is committed.
  src: 'https://d2ol7oe51mr4n9.cloudfront.net/user_37xuX69L5la49WcVV6KjtPSFDAb/fbf11b35-9eb4-4ad6-9d15-1b85f5c2b468.mp4',
  poster: 'https://d2ol7oe51mr4n9.cloudfront.net/user_37xuX69L5la49WcVV6KjtPSFDAb/7051293b-5302-4663-bf88-2545ed116e09.jpg',
  captions: '/media/maya-story.vtt',
  durationIso: 'PT1M',
  durationLabel: '1:00',
  uploadDate: '2026-10-13',
  label: 'Dramatization. AI-generated characters.',
  transcript: [
    'Maya lives in Columbus with chronic back pain. She wondered whether Ohio’s medical marijuana program was an option, but the steps felt confusing.',
    'First, she answered a few quick questions online. Ohio-licensed physicians, a clear price, and a refund if she didn’t qualify.',
    'She gathered her records: a doctor’s note naming her condition and her medicine list. Photos from her patient portal worked fine.',
    'Then a video visit from home. Her physician reviewed her history, checked Ohio’s prescription report, and explained the risks and benefits.',
    'Her physician decided she qualified and submitted her registration. Maya activated it from an email, and Ohio charged no state fee.',
    'Now, Maya’s card lives right on her phone, ready with her ID. Your story can start the same way, today.',
  ],
};
