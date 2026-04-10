import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function IconBase({ className, size = 18, strokeWidth = 2, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="10.5" cy="10.5" r="5.75" />
      <path d="M15 15l4.25 4.25" />
    </IconBase>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M11 2.6c.62-.34 1.38-.34 2 0l1.86 1.04 1.83 1.1c.62.37.93.56 1.1.86.18.3.18.66.2 1.36l.03 2.14-.03 2.14c-.02.7-.02 1.05-.2 1.36-.17.3-.48.49-1.1.86l-1.83 1.1L13 21.4c-.62.34-1.38.34-2 0l-1.86-1.04-1.83-1.1c-.62-.37-.93-.56-1.1-.86-.18-.3-.18-.66-.2-1.36L6 14.9l.01-2.14c.02-.7.02-1.05.2-1.36.17-.3.48-.49 1.1-.86l1.83-1.1L11 2.6Z" />
      <circle cx="12" cy="12" r="3" />
    </IconBase>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M2.5 12c1.35-2.27 4.4-5.5 9.5-5.5S20.15 9.73 21.5 12c-1.35 2.27-4.4 5.5-9.5 5.5S3.85 14.27 2.5 12Z" />
      <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M19.5 12v4.25c0 1.59 0 2.38-.5 2.88s-1.29.5-2.88.5H7.5A2.5 2.5 0 0 1 5 17.12V6.5c0-1.59 0-2.38.5-2.88s1.29-.5 2.88-.5H16c1.59 0 2.38 0 2.88.5s.5 1.29.5 2.88V12Zm0 0c0 1.59 0 2.38-.5 2.88s-1.29.5-2.88.5H7.5A2.5 2.5 0 0 0 5 17.12" />
      <path d="M9 8h6" />
    </IconBase>
  );
}

export function BookOpenIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 6.5c-1.73-1.42-4.19-2-7.5-1.73v11.5c3.31-.27 5.77.3 7.5 1.73" />
      <path d="M12 6.5c1.73-1.42 4.19-2 7.5-1.73v11.5c-3.31-.27-5.77.3-7.5 1.73" />
      <path d="M12 6.5v11.5" />
    </IconBase>
  );
}

export function RestoreIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 12a8 8 0 1 0 2.35-5.66" />
      <path d="M4 4v4h4" />
    </IconBase>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8.5 12.5 11 15a2 2 0 0 0 2.83 0l3.67-3.67a2 2 0 0 0 0-2.83l-1.5-1.5a2 2 0 0 0-2.83 0L11.6 8.57a2 2 0 0 1-2.83 0L7.7 7.5a2 2 0 0 0-2.83 0L3.5 8.87a2 2 0 0 0 0 2.83l3.33 3.33a2 2 0 0 0 2.83 0L12 12.7" />
      <path d="m14 10 1.5 1.5" />
    </IconBase>
  );
}

export function SupportIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 12a8 8 0 1 1 16 0v3a2 2 0 0 1-2 2h-2v-5h4" />
      <path d="M4 12v5h4v-5H4Z" />
      <path d="M12 19v1.5a1.5 1.5 0 0 1-1.5 1.5h-1" />
    </IconBase>
  );
}

export function ArrowRightSmallIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}
