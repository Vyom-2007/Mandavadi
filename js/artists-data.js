/**
 * ==========================================
 * MANDAVADI ARTISTS DATA STORE
 * Structured data for artists, musicians & performers
 * ==========================================
 */

const mandavadiArtists = [
    {
        id: "nishad-soni",
        slug: "nishad-soni",
        name: "Nishad Soni",
        role: "Lead Vocalist & Garba Artist",
        category: "Singers",
        secondaryCategories: ["Garba Artists", "Live Performer", "Musicians"],
        photo: "assets/images/artists/nishad-soni-main.jpg",
        stagePhoto: "assets/images/artists/nishad-soni-performance.jpg",
        ensemblePhoto: "assets/images/artists/nishad-soni-ensemble.jpg",
        shortBio: "Renowned Gujarati vocalist and live Garba artist known for his soulful devotional voice, commanding stage presence, and captivating raas rhythms during Navratri in Ahmedabad.",
        fullBio: "Nishad Soni is the voice and musical heartbeat of Mandavadi Navratri in Ahmedabad. With a deep foundation in classical Indian vocal traditions, Gujarati Sugam Sangeet, and high-energy folk Garba, Nishad brings authenticity, devotional resonance, and unmatched vibrancy to the stage. His vocal range effortlessly navigates from sacred, tranquil Maa Amba Aartis to electrifying Dodhiyu and Hinch rhythms that keep thousands of Garba enthusiasts dancing in unison all night long.",
        genres: ["Traditional Garba", "Gujarati Folk", "Devotional Aarti", "Raas-Dandiya", "Sugam Sangeet"],
        musicalStyle: "Acoustic-driven authentic Gujarati Garba rooted in live dhol beats, traditional folk melodies, and devotional hymns, honoring cultural purity without synthetic pre-recordings.",
        mandavadiConnection: "As the exclusive headlining artist of Mandavadi Navratri, Nishad Soni curates a continuous ten-night musical journey—from the auspicious evening Shankhnaad and Aarti to sunset-to-sunrise Garba circles at Nidhivan Party Plot, Ahmedabad.",
        performanceHighlights: [
            "Traditional 2-Taali & 3-Taali authentic Garba compositions",
            "Live Maa Amba Aarti with acoustic dhol, harmonium & sharnay",
            "Fast-paced Hinch and Dodhiyu raas segments",
            "Soulful Gujarati folk compositions and devotional Stutis",
            "Interactive call-and-response connecting with thousands of Garba players"
        ],
        socialLinks: {
            instagram: "https://www.instagram.com/",
            youtube: "https://www.youtube.com/",
            spotify: "https://open.spotify.com/"
        },
        featured: true,
        galleryImages: [
            {
                url: "assets/images/artists/nishad-soni-main.jpg",
                alt: "Nishad Soni performing Garba at Mandavadi Navratri in Ahmedabad",
                title: "Live Stage Vocal Performance",
                aspectRatio: "3:4"
            },
            {
                url: "assets/images/artists/nishad-soni-performance.jpg",
                alt: "Nishad Soni live performance during Ahmedabad Navratri",
                title: "Energy on Stage with Dancing Crowd",
                aspectRatio: "3:4"
            },
            {
                url: "assets/images/artists/nishad-soni-ensemble.jpg",
                alt: "Nishad Soni live ensemble with master dholis at Mandavadi Navratri in Ahmedabad",
                title: "Master Dhol & Percussion Mandali",
                aspectRatio: "16:9"
            },
            {
                url: "assets/images/artists/stage-atmosphere.jpg",
                alt: "Mandavadi Navratri festival stage with live music and Garba dancers in Ahmedabad",
                title: "Festival Stage & Garba Circles",
                aspectRatio: "16:9"
            }
        ],
        performanceSets: [
            {
                title: "Pratham Aarti & Shlok Aradhana",
                time: "08:30 PM - 09:30 PM",
                tag: "Devotional Invocations",
                desc: "Sacred opening invocations, Stutis, and the grand Maha Aarti honoring Maa Amba with traditional bells and live harmonium."
            },
            {
                title: "Paramparik 2-Taali & 3-Taali Garba",
                time: "09:30 PM - 11:30 PM",
                tag: "Classic Garba Flow",
                desc: "Graceful circular Garba featuring classic Gujarati folk compositions, subtle rhythmic variations, and authentic devotional poetry."
            },
            {
                title: "Dodhiyu & High-Paced Hinch Raas",
                time: "11:30 PM - 02:00 AM",
                tag: "High Energy Peak",
                desc: "Electrifying tempo shifts with live Dholak, dynamic step changes, and spirited community dancing under festive lights."
            },
            {
                title: "Sanedo & Uttar Aradhana",
                time: "02:00 AM - Late Night",
                tag: "Folk Finale",
                desc: "Traditional Gujarati Sanedo verses, celebratory folk melodies, and a joyful late-night musical culmination."
            }
        ],
        videos: [
            {
                id: "vid-1",
                title: "Live Garba Aradhana & 3-Taali Beats",
                artist: "Nishad Soni",
                duration: "04:15",
                thumbnail: "assets/images/artists/nishad-soni-main.jpg",
                description: "Experience the soulful vocal cadence and energetic 3-Taali rhythms led by Nishad Soni live at Mandavadi Ahmedabad."
            },
            {
                id: "vid-2",
                title: "Acoustic Dholak & Hinch Raas Finale",
                artist: "Nishad Soni & Live Ensemble",
                duration: "05:40",
                thumbnail: "assets/images/artists/nishad-soni-ensemble.jpg",
                description: "High-octane traditional dhol percussion synchronizing with thousands of Garba dancers in continuous rhythm."
            },
            {
                id: "vid-3",
                title: "Divine Maha Aarti at Suryast",
                artist: "Nishad Soni",
                duration: "03:50",
                thumbnail: "assets/images/artists/nishad-soni-performance.jpg",
                description: "Devotional reverence fills the night air as the sacred Aarti commences the Navratri celebrations."
            }
        ],
        seoTitle: "Nishad Soni | Lead Garba Artist & Singer at Mandavadi Ahmedabad",
        seoDescription: "Discover Nishad Soni, lead Garba singer and Gujarati folk vocalist performing live at Mandavadi Navratri in Ahmedabad. Experience authentic 10-night live music."
    }
];

// Related Blog Articles structured data for internal SEO content network
const relatedBlogArticles = [
    {
        title: "The Evolution of Garba Music in Gujarat",
        slug: "evolution-of-garba-music-gujarat",
        category: "Musical Heritage",
        date: "Navratri Special",
        readTime: "5 min read",
        image: "assets/images/blog1.jpg",
        alt: "Traditional Garba musicians playing folk instruments during Navratri in Ahmedabad",
        excerpt: "Trace how sacred Gujarati folk hymns and traditional dhol rhythms evolved into today's vibrant live festival celebrations in Ahmedabad."
    },
    {
        title: "Best Garba Artists to Experience in Ahmedabad",
        slug: "best-garba-artists-ahmedabad",
        category: "Artist Spotlight",
        date: "Festival Guide",
        readTime: "6 min read",
        image: "assets/images/blog2.jpg",
        alt: "Live Garba singer performing with musical ensemble at Navratri in Ahmedabad",
        excerpt: "An insider guide to the authentic vocalists and live instrumental mandalis that define the soulful Navratri experience across Ahmedabad."
    },
    {
        title: "Why Ahmedabad is Famous for Navratri",
        slug: "why-ahmedabad-famous-for-navratri",
        category: "Culture & City",
        date: "City Culture",
        readTime: "4 min read",
        image: "assets/images/blog3.jpg",
        alt: "Thousands of dancers in colorful Chaniya Choli and Kediyu playing Garba in Ahmedabad",
        excerpt: "Explore the unmatched spiritual devotion, cultural grandeur, and night-long community dancing that makes Ahmedabad the global Garba capital."
    },
    {
        title: "Traditional vs Contemporary Garba Music",
        slug: "traditional-vs-contemporary-garba-music",
        category: "Folk Insights",
        date: "Sound of Gujarat",
        readTime: "5 min read",
        image: "assets/images/assets_venue.png" in window ? "assets/images/assets_venue.png" : "assets/images/About.png",
        alt: "Traditional Gujarati acoustic instruments like Dhol, Manjira, and Shenai",
        excerpt: "Why the acoustic purity of live dhol and soulful vocal delivery creates a far deeper spiritual connection than pre-recorded electronic tracks."
    }
];
