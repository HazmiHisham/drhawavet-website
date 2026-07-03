export const BRANCHES = [
  {
    id: "nilai",
    name: "drhawavet Nilai",
    address: "No. 12, Jalan Nilai Square, 71800 Nilai, Negeri Sembilan",
    whatsapp: "https://wa.me/601110922031",
    lat: 2.821192177553736,
    lng: 101.78894374782178,
  },
  {
    id: "bangi",
    name: "drhawavet Bangi",
    address: "Lot 8, Jalan Medan Bangi, 43650 Bandar Baru Bangi, Selangor",
    whatsapp: "https://wa.me/60107989220",
    lat: 2.9637990996368835,
    lng: 101.76329939571912,
  },
  {
    id: "shah-alam",
    name: "drhawavet Shah Alam",
    address: "No. 45, Persiaran Kayangan, 40000 Shah Alam, Selangor",
    whatsapp: "https://wa.me/601110922013",
    lat: 3.0896838563372415,
    lng: 101.54481618217952,
  },
  {
    id: "sri-rampai",
    name: "drhawavet Sri Rampai",
    address: "No. 22, Jalan Sri Rampai 2, 53300 Kuala Lumpur",
    whatsapp: "https://wa.me/60122054220",
    lat: 3.195776326178039,
    lng: 101.7275803046247,
  },
  {
    id: "puchong",
    name: "drhawavet Puchong",
    address: "No. 18, Jalan Puchong Utama, 47100 Puchong, Selangor",
    whatsapp: "https://wa.me/60129174202",
    lat: 2.9919081554267404,
    lng: 101.61773578217954,
  },
  {
    id: "ampang",
    name: "drhawavet Ampang",
    address: "No. 7, Jalan Ampang Hilir, 55000 Kuala Lumpur",
    whatsapp: "https://wa.me/60122939220",
    lat: 3.135002056010653,
    lng: 101.7696072600223,
  },
  {
    id: "kota-damansara",
    name: "drhawavet Kota Damansara",
    address: "No. 33, Jalan Teknologi, 47810 Kota Damansara, Selangor",
    whatsapp: "https://wa.me/60127969220",
    lat: 3.1521020178583297,
    lng: 101.59122472328397,
  },
] as const;

export type Branch = (typeof BRANCHES)[number];

export const OPENING_HOURS = {
  title: "We Are Open Everyday",
  hours: "10:00 AM – 6:00 PM",
  lastRegistration: "5:30 PM",
  breakTime: "1:00 PM – 2:30 PM",
} as const;

export const NOTICE = {
  title: "Walk-in Available",
  content: "Walk-in available for ALL services",
  exceptions: ["Grooming", "Neuter"],
} as const;

export const SERVICES = [
  {
    id: "consultation",
    title: "General Consultation",
    description: "Comprehensive health assessments for cats, dogs, and other pets.",
    icon: "Stethoscope",
  },
  {
    id: "vaccination",
    title: "Vaccination",
    description: "Core and optional vaccines to keep your pets protected year-round.",
    icon: "Syringe",
  },
  {
    id: "surgery",
    title: "Pet Surgery",
    description: "Safe surgical procedures performed by experienced veterinarians.",
    icon: "HeartPulse",
  },
  {
    id: "neutering",
    title: "Neutering",
    description: "Professional spay and neuter services for healthier, happier pets.",
    icon: "Scissors",
  },
  {
    id: "cat-grooming",
    title: "Cat Grooming",
    description: "Gentle grooming tailored for feline comfort and hygiene.",
    icon: "Cat",
  },
  {
    id: "dog-grooming",
    title: "Dog Grooming",
    description: "Full grooming packages to keep your dog looking and feeling great.",
    icon: "Dog",
  },
  {
    id: "health-check",
    title: "Health Check",
    description: "Routine wellness exams to detect issues early and prevent illness.",
    icon: "ClipboardCheck",
  },
  {
    id: "emergency",
    title: "Emergency Care",
    description: "Prompt urgent care when your pet needs immediate attention.",
    icon: "Siren",
  },
  {
    id: "pharmacy",
    title: "Pet Pharmacy",
    description: "Prescription medications and quality pet health products on-site.",
    icon: "Pill",
  },
  {
    id: "nutrition",
    title: "Pet Nutrition Advice",
    description: "Personalized dietary guidance for optimal pet health and vitality.",
    icon: "Apple",
  },
] as const;

export const BOOKING_SERVICES = [
  "Consultation",
  "Vaccination",
  "Grooming",
  "Neuter",
  "Surgery",
  "Health Check",
] as const;

export const PET_TYPES = ["Cat", "Dog", "Others"] as const;

export const ABOUT_FEATURES = [
  {
    title: "Experienced Veterinarians",
    description: "Skilled doctors with years of hands-on clinical experience.",
    icon: "UserCheck",
  },
  {
    title: "Modern Equipment",
    description: "State-of-the-art diagnostic and treatment tools for accurate care.",
    icon: "Microscope",
  },
  {
    title: "Affordable Treatment",
    description: "Quality veterinary services at transparent, competitive prices.",
    icon: "Wallet",
  },
  {
    title: "Friendly Staff",
    description: "Warm, caring team dedicated to making every visit stress-free.",
    icon: "Smile",
  },
  {
    title: "Comfortable Environment",
    description: "Clean, calming clinic spaces designed for pets and owners alike.",
    icon: "Home",
  },
] as const;

export const STATS = [
  { value: "7", label: "Branches" },
  { value: "Everyday", label: "Open Everyday" },
  { value: "1000+", label: "Happy Pets" },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "Experienced Doctors",
    description: "Board-certified vets with a passion for animal welfare.",
    icon: "Award",
  },
  {
    title: "Modern Facilities",
    description: "Clean, well-equipped clinics across the Klang Valley.",
    icon: "Building2",
  },
  {
    title: "Compassionate Care",
    description: "We treat every pet with the love and respect they deserve.",
    icon: "Heart",
  },
  {
    title: "Affordable Pricing",
    description: "Premium care without the premium price tag.",
    icon: "BadgeDollarSign",
  },
  {
    title: "Multiple Branches",
    description: "Seven convenient locations to serve you better.",
    icon: "MapPin",
  },
  {
    title: "Open Everyday",
    description: "Consistent hours so you can visit when it suits you.",
    icon: "Clock",
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    rating: 5,
    quote: "Very friendly doctors and excellent treatment!",
    author: "Sarah M.",
    pet: "Golden Retriever owner",
  },
  {
    id: 2,
    rating: 5,
    quote: "My cat loves coming here.",
    author: "Ahmad R.",
    pet: "Persian cat owner",
  },
  {
    id: 3,
    rating: 5,
    quote: "Professional service and clean clinic.",
    author: "Lisa T.",
    pet: "Shih Tzu owner",
  },
  {
    id: 4,
    rating: 5,
    quote: "Affordable prices and caring staff. Highly recommended!",
    author: "David L.",
    pet: "Mixed breed dog owner",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Do I need appointment?",
    answer:
      "Appointments are recommended to reduce waiting time, especially for surgery and grooming. However, walk-ins are welcome for most services.",
  },
  {
    question: "Can I walk in?",
    answer:
      "Yes! Walk-in is available for all services except Grooming and Neuter, which require prior booking.",
  },
  {
    question: "What pets do you treat?",
    answer:
      "We primarily treat cats and dogs, and also provide care for rabbits, hamsters, and other small companion animals.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept cash, credit/debit cards, online banking, and selected e-wallets including Touch 'n Go and GrabPay.",
  },
] as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Booking", href: "#booking" },
  { label: "Branches", href: "#branches" },
  { label: "Shop", href: "/shop", comingSoon: true },
  { label: "FAQ", href: "#faq" },
] as const;

export const FOOTER_SERVICES = [
  "General Consultation",
  "Vaccination",
  "Pet Surgery",
  "Grooming",
  "Emergency Care",
] as const;

export const WHATSAPP_LINK = "https://wa.me/60000000000";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/drhawa.vet/",
  tiktok: "https://www.tiktok.com/@drhawa.vet",
} as const;
