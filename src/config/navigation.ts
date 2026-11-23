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
          },
          {
            key: "email",
            descriptionKey: "emailDesc",
            icon: "mail",
          },
          {
            key: "campaigns",
            descriptionKey: "campaignsDesc",
            icon: "megaphone",
          },
          {
            key: "appointments",
            descriptionKey: "appointmentsDesc",
            icon: "calendar",
          },
          {
            key: "aiCalls",
            descriptionKey: "aiCallsDesc",
            icon: "phone",
          },
          {
            key: "aiAssistant",
            descriptionKey: "aiAssistantDesc",
            icon: "brain",
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
          },
          {
            key: "analytics",
            descriptionKey: "analyticsDesc",
            icon: "bar-chart-3",
          },
          {
            key: "marketplace",
            descriptionKey: "marketplaceDesc",
            icon: "marketplace",
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
      },
      {
        key: "telegram",
        icon: "telegram",
        descriptionKey: "telegramDesc",
      },
      {
        key: "gmail",
        icon: "gmail",
        descriptionKey: "gmailDesc",
      },
      {
        key: "whatsappPersonal",
        icon: "whatsapp-personal",
        descriptionKey: "whatsappPersonalDesc",
      },
      {
        key: "line",
        icon: "line",
        descriptionKey: "lineDesc",
      },
      {
        key: "outlook",
        icon: "outlook",
        descriptionKey: "outlookDesc",
      },
      {
        key: "instagram",
        icon: "instagram",
        descriptionKey: "instagramDesc",
      },
      {
        key: "webchat",
        icon: "webchat",
        descriptionKey: "webchatDesc",
      },
      {
        key: "googleBusiness",
        icon: "google-business",
        descriptionKey: "googleBusinessDesc",
      },
      {
        key: "messenger",
        icon: "messenger",
        descriptionKey: "messengerDesc",
      },
      {
        key: "platformEmail",
        icon: "email",
        descriptionKey: "platformEmailDesc",
      },
      {
        key: "sms",
        icon: "sms",
        descriptionKey: "smsDesc",
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
