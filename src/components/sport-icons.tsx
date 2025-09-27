import type { SVGProps } from 'react';

export function PaddleSurfIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.28 21.28a2.82 2.82 0 0 1-4 0L2.72 6.72a2.82 2.82 0 0 1 0-4 2.82 2.82 0 0 1 4 0l14.56 14.56a2.82 2.82 0 0 1 0 4Z" />
      <path d="M5.5 15.5c-1 1-1.5 2.5-1.5 4s.5 3 1.5 4" />
      <path d="M18.5 8.5c1-1 1.5-2.5 1.5-4s-.5-3-1.5-4" />
    </svg>
  );
}

export function WindSurfIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
        <path d="M3 12c.5-2.5 2-4 4-4 1.5 0 2.5.5 3.5 1.5" />
        <path d="M4 16c.5-2.5 2-4 4-4 1.5 0 2.5.5 3.5 1.5" />
        <path d="M5 20c.5-2.5 2-4 4-4 1.5 0 2.5.5 3.5 1.5" />
        <path d="M18 6c-2.5 0-4 1.5-5 3.5" />
        <path d="M17 10c-2.5 0-4 1.5-5 3.5" />
        <path d="M16 14c-2.5 0-4 1.5-5 3.5" />
    </svg>
  );
}
