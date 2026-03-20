// ══════════════════════════════════════════════════════════════════
// WEDDING CONSTANTS — All content lives here for easy customization
// ══════════════════════════════════════════════════════════════════

export const WEDDING = {
  bride: {
    firstName: "Meenakshi",
    lastName: "Nair",
    tamilName: "മീനാക്ഷി",
    nickname: "Meenu",
    nakshatram: "Rohini",
    rashi: "Vrishabha (Taurus)",
    bio: "A free-spirited soul with a love for Mohiniyattam, jasmine flowers, and long conversations over Kerala chai. She fills every room with warmth.",
    photo: "/gallery/photo-1.jpg",
  },
  groom: {
    firstName: "Karthikeyan",
    lastName: "Menon",
    tamilName: "കാർത്തിക്",
    nickname: "Karthik",
    nakshatram: "Krittika",
    rashi: "Mesha (Aries)",
    bio: "A devoted engineer with a passion for Kerala temples, backwater voyages, and perfectly brewed black tea. He believes every problem has an elegant solution — including falling in love.",
    photo: "/gallery/photo-5.jpg",
  },
  parents: {
    bride: {
      father: "Mr. N. Krishnan Nair",
      mother: "Mrs. N. Radhamani",
    },
    groom: {
      father: "Mr. T. Gopakumar Menon",
      mother: "Mrs. T. Sreedevi",
    },
  },
  wedding: {
    date: "February 14, 2027",
    dateISO: "2027-02-14T09:15:00",
    muhurthamStart: "9:15 AM",
    muhurthamEnd: "10:30 AM",
    hashtag: "#MeenuWedsKarthik",
    venue: {
      name: "Gokulam Convention Centre",
      address: "Gokulam Convention Centre, Marine Drive Road, Ernakulam, Kerala 682011",
      googleMapsUrl: "https://maps.google.com/?q=Marine+Drive+Ernakulam+Kerala",
      googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0!2d76.2673!3d9.9816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0872b5cbe43f1b%3A0x71cb98c8bef63fad!2sMarine%20Drive%2C%20Ernakulam!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      city: "Ernakulam, Kerala",
    },
  },
  music: {
    // Replace this URL with your actual music file
    url: "",
    title: "Chenda Melam Blessing",
  },
  rsvp: {
    zapierWebhookUrl: process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL || "",
  },
};

export const EVENTS = [
  {
    id: "nischayathartham",
    name: "Nischayathartham",
    tamilName: "നിശ്ചയതാർത്ഥം",
    subtitle: "Engagement Ceremony",
    icon: "💍",
    date: "February 12, 2027",
    time: "11:00 AM – 1:00 PM",
    venue: "Gokulam Convention Centre",
    venueAddress: "Marine Drive, Ernakulam, Kerala",
    dresscode: "Traditional Silk — No dress code restriction",
    description: "The sacred exchange of rings and formal announcement of the union, blessed by both families with Vedic rituals.",
    color: "#C9972C",
  },
  {
    id: "haldi-nalanga",
    name: "Haldi & Nalanga",
    tamilName: "മഞ്ഞൾ ചടങ്ങ്",
    subtitle: "Turmeric & Fun Rituals",
    icon: "🌿",
    date: "February 12, 2027",
    time: "4:00 PM – 8:00 PM",
    venue: "Gokulam Convention Centre",
    venueAddress: "Marine Drive, Ernakulam, Kerala",
    dresscode: "Bright colours — Yellows & Greens preferred",
    description: "Auspicious turmeric rituals, flower decorations, and playful family games. The most laughter-filled evening!",
    color: "#CF9A12",
  },
  {
    id: "sangeetham",
    name: "Sangeetham",
    tamilName: "സംഗീതം",
    subtitle: "Music & Dance Evening",
    icon: "🎵",
    date: "February 13, 2027",
    time: "6:30 PM – 10:00 PM",
    venue: "Gokulam Convention Centre",
    venueAddress: "Marine Drive, Ernakulam, Kerala",
    dresscode: "Semi-formal ethnic — Kasavu sarees & Kurtas",
    description: "An evening of classical and folk performances, Thiruvathira dances, and family skits celebrating the couple.",
    color: "#1E7B6B",
  },
  {
    id: "vivaha-muhurtham",
    name: "Vivaha Muhurtham",
    tamilName: "വിവാഹ മുഹൂർത്തം",
    subtitle: "The Sacred Wedding Ceremony",
    icon: "🪔",
    date: "February 14, 2027",
    time: "9:15 AM – 10:30 AM",
    venue: "Gokulam Convention Centre",
    venueAddress: "Marine Drive, Ernakulam, Kerala",
    dresscode: "Kasavu saree / Mundu — Traditional Kerala attire",
    description: "The most auspicious moment — the Mala exchange and tying of the sacred Thaali under divine Muhurtham. Witness the union of two souls.",
    color: "#1B5538",
    isPrimary: true,
  },
  {
    id: "reception-sadhya",
    name: "Reception & Sadhya",
    tamilName: "സ്വീകരണം",
    subtitle: "Grand Celebration & Feast",
    icon: "🌺",
    date: "February 14, 2027",
    time: "7:00 PM – 11:00 PM",
    venue: "Gokulam Convention Centre",
    venueAddress: "Marine Drive, Ernakulam, Kerala",
    dresscode: "Formal ethnic / Indo-western",
    description: "An elegant evening reception with traditional Kerala Sadhya on banana leaf, blessings, and celebrations with all who love them.",
    color: "#1A5B8F",
  },
];

export const STORY_MILESTONES = [
  {
    year: "2019",
    title: "First Meeting",
    icon: "☕",
    description: "A mutual friend's gathering at a Kochi café on Marine Drive — a spilled chai and a shared laugh that neither could forget.",
  },
  {
    year: "2020",
    title: "Temple Walk",
    icon: "🕌",
    description: "Their first real date — a quiet evening stroll around Ernakulapuram Shiva Temple, talking for hours as the lamps glowed golden.",
  },
  {
    year: "2021",
    title: "The Promise",
    icon: "🤝",
    description: "A misty morning in Munnar, amidst the tea gardens, he whispered the words that would change everything forever.",
  },
  {
    year: "2023",
    title: "Families Joined",
    icon: "🏠",
    description: "Two families, one heart. The elders gave their blessings at a beautiful pooja at the Nair family home in Ernakulam.",
  },
  {
    year: "2027",
    title: "Forever Begins",
    icon: "💍",
    description: "On the most auspicious day, under the divine Muhurtham by the shores of Ernakulam, they begin the beautiful journey of a lifetime together.",
  },
];

export const ITINERARY = [
  { id: 1, time: "6:00 AM", title: "Pookalam & Nilavilakku Lighting", event: "Morning Rituals", icon: "🪔", category: "ritual", description: "Intricate floral Pookalam is laid at the entrance and traditional Nilavilakku lamps are lit to invite prosperity." },
  { id: 2, time: "7:00 AM", title: "Kashi Yatra Ceremony", event: "Morning Rituals", icon: "🚶", category: "ceremony", description: "The playful mock-departure of the groom, intercepted by the bride's father with the promise of his daughter's hand." },
  { id: 3, time: "7:30 AM", title: "Oonjal (Sacred Swing) Ritual", event: "Morning Rituals", icon: "🌊", category: "ritual", description: "The couple is seated on the flower-adorned swing while family sings auspicious Sopana Sangeetham." },
  { id: 4, time: "8:00 AM", title: "Sadya Preparations & Family Games", event: "Morning Rituals", icon: "🎊", category: "celebration", description: "Traditional playful games between families, full of laughter and joy, while the grand Sadhya is lovingly prepared." },
  { id: 5, time: "8:45 AM", title: "Gathering at the Mandapam", event: "Sacred Ceremony", icon: "🏛️", category: "ceremony", description: "Guests take their seats as Chenda Melam fills the air and priests begin the sacred Vedic chants." },
  { id: 6, time: "9:15 AM", title: "Vivaha Muhurtham — Sacred Wedding", event: "Sacred Ceremony", icon: "🔥", category: "ceremony", description: "The most auspicious moment — the couple is united under divine blessings with Mala exchange and Thaali tying." },
  { id: 7, time: "10:30 AM", title: "Thaali Tying & Elder Blessings", event: "Sacred Ceremony", icon: "💛", category: "ritual", description: "The sacred Thaali is tied as elders shower blessings and the Chenda Melam rises to a joyful crescendo." },
  { id: 8, time: "11:00 AM", title: "Photography & Family Portraits", event: "Celebrations", icon: "📸", category: "celebration", description: "Capturing timeless memories with the entire family against the beautiful Ernakulam backdrops." },
  { id: 9, time: "12:30 PM", title: "Grand Kerala Sadhya on Banana Leaf", event: "Celebrations", icon: "🍽️", category: "feast", description: "Authentic Kerala feast on banana leaves with 26 traditional dishes — the most celebrated meal in Kerala culture." },
  { id: 10, time: "2:30 PM", title: "Rest & Guest Celebrations", event: "Celebrations", icon: "🌤️", category: "celebration", description: "An afternoon for guests to mingle along Marine Drive and the couple to relax." },
  { id: 11, time: "7:00 PM", title: "Wedding Reception & Dinner", event: "Evening Reception", icon: "🌹", category: "celebration", description: "An elegant evening with the newlyweds greeting all guests, live music, and Kerala fusion dinner." },
  { id: 12, time: "10:00 PM", title: "Thiruvathira & Farewell", event: "Evening Reception", icon: "✨", category: "celebration", description: "Traditional Thiruvathira dance, music, and a heartfelt farewell to loved ones." },
];

const GALLERY_CAPTIONS = [
  "A love story begins", "Filtered coffee & forever", "Temple walks & whispers",
  "Family blessings", "Jasmine & silk", "The golden hour",
  "Nalangu laughter", "Pre-wedding glow", "Traditions & togetherness",
  "Thaali moment", "Family portrait", "The sadhya feast",
  "Reception evening", "Stars witnessed", "And they lived joyfully",
];

export const GALLERY_PHOTOS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  src: `/gallery/photo-${i + 1}.jpg`,
  alt: GALLERY_CAPTIONS[i] || `Meenu & Karthik — Photo ${i + 1}`,
  caption: GALLERY_CAPTIONS[i] || `Photo ${i + 1}`,
}));

export const hashtag = WEDDING.wedding.hashtag;

export const NAV_LINKS = [
  { label: "Story", href: "#story" },
  { label: "Events", href: "#events" },
  { label: "Venue", href: "#venue" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
];
