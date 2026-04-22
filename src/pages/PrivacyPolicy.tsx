import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalAtmosphere from "@/components/GlobalAtmosphere";
import AtmosphericBg from "@/components/AtmosphericBg";

const sections = [
  {
    title: "Introduction",
    content: (
      <p>
        Zerra Studios ("we", "us", "our") respects your privacy and is committed to protecting your
        personal data. This policy explains what information we collect, how we use it, and your
        rights in relation to it.
      </p>
    ),
  },
  {
    title: "Information We Collect",
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>Contact form submissions (name, email, message)</li>
        <li>Usage data via analytics (page views, time on site)</li>
        <li>Cookies and similar tracking technologies</li>
      </ul>
    ),
  },
  {
    title: "How We Use Your Information",
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>To respond to your enquiries submitted via the contact form</li>
        <li>To improve our website and services</li>
        <li>To send updates if you have opted in</li>
      </ul>
    ),
  },
  {
    title: "Data Sharing",
    content: (
      <p>
        We do not sell your personal data. We may share it with trusted third-party service
        providers (e.g. email services, analytics) solely to operate our website.
      </p>
    ),
  },
  {
    title: "Cookies",
    content: (
      <p>
        We use essential and analytics cookies to provide and improve our service. You can disable
        cookies in your browser settings, though some features of the site may not function
        correctly as a result.
      </p>
    ),
  },
  {
    title: "Data Retention",
    content: (
      <p>
        We retain contact form data for up to 12 months unless you request deletion earlier. See
        your rights below for how to make a deletion request.
      </p>
    ),
  },
  {
    title: "Your Rights",
    content: (
      <p>
        You have the right to access, correct, or delete your personal data at any time. To
        exercise any of these rights, contact us at{" "}
        <a
          href="mailto:contact@zerrastudios.com"
          className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          contact@zerrastudios.com
        </a>
        .
      </p>
    ),
  },
  {
    title: "Third-Party Links",
    content: (
      <p>
        Our site may contain links to external websites. We are not responsible for the privacy
        practices or content of those sites and encourage you to review their policies independently.
      </p>
    ),
  },
  {
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this policy from time to time. When we do, we will revise the "Last updated"
        date at the top of this page. Continued use of the site after any changes constitutes
        acceptance of the updated policy.
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p>
        For any privacy-related questions or concerns, please email us at{" "}
        <a
          href="mailto:contact@zerrastudios.com"
          className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          contact@zerrastudios.com
        </a>
        .
      </p>
    ),
  },
];

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Zerra Studios</title>
        <meta name="description" content="Read Zerra Studios' privacy policy to understand how we collect, use, and protect your personal information." />
      </Helmet>
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <GlobalAtmosphere />
      <AtmosphericBg intensity={0.8} />
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 md:px-8 pt-36 pb-24">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Privacy <span className="text-gradient-gold">Policy</span>
          </h1>
          <p className="text-sm text-muted-foreground">Last updated: April 2026</p>
        </div>

        <div className="space-y-10">
          {sections.map(({ title, content }, i) => (
            <section key={title} className="border-t border-border/50 pt-8">
              <h2 className="text-lg font-semibold tracking-tight mb-3">
                <span className="text-muted-foreground/50 text-sm font-normal mr-3 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {title}
              </h2>
              <div className="text-muted-foreground text-sm leading-relaxed">{content}</div>
            </section>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="/" className="btn-gold text-xs px-8 py-3 inline-block">
            Back to Home
          </a>
        </div>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default PrivacyPolicy;
