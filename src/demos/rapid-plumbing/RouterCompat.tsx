import type { MouseEventHandler, ReactNode } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

export const RAPID_PLUMBING_BASE = "/demo-sites/rapidplumbing";

type RouteOptions<TComponent> = {
  component: TComponent;
  head?: () => unknown;
};

export function createFileRoute(_path: string) {
  return <TComponent,>(options: RouteOptions<TComponent>) => options;
}

type DemoLinkProps = {
  to: string;
  hash?: string;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  activeProps?: { className?: string };
  activeOptions?: { exact?: boolean };
};

function demoPath(to: string, hash?: string) {
  const path = to === "/" ? RAPID_PLUMBING_BASE : `${RAPID_PLUMBING_BASE}${to}`;
  return hash ? `${path}#${hash.replace(/^#/, "")}` : path;
}

export function Link({
  to,
  hash,
  className = "",
  children,
  onClick,
  activeProps,
  activeOptions,
}: DemoLinkProps) {
  const { pathname } = useLocation();
  const targetPath = demoPath(to);
  const active = activeOptions?.exact
    ? pathname === targetPath
    : pathname === targetPath || pathname.startsWith(`${targetPath}/`);
  const classes = [className, active ? activeProps?.className : ""].filter(Boolean).join(" ");

  return (
    <RouterLink to={demoPath(to, hash)} className={classes} onClick={onClick}>
      {children}
    </RouterLink>
  );
}
