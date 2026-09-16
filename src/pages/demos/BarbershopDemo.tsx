import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const destination = "/demos/royal-cuts/";

const BarbershopDemo = () => {
  useEffect(() => {
    window.location.replace(`${destination}${window.location.search}${window.location.hash}`);
  }, []);

  return (
    <>
      <Helmet>
        <title>Royal Cuts — A Zerra Studios concept</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="min-h-screen flex items-center justify-center">
        <a href={destination}>Open the Royal Cuts barbershop demo</a>
      </main>
    </>
  );
};

export default BarbershopDemo;
