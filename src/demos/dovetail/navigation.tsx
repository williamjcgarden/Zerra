import { forwardRef } from "react";
import { Link as RouterLink, useNavigate as useRouterNavigate, useSearchParams, type LinkProps } from "react-router-dom";
import { validateShopSearch, type ShopSearch } from "./data/nocturn";

export const DEMO_PATH = "/our-work/dovetail-demo";
type Destination = { to: string; params?: { id: string }; search?: ShopSearch; hash?: string; resetScroll?: boolean };
export function destination({ to, params, search, hash }: Destination) {
  const path = to.replace("$id", encodeURIComponent(params?.id || ""));
  const query = new URLSearchParams();
  Object.entries(search || {}).forEach(([key, value]) => { if (value) query.set(key, value); });
  return `${DEMO_PATH}${path === "/" ? "" : path}${query.size ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
}
export const Link = forwardRef<HTMLAnchorElement, Omit<LinkProps, "to"> & Destination>(function DemoLink(
  { to, params, search, hash, resetScroll, ...props }, ref,
) {
  return <RouterLink ref={ref} to={destination({ to, params, search, hash })} state={{ preserveScroll: resetScroll === false }} {...props} />;
});
export function useNavigate() {
  const navigate = useRouterNavigate();
  return (options: Destination) => navigate(destination(options), { state: { preserveScroll: options.resetScroll === false } });
}
export function useShopSearch() {
  const [search] = useSearchParams();
  return validateShopSearch(Object.fromEntries(search));
}
