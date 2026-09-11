import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

export const DOVETAIL_PRODUCT_IDS = [
  "fieldwork-tee",
  "boxy-crew",
  "waxed-chore",
  "night-shift-parka",
  "double-knee",
  "studio-sweatpant",
  "archive-cap",
  "ribbed-sock",
  "canvas-tote",
] as const;

const Index = lazy(() => import("./pages/Index.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const BarbershopDemo = lazy(() => import("./pages/demos/BarbershopDemo.tsx"));
const LandscapingDemo = lazy(() => import("./pages/demos/LandscapingDemo.tsx"));
const DovetailDemo = lazy(() => import("./pages/demos/DovetailDemo.tsx"));
const TechDemo = lazy(() => import("./pages/demos/TechDemo.tsx"));

export const SECTION_ROUTE_IDS = {
  "/services": "services",
  "/why-zerra": "why-zerra",
  "/process": "process",
  "/our-work": "our-work",
} as const;

export const PUBLIC_PRERENDER_PATHS = [
  "/",
  "/services",
  "/why-zerra",
  "/process",
  "/privacy-policy",
  "/terms-of-service",
  "/our-work",
  "/our-work/barbershop-demo",
  "/our-work/landscaping-demo",
  "/our-work/tech-demo",
  "/our-work/dovetail-demo",
] as const;

export const PRERENDER_PATHS = [...PUBLIC_PRERENDER_PATHS,
  ...["story", "help", "checkout"].map(path => `/our-work/dovetail-demo/${path}`),
  ...DOVETAIL_PRODUCT_IDS.map(productId => `/our-work/dovetail-demo/product/${productId}`),
];

export const APP_ROUTES: RouteObject[] = [
  { path: "/", element: <Index /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-of-service", element: <TermsOfService /> },
  ...Object.keys(SECTION_ROUTE_IDS).map((path) => ({ path, element: <Index /> })),
  { path: "/our-work/barbershop-demo", element: <BarbershopDemo /> },
  { path: "/our-work/landscaping-demo", element: <LandscapingDemo /> },
  { path: "/our-work/tech-demo", element: <TechDemo /> },
  { path: "/our-work/dovetail-demo/*", element: <DovetailDemo /> },
  { path: "*", element: <NotFound /> },
];
