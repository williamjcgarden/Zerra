import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Index = lazy(() => import("./pages/Index.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const BarbershopDemo = lazy(() => import("./pages/demos/BarbershopDemo.tsx"));
const LandscapingDemo = lazy(() => import("./pages/demos/LandscapingDemo.tsx"));
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
] as const;

export const PRERENDER_PATHS = PUBLIC_PRERENDER_PATHS;

export const APP_ROUTES: RouteObject[] = [
  { path: "/", element: <Index /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-of-service", element: <TermsOfService /> },
  ...Object.keys(SECTION_ROUTE_IDS).map((path) => ({ path, element: <Index /> })),
  { path: "/our-work/barbershop-demo", element: <BarbershopDemo /> },
  { path: "/our-work/landscaping-demo", element: <LandscapingDemo /> },
  { path: "/our-work/tech-demo", element: <TechDemo /> },
  { path: "*", element: <NotFound /> },
];
