import { ProductCategory, FeatureItem, ProcessStep } from "@/types";

export const productCategories: ProductCategory[] = [
  {
    id: "cotton-bags",
    name: "Cotton Bags",
    description:
      "Sustainable, natural-fiber bags that combine eco-conscious manufacturing with premium quality. From everyday tote bags to luxury canvas shoppers, our cotton range is perfect for brands that value both style and sustainability.",
    image: "/images/category-cotton.png",
    subcategories: [
      {
        id: "cotton-tote",
        name: "Cotton Tote Bags",
        description:
          "Lightweight and highly reusable cotton tote bags made from natural, breathable fabric. Ideal for grocery shopping, retail promotions, and corporate giveaways. Available in a wide range of weights and colors with full custom printing.",
        features: [
          "4oz–8oz natural cotton fabric",
          "Screen print & heat transfer options",
          "Long loop & short loop handles",
          "Natural, dyed & bleached finishes",
          "MOQ from 300 units",
        ],
        image: "/images/category-cotton.png",
      },
      {
        id: "canvas-shopping",
        name: "Canvas Shopping Bags",
        description:
          "Heavy-duty cotton canvas bags built for maximum lifespan and daily use. The thick, structured fabric provides excellent surface area for branding and the durability that premium retail and lifestyle brands demand.",
        features: [
          "10oz–16oz waxed & raw canvas",
          "Embroidery & screen print ready",
          "Reinforced base & double-stitched seams",
          "Inside zip pocket options available",
          "GOTS & OEKO-TEX certified fabrics",
        ],
        image: "/images/category-cotton.png",
      },
      {
        id: "drawstring-cotton",
        name: "Drawstring Cotton Pouches",
        description:
          "Versatile cotton drawstring bags and pouches suited for gifting, cosmetics, jewellery packaging, and promotional events. Soft, elegant, and fully customizable with logo printing or embroidery.",
        features: [
          "Muslin & cotton canvas options",
          "Drawstring & cinch-top closures",
          "Full-color logo printing & embroidery",
          "Custom sizes from 3\" × 4\" upward",
          "Natural, black & custom dye colors",
        ],
        image: "/images/category-cotton.png",
      },
    ],
  },
  {
    id: "plastic-bags",
    name: "Plastic Bags",
    description:
      "High-performance plastic bags manufactured for retail, e-commerce, and industrial applications. Engineered for strength and durability, our plastic bag range spans from lightweight boutique carriers to heavy-duty poly mailers and industrial liners.",
    image: "/images/category-plastic.png",
    subcategories: [
      {
        id: "t-shirt-grocery",
        name: "T-Shirt Grocery Bags",
        description:
          "The classic high-density polyethylene (HDPE) retail bag — lightweight, strong, and cost-effective. Available in a range of thicknesses from economy to premium with full-color flexographic printing on one or both sides.",
        features: [
          "HDPE & LDPE material options",
          "7–20 micron thickness range",
          "One & two-color flexo printing",
          "Flat & gusset bottom styles",
          "MOQ from 5,000 units",
        ],
        image: "/images/category-plastic.png",
      },
      {
        id: "poly-mailer-plastic",
        name: "Poly Mailer Bags",
        description:
          "Self-sealing co-extruded polyethylene mailer bags for e-commerce shipping and fulfillment. Lightweight, tamper-evident, and highly customizable with your brand artwork for a professional unboxing experience.",
        features: [
          "Tamper-evident permanent seal",
          "Tear & puncture resistant co-ex film",
          "Full-color custom printing",
          "Matte, gloss & kraft-look finishes",
          "Eco-friendly recycled PE variants",
        ],
        image: "/images/category-plastic.png",
      },
      {
        id: "die-cut-handle",
        name: "Die-Cut Handle Bags",
        description:
          "Sleek plastic shopping bags with reinforced punched-out or patch handles. Popular for boutique retail, fashion brands, and promotional events. Available in a range of film thicknesses and finishes including frosted, crystal clear, and colored.",
        features: [
          "Euro loop & die-cut handle styles",
          "Frosted, clear & solid color film",
          "50–150 micron thickness options",
          "High-definition surface printing",
          "Soft-touch matte laminate option",
        ],
        image: "/images/category-plastic.png",
      },
    ],
  },
  {
    id: "paper-bags",
    name: "Paper Bags",
    description:
      "Premium paper bags that blend sustainability with sophistication. From rustic kraft carriers to luxury laminated art paper bags, our paper range delivers an elevated unboxing experience that customers remember.",
    image: "/images/category-paper.png",
    subcategories: [
      {
        id: "kraft-paper",
        name: "Kraft Paper Bags",
        description:
          "Eco-friendly, recyclable kraft paper bags available in natural brown and bleached white. Feature twisted paper or flat tape handles and are suitable for food, retail, and gifting applications. Customizable with flexographic or digital printing.",
        features: [
          "90–150 GSM kraft paper",
          "Twisted & flat tape paper handles",
          "Food-grade inner coating available",
          "Recyclable & biodegradable certified",
          "MOQ from 500 units",
        ],
        image: "/images/category-paper.png",
      },
      {
        id: "laminated-art-paper",
        name: "Laminated Art Paper Bags",
        description:
          "High-end shopping bags constructed from art paper board with gloss or matte lamination, reinforced cardboard base, and luxury rope or ribbon handles. Ideal for fashion brands, cosmetics, and premium retail experiences.",
        features: [
          "157–250 GSM art paper board",
          "Gloss & matte lamination options",
          "Cotton rope & satin ribbon handles",
          "Reinforced cardboard base insert",
          "Spot UV, foil stamping & embossing",
        ],
        image: "/images/category-paper.png",
      },
      {
        id: "custom-gift-paper",
        name: "Custom Gift Bags",
        description:
          "Bespoke premium gift bags designed to leave a lasting impression. Crafted to your exact dimensions, these bags feature the finest finishing techniques including hot foil stamping, soft-touch lamination, embossing, and ribbon closures.",
        features: [
          "Fully custom dimensions & shapes",
          "Hot foil stamping & embossing",
          "Soft-touch & velvet laminate options",
          "Magnetic snap & ribbon tie closures",
          "Inner tissue paper & inserts available",
        ],
        image: "/images/category-paper.png",
      },
    ],
  },
];

export const features: FeatureItem[] = [
  {
    icon: "shield",
    title: "Quality Assurance",
    description:
      "Every batch undergoes rigorous multi-stage quality inspection. ISO-certified processes ensure consistent standards from raw materials to final delivery.",
  },
  {
    icon: "palette",
    title: "Custom Branding",
    description:
      "Full-service design and printing capabilities including screen print, offset, sublimation, embroidery, and foil stamping to bring your brand to life.",
  },
  {
    icon: "trending-up",
    title: "Scalable Production",
    description:
      "From 500-unit pilot runs to 500,000+ bulk orders, our manufacturing lines flex to meet your volume requirements without compromising quality.",
  },
  {
    icon: "globe",
    title: "Global Shipping",
    description:
      "Established logistics partnerships deliver to 40+ countries. Full export documentation, container loading supervision, and door-to-door tracking included.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Inquiry",
    description:
      "Share your requirements — material, size, quantity, and branding needs. Our team responds within 24 hours.",
  },
  {
    step: 2,
    title: "Design",
    description:
      "We create detailed specifications and visual mockups. Revisions are unlimited until you approve the final design.",
  },
  {
    step: 3,
    title: "Production",
    description:
      "Manufacturing begins with quality checkpoints at every stage. You receive progress updates throughout the production cycle.",
  },
  {
    step: 4,
    title: "Delivery",
    description:
      "Professionally packed and shipped to your door. Full tracking, customs documentation, and delivery confirmation provided.",
  },
];

export const categoryOptions = [
  { value: "", label: "Select a product category" },
  { value: "cotton-tote", label: "Cotton Tote Bags" },
  { value: "canvas-shopping", label: "Canvas Shopping Bags" },
  { value: "drawstring-cotton", label: "Drawstring Cotton Pouches" },
  { value: "t-shirt-grocery", label: "T-Shirt Grocery Bags" },
  { value: "poly-mailer-plastic", label: "Poly Mailer Bags" },
  { value: "die-cut-handle", label: "Die-Cut Handle Bags" },
  { value: "kraft-paper", label: "Kraft Paper Bags" },
  { value: "laminated-art-paper", label: "Laminated Art Paper Bags" },
  { value: "custom-gift-paper", label: "Custom Gift Bags" },
];
