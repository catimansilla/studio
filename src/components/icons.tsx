import type { SVGProps } from 'react';

export function RowerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 2.5a2.5 2.5 0 0 0 0 5h19a2.5 2.5 0 0 0 0-5" />
      <path d="M6 12H4" />
      <path d="M14 15H4" />
      <path d="M20 12h-2" />
      <path d="M10.5 2.5v9" />
      <path d="m6 18 1.5-1.5" />
      <path d="m18 18-1.5-1.5" />
      <path d="M3.5 12l1.5-1.5" />
      <path d="m20.5 12-1.5-1.5" />
    </svg>
  );
}
