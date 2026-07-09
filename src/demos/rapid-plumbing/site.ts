export const SITE = {
  name: "Rapid Plumbing & Gas",
  legalName: "Rapid Plumbing Ltd",
  phoneDisplay: "(250) 792-4884",
  phoneHref: "tel:+12507924884",
  email: "rapidplumbingcv@gmail.com",
  emailHref: "mailto:rapidplumbingcv@gmail.com",
  area: "Comox Valley",
  rating: 5.0,
  reviewCount: 98,
  facebook: "https://www.facebook.com/105247498867637",
  url: "https://rapidplumbingltd.ca",
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/reviews", label: "Reviews" },
  { to: "/service-areas", label: "Service Areas" },
  { to: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    slug: "plumbing-service-calls",
    title: "Plumbing Repairs & Service Calls",
    short: "Fast, reliable repairs for leaks, clogs, fixtures, and everything in between.",
    icon: "Wrench",
    reasons: [
      "Leaking taps, toilets, or supply lines",
      "Low water pressure or noisy pipes",
      "Fixture replacements and upgrades",
      "Emergency shut-offs and diagnosis",
    ],
  },
  {
    slug: "hot-water-tank-replacement",
    title: "Hot Water Tank Replacement",
    short: "Same-day diagnosis and safe installation of gas and electric hot water tanks.",
    icon: "Flame",
    reasons: [
      "No hot water or running out quickly",
      "Rust, leaks, or noisy tank operation",
      "Aging tank (10+ years old)",
      "Upgrading capacity or efficiency",
    ],
  },
  {
    slug: "gas-services",
    title: "Gas Services",
    short: "Certified gas fitting for appliances, lines, BBQs, ranges, and fireplaces.",
    icon: "Flame",
    reasons: [
      "New gas appliance hookups",
      "Gas line installation or extension",
      "Suspected leaks or safety concerns",
      "Conversions and outdoor gas lines",
    ],
  },
  {
    slug: "new-home-construction",
    title: "New Home Construction Plumbing",
    short: "Full plumbing rough-in and finish for builders and custom homes across Comox Valley.",
    icon: "HardHat",
    reasons: [
      "Complete rough-in to finish work",
      "Coordination with your build schedule",
      "Code-compliant, inspection-ready",
      "Builder-friendly communication",
    ],
  },
  {
    slug: "plumbing-renovations",
    title: "Plumbing Renovations",
    short: "Kitchen, bathroom, and whole-home plumbing renovations done clean and on time.",
    icon: "Hammer",
    reasons: [
      "Bathroom or kitchen remodels",
      "Relocating fixtures or supply lines",
      "Basement suite additions",
      "Modernizing older plumbing systems",
    ],
  },
  {
    slug: "poly-b-replacement",
    title: "Poly-B Replacement",
    short: "Full removal and replacement of Poly-B piping with modern, reliable materials.",
    icon: "PipetteIcon",
    reasons: [
      "Insurance-driven Poly-B upgrades",
      "Discoloured or leaking supply lines",
      "Homes built 1985–1997",
      "Selling or renovating your home",
    ],
  },
  {
    slug: "perimeter-drain-inspections",
    title: "Perimeter Drain Inspections",
    short: "Locate blockages and failures in perimeter drains before they damage your foundation.",
    icon: "Search",
    reasons: [
      "Wet basements or crawlspaces",
      "Pooling water near foundation",
      "Pre-purchase home inspections",
      "Recurring drainage issues",
    ],
  },
  {
    slug: "sewer-inspections",
    title: "Sewer Inspections",
    short: "Diagnose blockages, root intrusion, and pipe damage with professional sewer inspections.",
    icon: "Waves",
    reasons: [
      "Backups or slow-draining sewer lines",
      "Buying or selling a home",
      "Persistent odours",
      "Older clay or cast iron systems",
    ],
  },
  {
    slug: "drain-camera-inspections",
    title: "Drain Camera Inspections",
    short: "High-resolution camera inspections that pinpoint problems without guesswork.",
    icon: "Video",
    reasons: [
      "Confirm the exact cause of a blockage",
      "Visual proof for insurance or resale",
      "Locate broken or collapsed pipes",
      "Verify repairs after service",
    ],
  },
] as const;

export const REVIEWS = [
  {
    name: "Jon Slater",
    date: "2026-07-02",
    quote:
      "Prompt service. Jack was pleasant, respected our home, and got everything sorted quickly. Would absolutely call Rapid again.",
  },
  {
    name: "Ann Dean",
    date: "2026-05-29",
    quote:
      "Great service, reliable, honest pricing! Andrew was fantastic — clear communication and quality workmanship start to finish.",
  },
  {
    name: "Joel Ornoy",
    date: "2026-05-26",
    quote:
      "Andrew is clearly a skilled and up-front guy. Explained what needed doing, gave a fair quote, and got the job done right.",
  },
  {
    name: "Homeowner, Courtenay",
    date: "2026-04-18",
    quote:
      "Booked a hot water tank swap in the morning, hot water back by afternoon. Clean, respectful, professional.",
  },
  {
    name: "Local Builder",
    date: "2026-03-11",
    quote:
      "We use Rapid for our custom builds. On time, on budget, and inspection-ready every time.",
  },
  {
    name: "Comox Resident",
    date: "2026-02-02",
    quote:
      "Gas fireplace install went perfectly. Great crew, great result.",
  },
];
