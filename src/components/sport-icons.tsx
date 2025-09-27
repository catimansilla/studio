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
      <path d="M16,1h-2a2,2,0,0,0-2,2V8h2a1,1,0,0,1,1,1v6h2V3A2,2,0,0,0,16,1Z" />
      <path d="M8.5,8a2,2,0,1,0,4,0,2,2,0,0,0-4,0Z" />
      <path d="M22,20H2a1,1,0,0,0-1,1,2,2,0,0,0,4,0,1,1,0,0,0-2-1" />
      <path d="M13,11l-3,9" />
      <path d="m4 21 16 0" />
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
            <path d="M12 15a2 2 0 100-4 2 2 0 000 4z" />
            <path d="M12 13V2.5" />
            <path d="M12 2.5C12 2.5 16 3 17 8.5c.5 3-1.5 5-2.5 5.5" />
            <path d="M12 2.5C12 2.5 8 3 7 8.5c-.5 3 1.5 5 2.5 5.5" />
            <path d="m4.14 16.27 1.13-1.13" />
            <path d="m6.36 18.49 1.13-1.13" />
            <path d="m8.58 20.71 1.13-1.13" />
            <path d="M3 21h18" />
        </svg>
    )
}
