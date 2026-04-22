import CursorTrail from "@/components/CursorTrail";
import GlobalAtmosphere from "@/components/GlobalAtmosphere";

const sections = [
  {
    num: "01",
    title: "Introduction",
    content:
      'Zerra Studios ("we", "us", "our") respects your privacy and is committed to protecting your personal data. This policy explains what information we collect, how we use it, and your rights in relation to it.',
  },
  {
    num: "02",
    title: "Information We Collect",
    list: [
      "Contact form submissions (name, email, message)",
      "Usage data via analytics (page views, time on site)",
      "Cookies and similar tracking technologies",
    ],
  },
  {
    num: "03",
    title: "How We Use Your Information",
    list: [
      "To respond to your enquiries submitted via the contact form",
      "To improve our website and services",
      "To send updates if you have opted in",
    ],
  },
  {
    num: "04",
    title: "Data Sharing",
    content:
      "We do not sell your personal data. We may share it with trusted third-party service providers (e.g. email services, analytics) solely to operate our website.",
  },
  {
    num: "05",
    title: "Cookies",
    content:
      "We use essential and analytics cookies to provide and improve our service. You can disable cookies in your browser settings, though some features of the site may not function correctly as a result.",
  },
  {
    num: "06",
    title: "Data Retention",
    content:
      "We retain contact form data for up to 12 months unless you request deletion earlier. See your rights below for how to make a deletion request.",
  },
  {
    num: "07",
    title: "Your Rights",
    content:
      "You have the right to access, correct, or delete your personal data at any time. To exercise any of these rights, contact us at contact@zerrastudios.com.",
  },
  {
    num: "08",
    title: "Third-Party Links",
    content:
      "Our site may contain links to external websites. We are not responsible for the privacy practices or content of those sites and encourage you to review their policies independently.",
  },
  {
    num: "09",
    title: "Changes to This Policy",
    content:
      'We may update this policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. Continued use of the site after any changes constitutes acceptance of the updated policy.',
  },
  {
    num: "10",
    title: "Contact",
    content:
      "For any privacy-related questions or concerns, please email us at contact@zerrastudios.com.",
  },
];

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <GlobalAtmosphere />
    <CursorTrail />

    <div className="max-w-3xl mx-auto px-6 md:px-12 pt-32 pb-24">
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Legal</p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-16">Last updated: April 2026</p>

      <div className="space-y-12">
        {sections.map((s) => (
          <div key={s.num} className="border-t border-border/40 pt-8">
            <div className="flex gap-6 items-start">
              <span className="text-xs text-muted-foreground font-mono mt-1 shrink-0">{s.num}</span>
              <div>
                <h2 className="text-lg font-semibold mb-3">{s.title}</h2>
                {s.content && (
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.content}</p>
                )}
                {s.list && (
                  <ul className="list-disc list-inside space-y-1">
                    {s.list.map((item) => (
                      <li key={item} className="text-muted-foreground text-sm leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-border/40 pt-8">
        <a href="/" className="btn-gold inline-block">
          ← Back to Home
        </a>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
