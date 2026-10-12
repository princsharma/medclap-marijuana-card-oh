export type IconName =
  | "arrow-right"
  | "menu"
  | "close"
  | "plus"
  | "compass"
  | "heart-handshake"
  | "list-checks"
  | "check-circle"
  | "message-square"
  | "user-check"
  | "route"
  | "search"
  | "book-open"
  | "receipt"
  | "repeat"
  | "users"
  | "shield-check"
  | "activity"
  | "clock"
  | "calendar"
  | "video"
  | "map-pin"
  | "chevron-down"
  | "sliders"
  | "sparkle"
  | "phone"
  | "link"
  | "chevron-right";

/** Path data on a 24px grid. Multiple subpaths are fine; circles are written as arcs. */
const paths: Record<IconName, string> = {
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  plus: "M12 5v14M5 12h14",
  compass: "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18Z M15.5 8.5l-2 5-5 2 2-5Z",
  "heart-handshake":
    "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z M12 5L9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66 M18 15l-2-2 M15 18l-2-2",
  "list-checks": "M3 7l2 2 4-4 M6 15a2 2 0 1 0 0 4 2 2 0 1 0 0-4Z M13 7h8 M13 17h8",
  "check-circle": "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18Z M8.5 12l2.5 2.5 4.5-5",
  "message-square": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z",
  "user-check": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8Z M16 11l2 2 4-4",
  route:
    "M6 16a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15 M18 2a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z",
  search: "M11 3a8 8 0 1 0 0 16 8 8 0 1 0 0-16Z M21 21l-4.3-4.3",
  "book-open": "M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2Z M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7Z",
  repeat: "M17 2l4 4-4 4 M3 11v-1a4 4 0 0 1 4-4h14 M7 22l-4-4 4-4 M21 13v1a4 4 0 0 1-4 4H3",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8Z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  "shield-check": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z M9 12l2 2 4-4",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18Z M12 7v5l3 2",
  calendar: "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z M16 3v4 M8 3v4 M3 11h18",
  video: "M16 10l5-3v10l-5-3 M4 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z",
  "map-pin": "M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z M12 7a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z",
  "chevron-down": "M6 9l6 6 6-6",
  sliders: "M4 6h10 M18 6h2 M4 12h4 M12 12h8 M4 18h12 M20 18h0 M16 4v4 M10 10v4 M16 16v4",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7Z",
  phone:
    "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z",
  link: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7 M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
  "chevron-right": "M9 6l6 6-6 6",
  receipt:
    "M5 2v20l2-1.5L9 22l2-1.5 2 1.5 2-1.5 2 1.5 2-1.5V2l-2 1.5L15 2l-2 1.5L11 2 9 3.5 7 2Z M15 8H9 M15 12H9 M13 16H9",
};

/** Decorative outline icon (24px grid, 1.75 stroke). Always aria-hidden. */
export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
