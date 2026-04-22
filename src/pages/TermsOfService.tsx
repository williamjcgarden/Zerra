import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalAtmosphere from "@/components/GlobalAtmosphere";
import AtmosphericBg from "@/components/AtmosphericBg";

const sections = [
  {
    title: "Acceptance of Terms",
    content: (
      <p>
        By accessing and using zerrastudios.com, you agree to be bound by these Terms of Service
        and all applicable laws and regulations. If you do not agree with any of these terms, you
        are prohibited from using this site.
      </p>
    ),
  },
  {
    title: "Services",
    content: (
      <p>
        Zerra Studios provides creative and digital services including branding, web design, and
        motion. These terms govern your use of our website only — they do not govern any specific
        client engagement. Project work is subject to separate client agreements.
      </p>
    ),
  },
  {
    title: "Intellectual Property",
    content: (
      <p>
        All content on this website — including text, graphics, logos, images, and code — is the
        property of Zerra Studios and is protected by applicable copyright laws. You may not
        reproduce, distribute, or otherwise use any content without prior written permission from
        Zerra Studios.
      </p>
    ),
  },
  {
    title: "User Conduct",
    content: (
      <>
        <p className="mb-3">By using this site, you agree not to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Use the site for any unlawful purpose</li>
          <li>Attempt to gain unauthorised access to any part of the site</li>
          <li>Transmit harmful, offensive, or disruptive content via the contact form</li>
        </ul>
      </>
    ),
  },
  {
    title: "Contact Form",
    content: (
      <p>
        Submitting the contact form does not constitute a contractual agreement between you and
        Zerra Studios. Project engagements are formalised through separate client agreements
        signed by both parties.
      </p>
    ),
  },
  {
    title: "Disclaimer of Warranties",
    content: (
      <p>
        This website is provided "as is" without warranties of any kind, either express or implied.
        Zerra Studios does not guarantee that the site will be error-free, uninterrupted, or free
        of viruses or other harmful components.
      </p>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <p>
        To the fullest extent permitted by law, Zerra Studios shall not be liable for any indirect,
        incidental, special, or consequential damages arising from your use of, or inability to use,
        this website.
      </p>
    ),
  },
  {
    title: "Third-Party Links",
    content: (
      <p>
        This site may contain links to third-party websites. We are not responsible for the content,
        accuracy, or privacy practices of those sites and encourage you to review their terms and
        policies independently.
      </p>
    ),
  },
  {
    title: "Governing Law",
    content: (
      <p>
        These Terms of Service are governed by and construed in accordance with the laws of British
        Columbia, Canada, without regard to its conflict of law provisions.
      </p>
    ),
  },
  {
    title: "Changes to Terms",
    content: (
      <p>
        We reserve the right to update these terms at any time. Changes take effect immediately upon
        posting to this page. Continued use of the site following any changes constitutes your
        acceptance of the revised terms.
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p>
        For any questions regarding these terms, please contact us at{" "}
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

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Zerra Studios</title>
        <meta name="description" content="Review Zerra Studios' terms of service governing the use of our web design, development, and marketing agency services." />
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
            Terms of <span className="text-gradient-gold">Service</span>
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

export default TermsOfService;
