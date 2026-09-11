
import { Navbar } from "@/demos/dovetail/components/Navbar";
import { Hero } from "@/demos/dovetail/components/Hero";
import { Collections } from "@/demos/dovetail/components/Collections";
import { Showcase } from "@/demos/dovetail/components/Showcase";
import { Shop } from "@/demos/dovetail/components/Shop";
import { QandA } from "@/demos/dovetail/components/QandA";
import { QuoteBanner } from "@/demos/dovetail/components/QuoteBanner";
import { ZerraProof } from "@/demos/dovetail/components/ZerraProof";
import { Footer } from "@/demos/dovetail/components/Footer";
import { useShopSearch } from "@/demos/dovetail/navigation";
import { useEditorialMotion } from "@/demos/dovetail/hooks/use-editorial-motion";

function Index() {
  const search = useShopSearch();
  const motion = useEditorialMotion();
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} ref={motion}>
        <Hero />
        <Collections />
        <Shop search={search} />
        <Showcase />
        <QandA />
        <QuoteBanner />
        <ZerraProof />
      </main>
      <Footer />
    </>
  );
}

export default Index;
