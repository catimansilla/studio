import type { SVGProps } from 'react';

export function BridgeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 200 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        fill="currentColor"
        d="M0 70 L200 70 L200 75 L0 75 Z"
      />
      <path
        fill="currentColor"
        d="M50 20 L55 20 L55 70 L50 70 Z"
      />
      <path
        fill="currentColor"
        d="M145 20 L150 20 L150 70 L145 70 Z"
      />
      <path
        fill="currentColor"
        d="M52.5 20 L90 70 L87 70 L52.5 25 Z"
      />
      <path
        fill="currentColor"
        d="M52.5 20 L15 70 L12 70 L52.5 25 Z"
      />
      <path
        fill="currentColor"
        d="M147.5 20 L185 70 L182 70 L147.5 25 Z"
      />
      <path
        fill="currentColor"
        d="M147.5 20 L110 70 L107 70 L147.5 25 Z"
      />
      <path
        fill="currentColor"
        d="M52.5,15 L52.5,20 L90,70 L92,70 L55,15 L52.5,15 Z M147.5,15 L147.5,20 L110,70 L112,70 L150,15 L147.5,15 Z"
      />
       <path
        fill="currentColor"
        d="M55,20 L50,20 L15,70 L20,70 L55,20 Z M145,20 L150,20 L185,70 L180,70 L145,20 Z"
      />
       <path
        fill="currentColor"
        d="M0 75 L200 75 L200 85 Q 150 95, 100 85 Q 50 95, 0 85 Z"
      />
    </svg>
  );
}
