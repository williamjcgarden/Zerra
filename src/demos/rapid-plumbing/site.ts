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
  googleReviews: "https://maps.google.com/maps?cid=15576250372192585841",
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
    name: "Ann Dean",
    source: "Google Review",
    quote:
      "Great service ,reliable, honest pricing! Andrew thought of things that made my life much easier…things I didn’t even know to ask for. Jack is amazing..works so hard and crawls into places no one should dare to tread! Thanks so much guys!",
  },
  {
    name: "joel ornoy",
    source: "Google Review",
    quote:
      "Andrew is clearly a skilled and up-front guy, that you can rely on to get the job done and also give you amazing advice, even if it costs him. He pointed out cost/cutting tips that would save me a lot of money, Definitely rate him 10/10, after having done extensive research on local plumbers and highly appreciate his honesty, that sets him apart from all the others. Thanks, Andrew!!",
  },
  {
    name: "Brittany Peters",
    source: "Google Review",
    quote:
      "Amazing service. I can't recommend them enough. They went above and beyond to get a chaotic job done and helped us all along the way. These guys are pros!",
  },
  {
    name: "Karyn Ruel",
    source: "Google Review",
    quote:
      "Andrew and Jack are awesome! They are fast, efficient, knowledgeable and great to deal with! I wouldn't hesitate to get them for any of our plumbing needs in future.",
  },
  {
    name: "Derek Rice",
    source: "Google Review",
    quote:
      "It was a small plumbing job, but it was something that had been bothering me for a long time. Rapid got me fixed within 2 days! Awesome service! Thank you Rapid Team!",
  },
];
