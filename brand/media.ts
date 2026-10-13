// Homepage story video. Files live in /public/media. Keep `ready` false until
// the MP4, poster and captions are committed, so the section never renders a broken player.
export const storyVideo = {
  ready: false,
  title: 'How Maya got her Ohio medical marijuana card',
  description: 'A one-minute animated story: an Ohio adult answers a few questions, gathers her records, sees an Ohio physician by video, and activates her registration.',
  src: '/media/maya-story.mp4',
  poster: '/media/maya-story-poster.jpg',
  captions: '/media/maya-story.vtt',
  durationIso: 'PT1M',
  uploadDate: '2026-10-13',
  label: 'Dramatization. AI-generated characters.',
  transcript: [
    'Maya lives in Columbus with chronic back pain. She wondered whether Ohio’s medical marijuana program was an option, but the steps felt confusing.',
    'First, she answered a few quick questions online. Ohio-licensed physicians, a clear price, and a refund if she didn’t qualify.',
    'She gathered her records: a doctor’s note naming her condition and a list of her medicines. Photos from her patient portal worked fine.',
    'Then a video visit from her living room. Her physician reviewed her history, checked Ohio’s prescription report, and explained the risks and benefits.',
    'Her physician decided she qualified and submitted her registration. Maya activated it from an email, and Ohio charged no state fee.',
    'Now, Maya’s card lives right on her phone, ready with her ID. Your story can start the same way, today.',
  ],
};
