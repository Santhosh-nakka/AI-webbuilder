export const presetTemplates = [
  {
    id: "brutalist-studio",
    name: "Brutalist Studio",
    description: "Stark, high-contrast black and white layout with massive typography.",
    config: {
      themeType: "brutalist",
      backgroundType: "none",
      fontFamily: "'Inter', sans-serif",
      customTitle: "WE BUILD",
      customSubtitle: "THE FUTURE OF DIGITAL EXPERIENCES.",
      customBackgroundColor: "#000000",
      customTextColor: "#ffffff",
      sections: [
        { type: "editorial", props: { headline: "VISUAL POETRY", text: "We strip away the unnecessary to reveal the raw, unpolished truth of digital interaction.", imageKeyword: "architecture", reverse: false } },
        { type: "magazine", props: { items: [{ category: "Strategy", title: "RADICAL THINKING", description: "No compromises." }, { category: "Execution", title: "PERFECT ALIGNMENT", description: "Pixel perfect delivery." }] } },
        { type: "cta", props: { title: "READY TO DISRUPT?", subtitle: "Let's build something unforgettable.", buttonText: "START NOW" } }
      ]
    }
  },
  {
    id: "minimalist-fashion",
    name: "Minimalist Fashion",
    description: "Pure white, high-fashion editorial look with stark black typography.",
    config: {
      themeType: "light",
      backgroundType: "none",
      fontFamily: "'Playfair Display', serif",
      customTitle: "HAUTE MINIMAL",
      customSubtitle: "The Spring/Summer Collection",
      customBackgroundColor: "#ffffff",
      customTextColor: "#000000",
      sections: [
        { type: "editorial", props: { headline: "THE NEW SILHOUETTE", text: "Embracing negative space and bold lines in modern apparel.", imageKeyword: "fashion", reverse: false } },
        { type: "magazine", props: { items: [{ category: "Look 1", title: "ESSENTIALS", description: "The core wardrobe." }, { category: "Look 2", title: "AVANT-GARDE", description: "Pushing boundaries." }] } },
        { type: "cta", props: { title: "SHOP THE LOOK", subtitle: "Available worldwide.", buttonText: "VIEW CATALOG" } }
      ]
    }
  },
  {
    id: "neon-cyberpunk",
    name: "Neon Cyberpunk",
    description: "Pitch black background with striking neon green terminal text.",
    config: {
      themeType: "dark",
      backgroundType: "none",
      fontFamily: "'Space Mono', monospace",
      customTitle: "SYSTEM_ROOT",
      customSubtitle: "Awaiting terminal command...",
      customBackgroundColor: "#050505",
      customTextColor: "#39ff14",
      sections: [
        { type: "stats", props: { title: "NETWORK_STATUS", stats: [{ label: "NODES", value: "99.9%" }, { label: "UPTIME", value: "9,999H" }, { label: "BREACHES", value: "0" }] } },
        { type: "editorial", props: { headline: "DECENTRALIZED", text: "Securing the grid through distributed ledger protocols.", imageKeyword: "neon cyberpunk", reverse: true } },
        { type: "pricing", props: { title: "ACCESS_TIERS", plans: [{ name: "GUEST", price: "0 CREDITS", features: ["Read-only access"], highlight: false }, { name: "ADMIN", price: "99 CREDITS", features: ["Root access", "Deploy contracts"], highlight: true }] } }
      ]
    }
  },
  {
    id: "earthy-ceramics",
    name: "Earthy Ceramics",
    description: "Warm terracotta flat background with soft cream text.",
    config: {
      themeType: "warm",
      backgroundType: "none",
      fontFamily: "'Playfair Display', serif",
      customTitle: "KILN & CLAY",
      customSubtitle: "Handcrafted ceramics for the modern home.",
      customBackgroundColor: "#a0522d",
      customTextColor: "#fff8f0",
      sections: [
        { type: "about", props: { title: "Our Process", description: "Every piece is wheel-thrown, hand-glazed, and fired in our small studio." } },
        { type: "editorial", props: { headline: "RAW BEAUTY", text: "Embracing the natural imperfections of earth and fire.", imageKeyword: "ceramics pottery", reverse: false } },
        { type: "cta", props: { title: "Shop the Collection", subtitle: "Limited batches available weekly.", buttonText: "Browse Store" } }
      ]
    }
  },
  {
    id: "midnight-saas",
    name: "Midnight SaaS",
    description: "Deep flat navy blue with high-contrast UI for tech startups.",
    config: {
      themeType: "dark",
      backgroundType: "none",
      fontFamily: "'Inter', sans-serif",
      customTitle: "Scale Faster.",
      customSubtitle: "The ultimate developer tool for shipping products securely.",
      customBackgroundColor: "#0f172a",
      customTextColor: "#f8fafc",
      sections: [
        { type: "services", props: { title: "Features", services: [{ name: "Auto-Deploy", description: "Push to main and let us handle the rest." }, { name: "Edge Caching", description: "Global CDN out of the box." }, { name: "Security", description: "Automated vulnerability scanning." }] } },
        { type: "stats", props: { title: "By the numbers", stats: [{ label: "Deployments", value: "10M+" }, { label: "Latency", value: "<15ms" }] } },
        { type: "pricing", props: { title: "Simple Transparent Pricing", plans: [{ name: "Starter", price: "$19/mo", features: ["Up to 5 seats", "Standard analytics"], highlight: false }, { name: "Pro", price: "$49/mo", features: ["Unlimited seats", "24/7 dedicated support", "Custom domains"], highlight: true }] } },
        { type: "cta", props: { title: "Ready to deploy?", subtitle: "Start your free 14-day trial.", buttonText: "Get API Key" } }
      ]
    }
  },
  {
    id: "vibrant-portfolio",
    name: "Vibrant Portfolio",
    description: "Bright yellow graphic design portfolio with bold black text.",
    config: {
      themeType: "vibrant",
      backgroundType: "none",
      fontFamily: "'Space Mono', monospace",
      customTitle: "GRAPHIC DESIGN PORTFOLIO",
      customSubtitle: "SELECTED WORKS 202X - PRESENT",
      customBackgroundColor: "#ffcc00",
      customTextColor: "#000000",
      sections: [
        { type: "editorial", props: { headline: "THE ART OF SELECTION", text: "Curating colors, shapes, and typography into a cohesive visual language.", imageKeyword: "modern art abstract", reverse: false } },
        { type: "magazine", props: { items: [{ category: "Chapter 1", title: "PRODUCT RENDER", description: "3D visualizations." }, { category: "Chapter 2", title: "BRAND IDENTITY", description: "Logos and systems." }] } },
        { type: "cta", props: { title: "HIRE ME", subtitle: "Available for freelance projects globally.", buttonText: "GET IN TOUCH" } }
      ]
    }
  },
  {
    id: "coffee-roaster",
    name: "Coffee Roaster",
    description: "Flat mocha background with soft beige typography.",
    config: {
      themeType: "warm",
      backgroundType: "none",
      fontFamily: "'Poppins', sans-serif",
      customTitle: "Morning Brew Roasters",
      customSubtitle: "Ethically sourced, locally roasted.",
      customBackgroundColor: "#4a3022",
      customTextColor: "#f5e6d3",
      sections: [
        { type: "editorial", props: { headline: "SINGLE ORIGIN", text: "We partner directly with farmers in Colombia and Ethiopia to bring you the best beans.", imageKeyword: "coffee beans roast", reverse: true } },
        { type: "pricing", props: { title: "Subscriptions", plans: [{ name: "Half Bag", price: "$12", features: ["12oz bag bi-weekly", "Free shipping"], highlight: false }, { name: "Full Bag", price: "$20", features: ["24oz bag bi-weekly", "Free shipping", "Surprise samples"], highlight: true }] } },
        { type: "cta", props: { title: "Get your caffeine fix.", subtitle: "Order before 2PM for same-day roasting.", buttonText: "Shop Beans" } }
      ]
    }
  },
  {
    id: "organic-skincare",
    name: "Organic Skincare",
    description: "Flat sage green background promoting wellness and nature.",
    config: {
      themeType: "light",
      backgroundType: "none",
      fontFamily: "'Outfit', sans-serif",
      customTitle: "Pure Botanicals",
      customSubtitle: "Skincare rooted in nature, backed by science.",
      customBackgroundColor: "#849b87",
      customTextColor: "#fcfcfc",
      sections: [
        { type: "services", props: { title: "Our Ingredients", services: [{ name: "Aloe Vera", description: "Soothing and hydrating." }, { name: "Rosehip Oil", description: "Rich in antioxidants." }, { name: "Green Tea", description: "Calms inflammation." }] } },
        { type: "editorial", props: { headline: "CLEAN BEAUTY", text: "No parabens, no sulfates, just pure plant extracts.", imageKeyword: "skincare bottles botanicals", reverse: false } },
        { type: "cta", props: { title: "Discover your glow.", subtitle: "Take our skin quiz to find your routine.", buttonText: "Start Quiz" } }
      ]
    }
  },
  {
    id: "retro-arcade",
    name: "Retro Arcade",
    description: "Flat deep purple with hot pink typography.",
    config: {
      themeType: "purple",
      backgroundType: "none",
      fontFamily: "'Space Mono', monospace",
      customTitle: "ARCADE 198X",
      customSubtitle: "Insert Coin to Continue",
      customBackgroundColor: "#4c1d95",
      customTextColor: "#f472b6",
      sections: [
        { type: "services", props: { title: "GAMES", services: [{ name: "Pinball", description: "Over 50 classic tables." }, { name: "Fighters", description: "Street Fighter, Mortal Kombat, and more." }] } },
        { type: "pricing", props: { title: "TOKENS", plans: [{ name: "Casual", price: "$10", features: ["40 Tokens"], highlight: false }, { name: "High Score", price: "$25", features: ["120 Tokens", "Free Drink"], highlight: true }] } },
        { type: "cta", props: { title: "READY PLAYER ONE?", subtitle: "Open until 2AM every night.", buttonText: "Get Directions" } }
      ]
    }
  },
  {
    id: "luxury-real-estate",
    name: "Luxury Real Estate",
    description: "Flat jet black background with elegant gold text.",
    config: {
      themeType: "dark",
      backgroundType: "none",
      fontFamily: "'Playfair Display', serif",
      customTitle: "AURELIA ESTATES",
      customSubtitle: "Curating the world's most exclusive properties.",
      customBackgroundColor: "#171717",
      customTextColor: "#fbbf24",
      sections: [
        { type: "editorial", props: { headline: "THE HEIGHT OF LUXURY", text: "From penthouse suites to coastal villas, find your dream home.", imageKeyword: "luxury modern mansion", reverse: false } },
        { type: "testimonials", props: { title: "Client Testimonials", testimonials: [{ quote: "They found us our perfect summer home in absolute record time.", author: "A. Vanderbilt" }] } },
        { type: "cta", props: { title: "View our portfolio.", subtitle: "Strictly by appointment only.", buttonText: "Inquire Now" } }
      ]
    }
  }
];
