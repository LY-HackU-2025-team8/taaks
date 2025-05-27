import React from 'react';

export const SettingsIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 1L17.7942 5.5V14.5L10 19L2.20577 14.5V5.5L10 1Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <circle cx={10} cy={10} r={3} stroke="currentColor" strokeWidth={2} />
  </svg>
);
