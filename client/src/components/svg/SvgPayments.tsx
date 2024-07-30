const colorMidnight = "#212a31";
const colorSilver = "#f2f1e4";

export function SvgCash() {
  return (
    <svg viewBox="0 0 64 64" fill={colorMidnight} height="1em" width="1em">
      <path
        fill="none"
        stroke={colorMidnight}
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M63 38 A19 19 0 0 1 44 57 A19 19 0 0 1 25 38 A19 19 0 0 1 63 38 z"
      />
      <path
        fill="none"
        stroke={colorMidnight}
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M57 38 A13 13 0 0 1 44 51 A13 13 0 0 1 31 38 A13 13 0 0 1 57 38 z"
      />
      <path
        fill="none"
        stroke={colorMidnight}
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M30 51H1v6h37v-1M27 45H3v6h27M26 39H5v6h22M26 33H1v6h25M29 27H3v6h23M35 21H1v6h28M40 20v-5H3v6h32M1 9h37v6H1z"
      />
    </svg>
  );
}

export function SvgSend() {
  return (
    <svg viewBox="0 0 24 24" fill={colorMidnight} height="1em" width="1em">
      <path d="M18.1 15.3c-.1.1-.3.2-.4.3l-2.4.4 1.7 3.6c.2.4 0 .8-.4 1l-2.8 1.3c-.1.1-.2.1-.3.1-.3 0-.6-.2-.7-.4L11.2 18l-1.9 1.5c-.1.1-.3.2-.5.2-.4 0-.8-.3-.8-.8V7.5c0-.5.3-.8.8-.8.2 0 .4.1.5.2l8.7 7.4c.3.2.4.7.1 1M6 12H4V4h16v8h-1.6l2.2 1.9c.8-.3 1.3-1 1.3-1.9V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h2v-2z" />
    </svg>
  );
}

export function SvgEnter() {
  return (
    <svg viewBox="0 0 24 24" fill={colorMidnight} height="1em" width="1em">
      <path d="M19 6a1 1 0 00-1 1v4a1 1 0 01-1 1H7.41l1.3-1.29a1 1 0 00-1.42-1.42l-3 3a1 1 0 00-.21.33 1 1 0 000 .76 1 1 0 00.21.33l3 3a1 1 0 001.42 0 1 1 0 000-1.42L7.41 14H17a3 3 0 003-3V7a1 1 0 00-1-1z" />
    </svg>
  );
}

export function SvgGym() {
  return (
    <svg viewBox="0 0 24 24" fill={colorSilver} height="3em" width="3em">
      <path d="M12 5c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2m10-4v5h-2V4H4v2H2V1h2v2h16V1h2m-7 10.26V23h-2v-5h-2v5H9V11.26C6.93 10.17 5.5 8 5.5 5.5V5h2v.5C7.5 8 9.5 10 12 10s4.5-2 4.5-4.5V5h2v.5c0 2.5-1.43 4.67-3.5 5.76z" />
    </svg>
  );
}

export function SvgHealth() {
  return (
    <svg viewBox="0 0 512 512" fill={colorSilver} height="3em" width="3em">
      <path d="M96 352V96c0-35.3 28.7-64 64-64h256c35.3 0 64 28.7 64 64v197.5c0 17-6.7 33.3-18.7 45.3l-58.5 58.5c-12 12-28.3 18.7-45.3 18.7H160c-35.3 0-64-28.7-64-64zm176-224c-8.8 0-16 7.2-16 16v48h-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-48v-48c0-8.8-7.2-16-16-16h-32zm24 336c13.3 0 24 10.7 24 24s-10.7 24-24 24H136C60.9 512 0 451.1 0 376V152c0-13.3 10.7-24 24-24s24 10.7 24 24v224c0 48.6 39.4 88 88 88h160z" />
    </svg>
  );
}
