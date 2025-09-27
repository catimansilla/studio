import type { SVGProps } from 'react';

export function RowerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.5 21.5a2.5 2.5 0 0 0-2.48-2.5H4.98A2.5 2.5 0 0 0 2.5 21.5" />
      <path d="M12 19V6" />
      <path d="M9 6h6" />
      <circle cx="12" cy="3" r="1" />
      <path d="m3 14 9-2" />
      <path d="m21 14-9-2" />
    </svg>
  );
}
