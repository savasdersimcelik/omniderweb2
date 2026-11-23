/**
 * Marketing header navigation.
 * Most items are display-only until pages exist.
 */

export type NavItem = {
  key: string;
  descriptionKey?: string;
  icon?: string;
  /** Brand logo path under /public (svg/png) */
  logo?: string;
  badgeKey?: string;
  /** When set, mega/mobile item navigates here */
  href?: string;
};

export type NavGroup = {
  key: string;
  items: NavItem[];
};

export type NavFeatured = {
  key: string;
  descriptionKey: string;
  image: string;
  ctaKey?: string;
};

export type NavSector = {
  key: string;
  icon?: string;
  image?: string;
  items: NavItem[];
  featured?: NavFeatured;
};

export type NavProductTab = {
  key: string;
  icon?: string;
  image?: string;
  items: NavItem[];
};

export type NavMega = {
  key: "products" | "industries" | "platforms" | "resources";
  kind: "mega";
  layout: "products" | "industries" | "platforms" | "resources";
  featured?: NavFeatured;
  groups?: NavGroup[];
  items?: NavItem[];
  sectors?: NavSector[];
  tabs?: NavProductTab[];
  footer?: Array<{ key: string; href?: string }>;
};

export type NavLink = {
  key: "pricing" | "contact";
  kind: "link";
  href: string;
};

export type NavEntry = NavMega | NavLink;

export const navigation: NavEntry[] = [
  {
    key: "products",
    kind: "mega",
    layout: "products",
    featured: {
      key: "messaging",
      descriptionKey: "messagingFeaturedDesc",
      image: "/images/mega/products-card-light.jpg",
      ctaKey: "exploreMessaging",
    },
    groups: [
      {
        key: "platform",
        items: [
          {
            key: "messaging",
            descriptionKey: "messagingDesc",
            icon: "inbox",
            href: "/messaging",
          },
          {
            key: "email",
            descriptionKey: "emailDesc",
            icon: "mail",
            href: "/email",
          },
          {
            key: "campaigns",
            descriptionKey: "campaignsDesc",
            icon: "megaphone",
            href: "/campaigns",
          },
          {
            key: "appointments",
            descriptionKey: "appointmentsDesc",
            icon: "calendar",
            href: "/appointments",
          },
          {
            key: "aiCalls",
            descriptionKey: "aiCallsDesc",
            icon: "phone",
            href: "/ai-calls",
          },
          {
            key: "aiAssistant",
            descriptionKey: "aiAssistantDesc",
            icon: "brain",
            href: "/ai-assistant",
          },
        ],
      },
      {
        key: "services",
        items: [
          {
            key: "linkShortener",
            descriptionKey: "linkShortenerDesc",
            icon: "link",
            href: "/link-shortener",
          },
          {
            key: "analytics",
            descriptionKey: "analyticsDesc",
            icon: "bar-chart-3",
            href: "/analytics",
          },
          {
            key: "marketplace",
            descriptionKey: "marketplaceDesc",
            icon: "marketplace",
            href: "/marketplace",
          },
          {
            key: "seo",
            descriptionKey: "seoDesc",
            icon: "search",
          },
          {
            key: "insights",
            descriptionKey: "insightsDesc",
            icon: "layout-dashboard",
          },
          {
            key: "socialPublishing",
            descriptionKey: "socialPublishingDesc",
            icon: "share-2",
          },
        ],
      },
      {
        key: "apps",
        items: [
          { key: "android", logo: "/icons/apps/android.svg" },
          { key: "ios", logo: "/icons/apps/ios.svg" },
          { key: "chrome", logo: "/icons/apps/chrome.svg" },
          { key: "firefox", logo: "/icons/apps/firefox.svg" },
          { key: "opera", logo: "/icons/apps/opera.svg" },
          { key: "windows", logo: "/icons/apps/windows.svg" },
          { key: "mac", logo: "/icons/apps/mac.svg" },
          { key: "linux", logo: "/icons/apps/linux.svg" },
        ],
      },
    ],
  },
  {
    key: "industries",
    kind: "mega",
    layout: "industries",
    sectors: [
      {
        key: "healthcare",
        icon: "heart-pulse",
        image: "/images/mega/sectors/healthcare.jpg",
        items: [
          { key: "dentalClinics", icon: "smile" },
          { key: "hairTransplant", icon: "sparkles" },
          { key: "eyeClinics", icon: "eye" },
          { key: "ivfCenters", icon: "heart" },
          { key: "privateHospitals", icon: "building-2" },
          { key: "medicalAesthetic", icon: "sparkles" },
          { key: "veterinaryClinics", icon: "paw-print" },
          { key: "psychologyCenters", icon: "brain" },
          { key: "physioCenters", icon: "activity" },
          { key: "pharmacyClinics", icon: "heart-pulse" },
        ],
      },
      {
        key: "aesthetics",
        icon: "scan-face",
        image: "/images/mega/sectors/aesthetics.jpg",
        items: [
          { key: "aestheticSurgery", icon: "scan-face" },
          { key: "beautyCenters", icon: "sparkles" },
          { key: "dermatologyClinics", icon: "scan-face" },
          { key: "laserClinics", icon: "sparkles" },
          { key: "spaWellness", icon: "heart" },
          { key: "nailStudios", icon: "sparkles" },
          { key: "hairSalons", icon: "scissors" },
          { key: "cosmeticDentistry", icon: "smile" },
          { key: "nutritionCenters", icon: "apple" },
          { key: "wellnessCoaching", icon: "heart-pulse" },
        ],
      },
      {
        key: "sales",
        icon: "briefcase",
        image: "/images/mega/sectors/sales.jpg",
        items: [
          { key: "realEstate", icon: "home" },
          { key: "carDealerships", icon: "car" },
          { key: "insuranceAgencies", icon: "shield" },
          { key: "lawFirms", icon: "scale" },
          { key: "constructionCompanies", icon: "hard-hat" },
          { key: "financeConsulting", icon: "briefcase" },
          { key: "realEstateInvestors", icon: "home" },
          { key: "solarEnergy", icon: "sun" },
          { key: "technicalService", icon: "wrench" },
          { key: "manufacturing", icon: "factory" },
        ],
      },
      {
        key: "travel",
        icon: "plane",
        image: "/images/mega/sectors/travel.jpg",
        items: [
          { key: "travelAgencies", icon: "plane" },
          { key: "hotels", icon: "hotel" },
          { key: "carRental", icon: "car" },
          { key: "eventPlanning", icon: "calendar" },
          { key: "restaurants", icon: "utensils" },
          { key: "tourOperators", icon: "map" },
          { key: "yachtCharter", icon: "ship" },
          { key: "airportTransfers", icon: "car" },
          { key: "holidayHomes", icon: "home" },
          { key: "miceAgencies", icon: "calendar" },
        ],
      },
      {
        key: "education",
        icon: "graduation-cap",
        image: "/images/mega/sectors/education.jpg",
        items: [
          { key: "privateSchools", icon: "graduation-cap" },
          { key: "trainingCenters", icon: "book-open" },
          { key: "ecommerceBrands", icon: "store" },
          { key: "hrAgencies", icon: "users" },
          { key: "gyms", icon: "dumbbell" },
          { key: "languageSchools", icon: "languages" },
          { key: "universities", icon: "graduation-cap" },
          { key: "daycareCenters", icon: "baby" },
          { key: "onlineCourses", icon: "monitor" },
          { key: "consultingFirms", icon: "briefcase" },
        ],
      },
    ],
  },
  {
    key: "platforms",
    kind: "mega",
    layout: "platforms",
    featured: {
      key: "platformsSpotlight",
      descriptionKey: "platformsSpotlightDesc",
      image: "/images/mega/platforms-card-light.jpg",
      ctaKey: "viewAllPlatforms",
    },
    items: [
      {
        key: "whatsappBusiness",
        icon: "whatsapp-business",
        descriptionKey: "whatsappBusinessDesc",
        href: "/platforms/whatsapp-business",
      },
      {
        key: "telegram",
        icon: "telegram",
        descriptionKey: "telegramDesc",
        href: "/platforms/telegram",
      },
      {
        key: "gmail",
        icon: "gmail",
        descriptionKey: "gmailDesc",
        href: "/platforms/gmail",
      },
      {
        key: "whatsappPersonal",
        icon: "whatsapp-personal",
        descriptionKey: "whatsappPersonalDesc",
        href: "/platforms/whatsapp-personal",
      },
      {
        key: "line",
        icon: "line",
        descriptionKey: "lineDesc",
        href: "/platforms/line",
      },
      {
        key: "outlook",
        icon: "outlook",
        descriptionKey: "outlookDesc",
        href: "/platforms/outlook",
      },
      {
        key: "instagram",
        icon: "instagram",
        descriptionKey: "instagramDesc",
        href: "/platforms/instagram",
      },
      {
        key: "webchat",
        icon: "webchat",
        descriptionKey: "webchatDesc",
        href: "/platforms/webchat",
      },
      {
        key: "googleBusiness",
        icon: "google-business",
        descriptionKey: "googleBusinessDesc",
        href: "/platforms/google-business",
      },
      {
        key: "messenger",
        icon: "messenger",
        descriptionKey: "messengerDesc",
        href: "/platforms/messenger",
      },
      {
        key: "platformEmail",
        icon: "email",
        descriptionKey: "platformEmailDesc",
        href: "/platforms/email",
      },
      {
        key: "sms",
        icon: "sms",
        descriptionKey: "smsDesc",
        href: "/platforms/sms",
      },
    ],
  },
  {
    key: "resources",
    kind: "mega",
    layout: "resources",
    featured: {
      key: "resourcesSpotlight",
      descriptionKey: "resourcesSpotlightDesc",
      image: "/images/mega/resources-card-light.jpg",
      ctaKey: "openDocs",
    },
    groups: [
      {
        key: "docs",
        items: [
          {
            key: "docs",
            descriptionKey: "docsDesc",
            icon: "book-open",
          },
          {
            key: "api",
            descriptionKey: "apiDesc",
            icon: "code-2",
            badgeKey: "badgeDev",
          },
          {
            key: "developers",
            descriptionKey: "developersDesc",
            icon: "terminal",
          },
          {
            key: "security",
            descriptionKey: "securityDesc",
            icon: "shield",
          },
        ],
      },
      {
        key: "learn",
        items: [
          {
            key: "blog",
            descriptionKey: "blogDesc",
            icon: "newspaper",
          },
          {
            key: "changelog",
            descriptionKey: "changelogDesc",
            icon: "sparkles",
          },
          {
            key: "status",
            descriptionKey: "statusDesc",
            icon: "activity",
          },
          {
            key: "helpCenter",
            descriptionKey: "helpCenterDesc",
            icon: "life-buoy",
          },
        ],
      },
    ],
  },
  {
    key: "pricing",
    kind: "link",
    href: "/pricing",
  },
  {
    key: "contact",
    kind: "link",
    href: "/contact",
  },
];
