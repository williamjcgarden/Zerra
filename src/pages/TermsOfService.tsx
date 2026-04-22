import CursorTrail from "@/components/CursorTrail";
import GlobalAtmosphere from "@/components/GlobalAtmosphere";

const sections = [
  {
    num: "01",
    title: "Acceptance of Terms",
    content:
      "By accessing and using zerrastudios.com, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.",
  },
  {
    num: "02",
    title: "Services",
    content:
      "Zerra Studios provides creative and digital services including branding, web design, and motion. These terms govern your use of our website only — they do not govern any specific client engagement. Project work is subject to separate client agreements.",
  },
  {
    num: "03",
    title: "Intellectual Property",
    content:
      "All content on this website — including text, graphics, logos, images, and code — is the property of Zerra Studios and is protected by applicable copyright laws. You may not reproduce, distribute, or otherwise use any content without prior written permission from Zerra Studios.",
  },
  {
    num: "04",
    title: "User Conduct",
    intro: "By using this site, you agree not to:",
    list: [
      "Use the site for any unlawful purpose",
      "Attempt to gain unauthorised access to any part of the site",
      "Transmit harmful, offensive, or disruptive content via the contact form",
    ],
  },
  {
    num: "05",
    title: "Contact Form",
    content:
      "Submitting the contact form does not constitute a contractual agreement between you and Zerra Studios. Project engagements are formalised through separate client agreements signed by both parties.",
  },
  {
    num: "06",
    title: "Disclaimer of Warranties",
    content:
      'This website is provided "as is" without warranties of any kind, either express or implied. Zerra Studios does not guarantee that the site will be error-free, uninterrupted, or free of viruses or other harmful components.',
  },
  {
    num: "07",
    title: "Limitation of Liability",
    content:
      "To the fullest extent permitted by law, Zerra Studios shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, this website.",
  },
  {
    num: "08",
    title: "Third-Party Links",
    content:
      "This site may contain links to third-party websites. We are not responsible for the content, accuracy, or privacy practices of those sites and encourage you to review their terms and policies independently.",
  },
  {
    num: "09",
    title: "Governing Law",
    content:
      "These Terms of Service are governed by and construed in accordance with the laws of British Columbia, Canada, without regard to its conflict of law provisions.",
  },
  {
    num: "10",
    title: "Changes to Terms",
    content:
      "We reserve the right to update these terms at any time. Changes take effect immediately upon posting to this page. Continued use of the site following any changes constitutes your acceptance of the revised terms.",
  },
  {
    num: "11",
    title: "Contact",
    content:
      "For any questions regarding these terms, please contact us at contact@zerrastudios.com.",
  },
];

const TermsOfService = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <GlobalAtmosphere />
    <CursorTrail />

    <div className="max-w-3xl mx-auto px-6 md:px-12 pt-32 pb-24">
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Legal</p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-16">Last updated: April 2026</p>

      <div className="space-y-12">
        {sections.map((s) => (
          <div key={s.num} className="border-t border-border/40 pt-8">
            <div className="flex gap-6 items-start">
              <span className="text-xs text-muted-foreground font-mono mt-1 shrink-0">{s.num}</span>
              <div>
                <h2 className="text-lg font-semibold mb-3">{s.title}</h2>
                {s.intro && (
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">{s.intro}</p>
                )}
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

export default TermsOfService;
