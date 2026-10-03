import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalAtmosphere from "@/components/GlobalAtmosphere";
import AtmosphericBg from "@/components/AtmosphericBg";

const linkClass = "text-primary underline underline-offset-4 hover:text-primary/80 transition-colors";

const ContactEmail = () => (
  <a href="mailto:contact@zerrastudios.com" className={linkClass}>
    contact@zerrastudios.com
  </a>
);

const sections = [
  {
    title: "Who These Terms Are Between",
    content: (
      <p>
        These terms are between Zerra Studios, Vancouver, British Columbia ("Zerra"), and the
        business named on your invoice ("you"). Please read them before paying. Paying a Zerra
        invoice means you accept these terms. The owner's legal name is available on request.
      </p>
    ),
  },
  {
    title: "Your Website",
    content: (
      <div className="space-y-3">
        <p>Once you approve your free demo and pay, Zerra builds your website. It includes:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Up to 10 pages, designed for phones and computers</li>
          <li>
            A search foundation: fast, secure (HTTPS) pages, page titles and descriptions, local
            business information, and setup with Google Search Console
          </li>
          <li>A contact form through Formspree, set up under your own account</li>
          <li>Changes until you approve the site, with no limit on revision rounds for the agreed pages</li>
        </ul>
        <p>
          Not included unless quoted separately: more than 10 pages, logos, apps or custom software,
          online stores, paid advertising, and ongoing SEO.
        </p>
      </div>
    ),
  },
  {
    title: "Price and Payment",
    content: (
      <p>
        The price is on your invoice, in Canadian dollars. You pay the full price through Stripe
        after approving the demo and before work continues. Payments are non-refundable.
      </p>
    ),
  },
  {
    title: "Your Part",
    content: (
      <p>
        You supply your logo, photos, text and business details, and confirm you own them or have
        permission to use them. You are responsible for your business information being accurate,
        and for any claim that content you supplied uses someone else's work without permission.
        The business owner approves the website.
      </p>
    ),
  },
  {
    title: "Timing",
    content: (
      <p>
        Zerra aims to launch within about one week of receiving your content. This is an estimate,
        not a guarantee; late content or approvals move it.
      </p>
    ),
  },
  {
    title: "Ownership",
    content: (
      <p>
        Once you have paid in full, you own your website, its code and your content. Zerra will show
        your website in its portfolio only with your permission.
      </p>
    ),
  },
  {
    title: "Hosting",
    content: (
      <div className="space-y-3">
        <p>You choose one option on your invoice:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Self-hosted: you host the site on your own Cloudflare account using Zerra's
            instructions. Zerra provides no maintenance or support.
          </li>
          <li>Zerra hosting: Zerra hosts your site and fixes problems Zerra caused. No scheduled updates.</li>
          <li>Zerra hosting with monthly updates: hosting plus monthly website updates.</li>
        </ul>
        <p>
          Monthly prices are on your invoice. For Zerra-hosted sites, Zerra registers your domain on
          Namecheap with you listed as its owner, and keeps it renewed while you host with Zerra. The
          domain is yours.
        </p>
      </div>
    ),
  },
  {
    title: "Cancelling Hosting",
    content: (
      <div className="space-y-3">
        <p>
          Hosting is month to month. You can cancel any time by emailing <ContactEmail /> at least
          14 days before your next billing date. Months already paid are not refunded, including
          part months.
        </p>
        <p>
          When hosting ends, you receive your website files and instructions for hosting it
          yourself, and Zerra transfers your domain to your own Namecheap account at no charge.
        </p>
      </div>
    ),
  },
  {
    title: "Late Payment",
    content: (
      <p>
        If a hosting payment is late, Zerra emails you. If it is still unpaid 14 days later, Zerra
        stops hosting your site. You still receive your website files, the self-hosting
        instructions and your domain.
      </p>
    ),
  },
  {
    title: "Support",
    content: (
      <p>
        Contact <ContactEmail /> or Zerra's phone line. Support is handled personally; messages
        received overnight are answered the next day. Zerra does not offer 24/7 support.
      </p>
    ),
  },
  {
    title: "No Guarantees",
    content: (
      <p>
        Zerra does not guarantee search rankings, enquiries, leads, revenue or uninterrupted uptime.
        Your site relies on services Zerra does not control, such as Cloudflare, Namecheap,
        Formspree and Google.
      </p>
    ),
  },
  {
    title: "Limit of Responsibility",
    content: (
      <p>
        To the extent the law allows, Zerra's total responsibility for any claim related to its
        work is limited to the amount you paid Zerra in the 12 months before the claim, and Zerra
        is not responsible for indirect losses such as lost profits or lost business.
      </p>
    ),
  },
  {
    title: "AI Phone Agents (If Purchased)",
    content: (
      <p>
        Calls start by telling callers they may be recorded for quality assurance. Zerra confirms
        any change to your agent with you before it goes live, and you test the agent before your
        number is switched on. Recordings and transcripts are stored by Zerra's voice provider,
        Vapi, which may store them outside Canada, and are used only to run and improve your agent.
        Your own privacy policy should tell customers that calls are recorded and why. Scope and
        price are on your invoice.
      </p>
    ),
  },
  {
    title: "General",
    content: (
      <p>
        British Columbia law applies. Zerra may update these terms; the version in effect when you
        pay applies to that payment. Questions? Contact <ContactEmail />.
      </p>
    ),
  },
];

const ClientTerms = () => {
  return (
    <>
      <Helmet>
        <title>Client Terms | Zerra Studios</title>
        <meta name="description" content="The terms for Zerra Studios website builds, hosting and AI phone agents: what's included, payment, ownership, hosting and cancellation." />
      </Helmet>
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <GlobalAtmosphere />
      <AtmosphericBg intensity={0.8} />
      <Navbar />

      {/* Same white text and dark shadow as the hero subtitle, so text stays readable over the animated background. */}
      <main className="max-w-3xl mx-auto px-6 md:px-8 pt-36 pb-24" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.95), 0 4px 16px rgba(0, 0, 0, 0.72)" }}>
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-white/90 mb-4">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Client <span className="text-gradient-gold" style={{ textShadow: "none" }}>Terms</span>
          </h1>
          <p className="text-sm text-white/90">Last updated: October 2026</p>
        </div>

        <div className="space-y-10">
          {sections.map(({ title, content }, i) => (
            <section key={title} className="border-t border-border/50 pt-8">
              <h2 className="text-lg font-semibold tracking-tight mb-3">
                <span className="text-white/60 text-sm font-normal mr-3 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {title}
              </h2>
              <div className="text-white/90 text-sm leading-relaxed">{content}</div>
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

export default ClientTerms;
