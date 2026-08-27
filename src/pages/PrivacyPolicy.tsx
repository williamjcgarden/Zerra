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
        <li>Contact form details: name, email address, message, optional business name, and project budget when requesting a quote</li>
        <li>Scheduling details you choose to provide through Calendly</li>
        <li>Basic technical data, such as IP address, browser type, device type, and requested pages, processed by our hosting and content-delivery providers</li>
      </ul>
    ),
  },
  {
    title: "How We Use Your Information",
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>To respond to your enquiries submitted via the contact form</li>
        <li>To prepare quotes and schedule consultations you request</li>
        <li>To operate, secure, troubleshoot, and improve our website</li>
        <li>To comply with legal obligations and protect our legitimate business interests</li>
      </ul>
    ),
  },
  {
    title: "Service Providers and Data Sharing",
    content: (
      <div className="space-y-3">
        <p>We do not sell your personal data. We use the following providers only as needed to operate this website:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Formspree processes contact form submissions and delivers them to our business email</li>
          <li>Calendly processes scheduling information when you choose to book a consultation</li>
          <li>Cloudflare hosts and protects the website and may process security and request logs</li>
          <li>Google Fonts delivers website fonts and receives basic request information</li>
          <li>Amazon CloudFront delivers selected website media and receives basic request information</li>
        </ul>
        <p>These providers may process information outside Canada under their own privacy and security practices.</p>
      </div>
    ),
  },
  {
    title: "Cookies",
    content: (
      <p>
        Zerra Studios does not currently use advertising or behavioural analytics cookies on this
        website. Third-party services may use cookies or similar technologies when you open an
        embedded feature such as Calendly. You can control cookies through your browser settings.
      </p>
    ),
  },
  {
    title: "Data Retention",
    content: (
      <p>
        We retain contact form submissions and related business email for up to 12 months unless
        the information is needed for an active client relationship, legal requirement, or dispute.
        We then delete or anonymize it. Scheduling information is retained according to our Calendly
        settings and the provider's policy. You may request earlier deletion using the contact details below.
      </p>
    ),
  },
  {
    title: "Security Safeguards",
    content: (
      <p>
        We use reasonable administrative and technical safeguards appropriate to the limited
        information we collect, including encrypted HTTPS connections, restricted service access,
        trusted service providers, and periodic review and deletion of retained submissions. No
        internet transmission or storage system can be guaranteed completely secure.
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
    title: "Privacy Officer and Contact",
    content: (
      <p>
        Zerra Studios' Privacy Officer is responsible for privacy questions, access or correction
        requests, deletion requests, and complaints. Email{" "}
        <a
          href="mailto:contact@zerrastudios.com"
          className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          contact@zerrastudios.com
        </a>
        . We will review and respond to privacy requests within a reasonable period. You may also
        contact the Office of the Information and Privacy Commissioner for British Columbia if your
        concern is not resolved.
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
          <p className="text-sm text-muted-foreground">Last updated: August 2026</p>
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
