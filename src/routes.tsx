import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Index = lazy(() => import("./pages/Index.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const OurWork = lazy(() => import("./pages/OurWork.tsx"));
const BarbershopDemo = lazy(() => import("./pages/demos/BarbershopDemo.tsx"));
const LandscapingDemo = lazy(() => import("./pages/demos/LandscapingDemo.tsx"));
const TechDemo = lazy(() => import("./pages/demos/TechDemo.tsx"));
const RapidPlumbingDemo = lazy(() => import("./pages/demos/RapidPlumbingDemo.tsx"));

export const PUBLIC_PRERENDER_PATHS = [
  "/",
  "/privacy-policy",
  "/terms-of-service",
  "/our-work",
  "/our-work/barbershop-demo",
  "/our-work/landscaping-demo",
  "/our-work/tech-demo",
] as const;

export const RAPID_PREVIEW_PATHS = [
  "/demo-sites/rapidplumbing",
  "/demo-sites/rapidplumbing/services",
  "/demo-sites/rapidplumbing/reviews",
  "/demo-sites/rapidplumbing/service-areas",
  "/demo-sites/rapidplumbing/contact",
] as const;

export const PRERENDER_PATHS = [
  ...PUBLIC_PRERENDER_PATHS,
  ...RAPID_PREVIEW_PATHS,
] as const;

export const APP_ROUTES: RouteObject[] = [
  { path: "/", element: <Index /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-of-service", element: <TermsOfService /> },
  { path: "/our-work", element: <OurWork /> },
  { path: "/our-work/barbershop-demo", element: <BarbershopDemo /> },
  { path: "/our-work/landscaping-demo", element: <LandscapingDemo /> },
  { path: "/our-work/tech-demo", element: <TechDemo /> },
  { path: "/demo-sites/rapidplumbing/*", element: <RapidPlumbingDemo /> },
  { path: "*", element: <NotFound /> },
];
