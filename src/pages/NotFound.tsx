import GlobalAtmosphere from "@/components/GlobalAtmosphere";
import AtmosphericBg from "@/components/AtmosphericBg";

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden">
      <GlobalAtmosphere />
      <AtmosphericBg intensity={0.8} />
      <div className="relative z-10 text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
