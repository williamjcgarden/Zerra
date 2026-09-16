import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const demoIcons = [
  ["/our-work/tech-demo", "/demos/tech/favicon.svg", "/demos/tech/apple-touch-icon.png"],
  ["/our-work/landscaping-demo", "/demos/landscaping/favicon.svg", "/demos/landscaping/apple-touch-icon.png"],
  ["/our-work/dovetail-demo", "/demos/dovetail/dovetail.svg", "/demos/dovetail/apple-touch-icon.png"],
];

export default function RouteFavicons() {
  const { pathname } = useLocation();
  const demo = demoIcons.find(([route]) => pathname === route || pathname.startsWith(`${route}/`));
  return <Helmet>{demo ? [
    <link key="icon" rel="icon" type="image/svg+xml" href={demo[1]} />,
    <link key="touch" rel="apple-touch-icon" sizes="180x180" href={demo[2]} />,
  ] : [
    <link key="192" rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />,
    <link key="32" rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />,
    <link key="16" rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />,
    <link key="touch" rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />,
  ]}</Helmet>;
}
