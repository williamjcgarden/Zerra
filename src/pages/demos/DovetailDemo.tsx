import BackToZerra from "@/components/BackToZerra";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Home from "@/demos/dovetail/pages/index";
import Story from "@/demos/dovetail/pages/story";
import Help from "@/demos/dovetail/pages/help";
import Checkout from "@/demos/dovetail/pages/checkout";
import Product from "@/demos/dovetail/pages/product.$id";
import { CartProvider } from "@/demos/dovetail/lib/cart";
import { CartDrawer } from "@/demos/dovetail/components/CartDrawer";
import { Navbar } from "@/demos/dovetail/components/Navbar";
import { Footer } from "@/demos/dovetail/components/Footer";
import { Link } from "@/demos/dovetail/navigation";
import { PRODUCTS } from "@/demos/dovetail/data/nocturn";
import "@/demos/dovetail/dovetail.css";

function NotFound() {
  return <><Navbar /><main id="main-content" className="page-main empty-page" tabIndex={-1}>
    <p className="eyebrow">404 / Not here</p><h1>A wrong turn.<br />A good place to start.</h1>
    <p>That page isn't part of the wardrobe.</p><Link to="/" hash="shop" className="button">Back to the collection</Link>
  </main><Footer /></>;
}
export default function DovetailDemo() {
  const location = useLocation();
  const product = PRODUCTS.find(p => location.pathname === `/our-work/dovetail-demo/product/${p.id}`);
  const title = product?.name || (location.pathname.endsWith("/story") ? "About the studio" : location.pathname.endsWith("/help") ? "Help" : location.pathname.endsWith("/checkout") ? "Checkout preview" : "A wardrobe that works together");
  useEffect(() => {
    if (location.state?.preserveScroll) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.slice(1) || "main-content");
      if (location.hash) target?.scrollIntoView({ block: "start" });
      else window.scrollTo({ top: 0, behavior: "instant" });
      target?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.key, location.hash, location.state]);
  return <><BackToZerra /><div id="dovetail-root" className="dovetail-demo">
    <Helmet>
      <title>{title} | DOVETAIL — Zerra concept</title>
      <meta name="description" content={product?.description || "Relaxed shapes. A wardrobe that works together. Dovetail is a fictional brand and website concept by Zerra Studios."} />
      <meta name="robots" content="noindex, nofollow" />
      <meta property="og:title" content="DOVETAIL — A Zerra Studios concept" />
      <meta property="og:image" content="/demos/dovetail/preview.webp" />
      <link rel="icon" href="/demos/dovetail/dovetail.svg" />
    </Helmet>
    <CartProvider><Routes>
      <Route index element={<Home />} /><Route path="story" element={<Story />} />
      <Route path="help" element={<Help />} /><Route path="checkout" element={<Checkout />} />
      <Route path="product/:id" element={<Product />} /><Route path="*" element={<NotFound />} />
    </Routes><CartDrawer /></CartProvider>
  </div></>;
}
