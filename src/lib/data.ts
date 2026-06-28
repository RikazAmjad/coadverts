import {
  ProductCategory,
  FeatureItem,
  ProcessStep,
  ServiceBlock,
  CertificationBlock,
  ReferenceBlock,
} from "@/types";

export const corporateInfo = {
  sweden: {
    companyName: "CoAdvert AB",
    regNumber: "556892-9052",
    address: "Kivra: 556892-9052, 106 31 Stockholm SE, Sweden",
    visitAddress: "Stockholm, Sweden",
    email: "customerservice@coadvert.com",
    phone: "+46 76 042 87 17",
    role: "Head Office, Design & Scandinavian Logistics Hub",
    website: "www.coadvert.com",
  },
  pakistan: {
    companyName: "MH Tex",
    regNumber: "023491-3",
    address: "Plot no 16 al mumtaz street, Choudry.Town behind j tex, 38000 Faisalabad, Pakistan",
    email: "info@mhtextilw.com.pk, mumtaz_kb@yahoo.com",
    phone: "+92-41-2690655, +92-321-6674655",
    role: "Manufacturing Base, Weaving & Stitching Facility",
    website: "www.mhtextile.com.pk",
  },
};

export const productCategories: ProductCategory[] = [
  {
    id: "bags",
    name: "Bags",
    description:
      "Cotton, organic, recycled, non-woven, PP woven, and rug bags. Customised designs, multiple weights and printing options.",
    longDescription:
      "CoAdvert AB Sweden and MH Tex, Pakistan is the legacy of a family associated with cotton and cotton products for the last 47 years. Cotton being biodegradable, natural and breathable fabric has been used by humans for thousands of years. Cotton Bags provide long-time durability and most impressions than any other give-away product.",
    image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812310/18_rpungm.jpg",
    heroImage: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812310/18_rpungm.jpg",
    certifications: ["gots", "gots-cu", "fairtrade", "oeko-tex", "recycled", "ethically-made"],
    subcategories: [
      {
        id: "cotton-bags",
        name: "Cotton Bags",
        description: "Natural, breathable cotton bags in a wide variety of weights and designs.",
        detailedCopy:
          "Cotton being biodegradable, natural and breathable fabric has been used by humans for thousands of years. Cotton Bags provide long-time durability and most impressions than any other give-away product. Available in different weights, sizes and designs. Customized designs are our speciality.",
        features: [
          "Weight of fabric from 100 to 450 GSM (standard 150 GSM)",
          "Laminated options for water-resistance",
          "Silk Screen, Heat Transfer and Offset printing",
          "Webbing Cotton, Rope Handles and more",
          "Handle length adjusted to your needs",
        ],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812904/TBC_Mixed_leaves_ih6pe4.jpg",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812225/Reused_Remade_CBF_Grass_brokqv.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812223/P%C3%A5sar0005_sjoqed.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812223/P%C3%A5sar0032_egkccz.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812170/CBF_grass_cgoi2z.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812416/46382831_1002646186584734_6042450726939000832_n_bmebjj.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812619/Skiss_totebag_2016_iajxsw.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987948/Red_Sports_Bag_a3gawr.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987950/Wooden_Handels2_s966du.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987998/US_z6gwfg.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988038/Sk%C3%A4rmavbild_2017-12-03_kl._19.35.42_bhugqr.png",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812486/Foto_2015-06-10_11_14_26_oxe4vk.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812388/42281411_472883393225847_2752094182897090560_n_gjucxm.jpg"
        ],
        certificationNote: "Available in GOTS certified organic cotton.",
      },
      {
        id: "organic-fairtrade-bags",
        name: "Organic & Fairtrade Cotton Bags",
        description: "GOTS certified organic cotton bags — grown without pesticides, seeds not genetically modified.",
        detailedCopy:
          "Ever increasing need of environment friendly bags has become a new mantra to challenge conventional usage of plastic and paper bags. Third-party certification organizations verify the complete organic cotton cycle. GOTS ensures ecological, environmental, and social standards.",
        features: [
          "120, 140, 250 and 350 GSM in stock",
          "GOTS (Global Organic Textile Standard) certified",
          "No pesticides or insecticides",
          "Non-GMO seeds",
          "Other qualities developed on request",
        ],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813225/organic_02_xkmgu2.jpg",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813226/organic_03_bmv4ep.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813224/organic_01_kl34dl.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813228/organic_05_mq6tik.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813233/organic_04_ilbthy.jpg",
        ],
        certificationNote: "GOTS & Fairtrade certified.",
      },
      {
        id: "recycled-cotton-bags",
        name: "Recycled Cotton Bags",
        description: "Regenerated yarn from textile waste, mixed with recycled PET polyester for strength.",
        detailedCopy:
          "Textile and fashion industries around the globe have huge environmental footprints. To reduce textile waste, we regenerate these wastes and make bags with them. Yarn is regenerated from old and used cloths, mixed with recycled PET bottle polyester to give it extra strength.",
        features: [
          "75% Recycled Cotton, 25% Recycled Polyester",
          "Available in 150, 250 and 360 GSM",
          "Webbing Cotton handles (360 GSM)",
          "Fully circular production model",
          "Reduces textile industry waste",
        ],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813255/Recycled_06_z4ltvp.jpg",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813242/Recycled_04_ugwnb7.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813244/Recycled_01_ewf1gp.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813255/Recycled_07_yb7ld5.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813243/Recycled_02_o4jgju.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813245/Recycled_03_nd2esw.jpg",
        ],
        certificationNote: "Recycled content verified.",
      },
      {
        id: "nonwoven-pp-bags",
        name: "Non-Woven & PP Woven Bags",
        description: "PP spun-bound non-woven and polypropylene woven bags — strong, lightweight and reusable.",
        detailedCopy:
          "PP Spun bound Non-Woven fabric is environment friendly, strong, reusable, lightweight, non-toxic and water-resistant. In our range of woven fabrics, we focus on woven Polypropylene (PP) bags — strong and water resistant.",
        features: [
          "Non-woven: 55 GSM to 140 GSM, large colour selection",
          "With and without OPP Film or Foil lamination",
          "PP Woven: 110 GSM to 180 GSM, Matt or Gloss",
          "Rotogravure & Silk Screen printing options",
          "Cord and flat handles in hand/shoulder length",
        ],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813293/P%C3%A5sar0005_i4ukgn.jpg",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813291/P%C3%A5sar0032_myqmgx.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813279/T-gusset_non_woven_bag_1_rldws4.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813282/P1_jbmagw.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813278/ultrasonik_iigzzd.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813267/The_first_bag_of_RE-BA_bags_2_g5atyu.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813261/The_first_bag_of_ICA_bags_3_fst2vq.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813266/The_first_bag_of_ICA_bags_5_hxkrej.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813275/Non-woven_T-shirt_Bags_1_zuckmr.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813280/The_sample_of_ICA_bags_3_zhozow.jpg",
        ],
        certificationNote: "Environment-friendly and reusable.",
      },
      {
        id: "rug-carpet-bags",
        name: "Rug & Carpet Tote Bags",
        description: "Hand-woven customized rug bags and simple woven rugs for retailers.",
        detailedCopy:
          "Hand-woven customized rugs and bags made with rugs. Simple woven rugs can be provided to retailers on affordable prices.",
        features: [
          "Hand-woven with recycled cotton",
          "Customized patterns on larger quantities",
          "Cord handles",
          "MOQ: 500 pcs",
          "Unique artisan aesthetic",
        ],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905365/46373423_342214903001831_1560310955202576384_n_oxnd9n.jpg",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905367/46118509_199536640935995_5865761377313882112_n_kthzw4.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905371/46438320_223803594997999_8410083356171042816_n_fm5et5.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905374/_39R7936_vfatwq.jpg",
        ],
        certificationNote: "Handcrafted using recycled materials.",
      },
    ],
  },
  {
    id: "gloves",
    name: "Gloves",
    description:
      "Wide variety including Nitrile, Vinyl, Cotton, Interlock, Jersey, PVC Dotted, Terry and Sailing Gloves.",
    longDescription:
      "A wide variety to choose from — including Nitrile Gloves, Vinyl Gloves, Cotton Gloves, Interlock, Jersey Gloves, Working Gloves, PVC Dotted Gloves and Terry Gloves. Best-selling promotional and safety items suitable for the European market.",
    image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988988/Sailing_gloves_cfwmvp.jpg",
    heroImage: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988988/Sailing_gloves_cfwmvp.jpg",
    certifications: [],
    subcategories: [
      {
        id: "interlock-jersey-gloves",
        name: "Interlock & Jersey Gloves",
        description: "Lightweight natural cotton gloves for general purpose, household cleaning, and painting.",
        detailedCopy:
          "Light Weight Natural cotton gloves are general purpose gloves. Medium weight Jersey Gloves are ideal light-duty gloves for household cleaning, general maintenance and painting. Knit wrist keeps out dirt and debris.",
        features: [
          "100% natural cotton",
          "Available in different designs and colours",
          "Knit wrist for debris protection",
          "Light to medium weight",
          "General purpose utility",
        ],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988989/Jersey_Gloves_1_zry6gz.jpg",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988990/interlock_2_b1xtrd.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988991/interlock_f97hzg.jpg",
        ],
        certificationNote: "Standard cotton safety compliance.",
      },
      {
        id: "pvc-dotted-gloves",
        name: "PVC Dotted Gloves",
        description: "Canvas cotton PVC coated dot gloves for working, cleaning, and loading/unloading.",
        detailedCopy:
          "Large selection and sizes of Canvas Cotton PVC Coated Dot Gloves. Available in different designs and colours. Can be used as working gloves as well as for daily cleaning and loading, unloading jobs.",
        features: [
          "PVC dots for superior grip",
          "Canvas cotton base",
          "Available in multiple sizes",
          "Heavy-duty working applications",
          "Loading and unloading tasks",
        ],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988987/PVC_Dotted_1_a956bi.jpg",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988988/PVC_dotted_2_dvugcy.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988989/PVC_dotted_3_sjggcc.jpg",
        ],
        certificationNote: "Work safety compliant.",
      },
      {
        id: "terry-mittens-gloves",
        name: "Terry Gloves & Mittens",
        description: "Heavy-weight terry cloth gloves and kitchen mittens — promotional and functional.",
        detailedCopy:
          "Heavy weight Terry cloth working gloves, also used as bathroom accessory. Mitten is a type of protective clothing used to cover the hand. A kitchen is incomplete without mittens — a handful choice for promotional activities.",
        features: [
          "Heavy weight terry cloth",
          "Bathroom accessory use",
          "Kitchen mitten variants",
          "Available in different sizes and colours",
          "Ideal for promotional giveaways",
        ],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988989/mittens_gqsagk.png",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988990/Terry_Gloves_hl00xi.jpg",
        ],
        certificationNote: "Safe for household use.",
      },
      {
        id: "sailing-gloves",
        name: "Sailing Gloves",
        description: "Warm, strong, waterproof sailing gloves with easy grip — best-selling for European market.",
        detailedCopy:
          "Wide range of warm, strong, waterproof sailing gloves with easy grip. Best-selling promotional item suitable for the European market.",
        features: [
          "Warm and waterproof construction",
          "Easy grip design",
          "European market favourite",
          "Best-selling promotional item",
          "Wide size range",
        ],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988988/Sailing_gloves_cfwmvp.jpg",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988988/Sailing_gloves_cfwmvp.jpg"
        ],
        certificationNote: "Marine-grade waterproof materials.",
      },
    ],
  },
  {
    id: "towels-bathrobes",
    name: "Towels & Bathrobes",
    description:
      "All kinds of terry products from 100% Cotton, Organic Cotton, Blended Ring Spun & Open End Yarns.",
    longDescription:
      "All kinds of Terry Products from 100% Cotton, Organic Cotton, Blended Ring Spun & Open End Yarns. Terry Towels (400 to 800 gsm), Bath Mats (600 to 1000 gsm), and Bath Robes (400 to 450 gsm) — available White, Dyed & Pigment Printed.",
    image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987216/Towel_3_ayxk17.png",
    heroImage: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987216/Towel_3_ayxk17.png",
    certifications: ["gots", "gots-cu", "oeko-tex"],
    subcategories: [
      {
        id: "terry-towels",
        name: "Terry Towels",
        description: "400 to 800 GSM in White, Dyed & Pigment Printed from 100% Cotton or Organic Cotton.",
        detailedCopy:
          "Premium terry towels from 100% Cotton, Organic Cotton, Blended Ring Spun & Open End Yarns. White, Dyed & Pigment Printed available.",
        features: [
          "400 to 800 GSM weight range",
          "100% Cotton, Organic Cotton or blended",
          "White, Dyed & Pigment Printed",
          "Ring Spun & Open End Yarns",
          "Bulk hotel and spa supply",
        ],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987216/towels_mkahqx.png",
        certificationNote: "GOTS certified organic cotton variant available.",
      },
      {
        id: "bath-mats",
        name: "Bath Mats",
        description: "600 to 1000 GSM bath mats, dyed & pigment printed for hotels and home.",
        detailedCopy:
          "Heavy-duty bath mats in 600 to 1000 GSM — dyed and pigment printed, suitable for hotels, spas, and institutional buyers.",
        features: [
          "600 to 1000 GSM — extra thick",
          "Dyed & Pigment Printed options",
          "Non-slip backing available",
          "Hotel and institutional supply",
          "Custom sizes available",
        ],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987216/towels_3_qhzxl4.jpg",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987219/Towel_ei79hu.jpg",
        ],
        certificationNote: "Safe non-toxic dye compliance.",
      },
    ],
  },
  {
    id: "tshirts-beanies",
    name: "T-shirts",
    description:
      "Promotional T-shirts in Cotton, Organic Cotton and Cotton-Polyester. High quality 160–210 GSM.",
    longDescription:
      "Get the best deals on promotional T-shirts custom imprinted with your advertisement. We provide all kind of t-shirts in Cotton, Organic Cotton and Cotton-Polyester mix fabric. High quality T-shirts are produced from 160 gsm to 210 gsm and available in all different designs, sizes and colours.",
    image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905104/Branca_huklwz.jpg",
    heroImage: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905104/Branca_huklwz.jpg",
    certifications: ["gots", "gots-cu", "oeko-tex"],
    subcategories: [
      {
        id: "cotton-tshirts",
        name: "Cotton T-Shirts",
        description: "160–210 GSM promotional and branded t-shirts in pure cotton, organic or polyester blend.",
        detailedCopy:
          "Get the best deals on promotional T-shirts custom imprinted with your advertisement. Available in all different designs, sizes and colours.",
        features: [
          "160 GSM to 210 GSM high quality",
          "Pure cotton, organic cotton or Cotton-Polyester mix",
          "Available in all designs, sizes and colours",
          "Logo imprinted and/or embroidered",
          "Polo style shirts in Pique fabric also available",
        ],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905104/Branca_huklwz.jpg",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905109/JackAndCoke_logo_tshirt-skiss_dga62d.png",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905105/t-shirt_qrjysp.png",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905104/Shirt_m1lw7h.png",
        ],
        certificationNote: "Organic variant is GOTS certified.",
      },
    ],
  },
  {
    id: "bandanas",
    name: "Bandanas",
    description:
      "Silk or cotton fabric bandanas dyed with various colours — head, hand, or promotional use.",
    longDescription:
      "A bandana is a silk or cotton fabric that looks like a handkerchief, often dyed with various colours. Mostly worn on the head, around the hand, or carried for symbolic representation of an individual or group.",
    image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905177/46453102_742532862775986_4458650608479502336_n_jfec9b.jpg",
    heroImage: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905177/46453102_742532862775986_4458650608479502336_n_jfec9b.jpg",
    certifications: ["oeko-tex"],
    subcategories: [
      {
        id: "classic-bandanas",
        name: "Classic Printed Bandanas",
        description: "Traditional square bandanas in cotton or silk, dyed in various colours and patterns.",
        detailedCopy:
          "Bandana is a silk or cotton fabric, that looks like a handkerchief, and often dyed with various colours. Mostly worn on the head or around the hand. Fully customisable with your brand artwork.",
        features: [
          "Cotton or silk fabric",
          "Fully custom colours and patterns",
          "Screen print and discharge options",
          "Standard 22\" x 22\" or custom sizes",
          "MOQ: 1,000 units",
        ],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905177/46453102_742532862775986_4458650608479502336_n_jfec9b.jpg",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905177/46348340_171033080518776_7433671620016734208_n_muzbbk.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905177/image005_upikkr.png",
        ],
        certificationNote: "OEKO-TEX skin-safe dyes.",
      },
    ],
  },
  {
    id: "caps",
    name: "Caps & Headwear",
    description: "Premium cotton and blended caps for promotional and retail purposes.",
    longDescription: "High-quality caps and headwear available in various styles including baseball caps, snapbacks, and dad hats. Fully customizable with embroidery and printing.",
    image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905047/20141006_131930_oansp2.jpg",
    heroImage: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905047/20141006_131930_oansp2.jpg",
    certifications: ["sgs"],
    subcategories: [
      {
        id: "baseball-caps",
        name: "Baseball Caps",
        description: "Classic 6-panel baseball caps in premium cotton.",
        features: ["100% Cotton Twill", "Adjustable strap", "Custom embroidery"],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905036/45993898_189564455283064_1450101913998589952_n_q1krvn.jpg",
      },
      {
        id: "winter-caps",
        name: "Winter Caps",
        description: "Premium winter caps for all age groups in premium stuff.",
        features: ["Premium Cotton", "Premium Stuff", "Embroidery"],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905047/20141006_131930_oansp2.jpg",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905041/20141022_142043_ppwa5c.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905038/SAM_2183_rvgpoz.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905037/Caps_kjrzfu.jpg"
        ],
      },
    ]
  },
  {
    id: "bedsheet-linen",
    name: "Bedsheet Linen",
    description: "Luxurious cotton bedsheets and linens for hotels and retail.",
    longDescription: "Our premium bedsheet linens are crafted from the finest cotton, offering exceptional comfort and durability. Available in various thread counts and sizes.",
    image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905329/bedsheet2_zg8t6x.png",
    heroImage: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905329/bedsheet2_zg8t6x.png",
    certifications: ["oeko-tex"],
    subcategories: [
      {
        id: "cotton-bedsheets",
        name: "Cotton Bedsheets",
        description: "High thread count pure cotton bedsheets.",
        features: ["100% Pure Cotton", "Available in all standard sizes", "Wrinkle resistant"],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905330/Bedsheet1_mdmrxx.png",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905330/Bedsheet1_mdmrxx.png",
        ],
      }
    ]
  },
  {
    id: "rugs-carpets",
    name: "Rugs and Carpets",
    description: "Hand-woven and machine-made rugs and carpets for home and retail.",
    longDescription: "Discover our diverse collection of rugs and carpets, ranging from traditional hand-woven designs to modern machine-made patterns.",
    image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905364/46377555_2128526277398073_6092852838172459008_n_1_wgn6yc.jpg",
    heroImage: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905364/46377555_2128526277398073_6092852838172459008_n_1_wgn6yc.jpg",
    certifications: ["ethically-made"],
    subcategories: [
      {
        id: "handwoven-rugs",
        name: "Handwoven Rugs",
        description: "Artisanal handwoven rugs made with recycled materials.",
        features: ["Handcrafted", "Custom dimensions", "Eco-friendly materials"],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905368/IMG_20140326_140749_c48kip.jpg",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905369/IMG_20140326_140911_hjop4t.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905367/IMG_20140326_140056_lmhmqj.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905366/IMG_20140326_140404_nywpdn.jpg"
        ],
      },
      {
        id: "machine-made-rugs",
        name: "Machine-Made Rugs",
        description: "Durable and affordable machine-made rugs for everyday use.",
        features: ["Machine-made", "Custom dimensions", "Eco-friendly materials"],
        image: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905376/Mandal_us5fja.jpg",
        gallery: [
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905365/Stetind_Blue_jhia7x.jpg",
          "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905364/46377555_2128526277398073_6092852838172459008_n_1_wgn6yc.jpg",
        ],
      }
    ]
  }
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
      "Established logistics partnerships deliver globally. Full export documentation, customs clearance, and door-to-door tracking included.",
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
      "Manufacturing begins with quality checkpoints at every stage. You receive progress updates throughout.",
  },
  {
    step: 4,
    title: "Delivery",
    description:
      "Professionally packed and shipped to your door. Full tracking, customs documentation, and delivery confirmation provided.",
  },
];

export const services: ServiceBlock[] = [
  {
    id: "supplier-network",
    title: "Supplier Network Sourcing",
    description:
      "Wide array of duly selected reliable suppliers and manufacturers across cotton, yarns, and safety materials.",
    details: [
      "Network of audited cotton growers in Pakistan",
      "Strict raw-material chemical screening",
      "Priority sourcing for specialized polymers and dyes",
      "Direct factory relationships — no middlemen",
    ],
    icon: "network",
  },
  {
    id: "price-negotiation",
    title: "Price Negotiation & Purchase Orders",
    description:
      "We handle full price negotiation and purchase order processes, eliminating middlemen and broker markups.",
    details: [
      "Direct mill pricing with no intermediary fees",
      "Volume-based sliding scales",
      "Transparent material cost breakdowns",
      "Fixed pricing contracts for long-term runs",
    ],
    icon: "negotiation",
  },
  {
    id: "design-development",
    title: "Design Development & Product Categorisation",
    description:
      "Our design teams refine sizing, fabric specifications, tech packs, and print-ready artwork.",
    details: [
      "Product categorisation and range development",
      "Detailed tech packs and vector templates",
      "Physical sampling and prototype proofs",
      "Digital mockups for team approvals",
    ],
    icon: "design",
  },
  {
    id: "ethical-compliance",
    title: "Social & Environmental Compliance",
    description:
      "We ensure implementation of social and environmental codes and principles throughout the supply chain.",
    details: [
      "Zero tolerance for child and forced labour",
      "Fair living wages and legal working hours",
      "Environmental wastewater treatment monitoring",
      "GOTS, Fairtrade and SEDEX audit support",
    ],
    icon: "compliance",
  },
  {
    id: "inspection",
    title: "Production Inspection & Review",
    description:
      "Review and inspection of goods during the complete production cycle at every stage.",
    details: [
      "Inline inspections at raw material, cut, and sew stages",
      "Pre-shipment final AQL inspection",
      "Formal inspection reports sent before loading",
      "Tensile strength and colorfastness lab validation",
    ],
    icon: "inspection",
  },
  {
    id: "shipping-customs",
    title: "Shipping & Customs Clearance",
    description:
      "Shipping and customs clearances handled through reliable transport agents — door to door.",
    details: [
      "Sea freight (FCL/LCL) and air express cargo",
      "Bills of Lading and Certificates of Origin",
      "DDP shipping to eliminate EU customs fees",
      "Full tracking until final warehouse arrival",
    ],
    icon: "shipping",
  },
];

export const certifications: CertificationBlock[] = [
  {
    id: "gots",
    name: "Global Organic Textile Standard",
    shortName: "GOTS",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892977/gots_rgb_ndxdl1.jpg",
    description:
      "World's leading processing standard for textiles made from organic fibres. Defines high-level environmental criteria along the entire organic textiles supply chain and requires compliance with social criteria as well.",
    validityScope: "Applied to Organic Cotton Bags, T-Shirts, and Terry Towels.",
  },
  {
    id: "gots-cu",
    name: "Control Union (GOTS)",
    shortName: "GOTS CU",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892977/GOTS_CU_mvmzio.jpg",
    description:
      "Control Union Certifications is an independent, internationally operating certification body that carries out inspections and issues certificates for sustainable practices including GOTS.",
    validityScope: "Verification for our organic product line processing and manufacturing.",
  },
  {
    id: "oeko-tex",
    name: "OEKO-TEX® Standard 100",
    shortName: "OEKO-TEX",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892977/OEKO_yemxfn.png",
    description:
      "One of the world's best-known labels for textiles tested for harmful substances. Every thread, button, and accessory is verified as non-toxic and skin-safe.",
    validityScope: "Ensures all dyes, threads, and base fabrics are 100% skin-safe and hazard-free.",
  },
  {
    id: "fairtrade",
    name: "Fairtrade Certification",
    shortName: "Fairtrade",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892977/FairTrade-Logo_fjkmcg.png",
    description:
      "Fairtrade sets fair prices and decent working conditions for farmers and workers, enabling sustainable development.",
    validityScope: "Applies to Organic & Fairtrade certified Cotton Bags.",
  },
  {
    id: "sedex",
    name: "SEDEX Supply Chain Transparency",
    shortName: "SEDEX",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892977/SEDEX_ugowrd.gif",
    description:
      "SEDEX is one of the world's leading ethical trade membership organisations, working to improve working conditions in global supply chains.",
    validityScope: "Covers our stitching, cutting, and packaging facilities in Faisalabad.",
  },
  {
    id: "recycled",
    name: "Recycled Claim Standard",
    shortName: "Recycled",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892977/Recycled_i84vnn.gif",
    description: "Verifies the presence and amount of recycled material in a final product.",
    validityScope: "Applied to our recycled cotton bags and related products.",
  },
  {
    id: "ethically-made",
    name: "Ethically Made",
    shortName: "Ethical",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892977/EthicallyMadeWithRecycledCotton_cnehcq.png",
    description: "Ensures ethical manufacturing processes using recycled cotton materials.",
    validityScope: "Applied to our recycled cotton bags and related products.",
  },
  {
    id: "sgs",
    name: "SGS Certification",
    shortName: "SGS",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892978/sgs_mcthpq.jpg",
    description: "SGS is the world's leading inspection, verification, testing and certification company. It ensures products meet international quality and safety requirements.",
    validityScope: "Governs our quality control and product safety compliance.",
  }
];

export const references: ReferenceBlock[] = [
  {
    id: "finansforbundet",
    clientName: "Finansförbundet",
    industry: "Financial Services",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782027936/Finansf%C3%B6rbundet-logotyp-webb_e9d0sh.png",
    note: "Custom branded cotton tote bags for member events and trade fairs.",
  },
  {
    id: "storytel",
    clientName: "Storytel",
    industry: "Media & Publishing",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782028045/storytel_color_pos_xs_rgb_owravu.png",
    note: "Promotional cotton bags for subscription campaigns across Scandinavia.",
  },
  {
    id: "boulebar",
    clientName: "Boulebar",
    industry: "Hospitality & Leisure",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782027984/boulebar-logotyp-2015_sgpgii.png",
    note: "Branded merchandise and promotional bags for venue events.",
  },
  {
    id: "demadly",
    clientName: "Demadly Sweden",
    industry: "Fashion & Retail",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782027996/demadly_sweden_ssybpw.png",
    note: "Private label cotton bags for retail collections.",
  },
  {
    id: "fillipak",
    clientName: "Fillipa k",
    industry: "Packaging & Distribution",
    region: "Europe",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782028007/fillipak-logo_pshzzt.png",
    note: "Bulk packaging and industrial bag supply.",
  },
  {
    id: "sanoma",
    clientName: "Sanoma",
    industry: "Media & Publishing",
    region: "Europe",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782028028/sanoma_u3v1zv.jpg",
    note: "Promotional merchandise bags for publishing campaigns.",
  },
  {
    id: "tellkiddo",
    clientName: "Tellkiddo",
    industry: "Children & Family",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782028054/tellkiddo-320x202_rdkbv3.jpg",
    note: "Custom cotton bags for children's retail brand.",
  },
  {
    id: "hsr",
    clientName: "HSR",
    industry: "Education & Research",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782028015/HSR_f7cznt.png",
    note: "Branded bags for student and faculty outreach programmes.",
  },
  {
    id: "alloffice",
    clientName: "Alloffice kontorsvaruhus",
    industry: "Retail & Corporate",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782028318/AllOffice_logo_ezmpcn.png",
    note: "Corporate merchandise and office supplies branding.",
  },
  {
    id: "massolist",
    clientName: "Massolit Förlagsgrupp",
    industry: "Media & Publishing",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782028462/bag_1_u4amct.png",
    note: "Custom promotional tote bags for publishing events.",
  },
  {
    id: "balder",
    clientName: "Balder",
    industry: "Real Estate",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782028518/Balder_logo_cmyk_EPS_r%C3%B6d_dpf5bq.png",
    note: "Corporate promotional materials.",
  },
  {
    id: "beckers",
    clientName: "Beckers",
    industry: "Manufacturing & Retail",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782028539/Beckers_Large_CMYK_idceqc.png",
    note: "Branded materials for retail environments.",
  },
  {
    id: "reused-remade",
    clientName: "REUSED REMADE",
    industry: "Sustainability & Retail",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782029630/cropped-rsz_logo1_rwj9oz.png",
    note: "Eco-friendly and sustainable customized bags.",
  },
  {
    id: "taco-truck",
    clientName: "Taco Truck",
    industry: "Food & Beverage",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782032049/ElTacoTruck-svart-1_1_oczsyd.png",
    note: "Branded merchandise for food and beverage events.",
  },
  {
    id: "fab-lab",
    clientName: "Fab Lab",
    industry: "Design & Innovation",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782028609/FABLAB_logo_qqxep0.png",
    note: "Promotional items for design and innovation sectors.",
  },
  {
    id: "judits",
    clientName: "Judits",
    industry: "Fashion & Retail",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782028632/judits_lva88j.png",
    note: "Retail shopping bags and promotional accessories.",
  },
  {
    id: "lejonkulan",
    clientName: "Kopia av lejonkulan",
    industry: "Retail & Corporate",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782028667/Kopia_av_lejonkulan_logga_copy_zbbmmk.png",
    note: "Custom promotional products and giveaways.",
  },
  {
    id: "kpmg",
    clientName: "KPMG",
    industry: "Financial Services",
    region: "Global",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782031274/KPMG_Logo_White_screen_rskwdu.png",
    note: "Corporate branded merchandise for events and employees.",
  },
  {
    id: "laraforbundet",
    clientName: "Lärarförbundet",
    industry: "Education & Unions",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782028704/L%C3%A4raf%C3%B6rbundet_color_logo_kfxhqq.png",
    note: "Branded cotton bags for union members and campaigns.",
  },
  {
    id: "veronica-virta",
    clientName: "Veronica Virta",
    industry: "Fashion & Retail",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782032052/LOGGA-2_yukzjt.png",
    note: "Premium cotton bags for fashion retail collections.",
  },
  {
    id: "654-sthlm",
    clientName: "6/5/4 sthlm",
    industry: "Fashion & Lifestyle",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782028761/logo_654_p5c8cj.png",
    note: "Custom promotional gear for retail boutique in Stockholm.",
  },
  {
    id: "ballonger-nu",
    clientName: "Ballonger.nu",
    industry: "Events & Entertainment",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782029044/pink_logo_pzn7ub.png",
    note: "Event promotional materials and customized bags.",
  },
  {
    id: "sabina",
    clientName: "Sabina",
    industry: "Retail & Corporate",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782029075/sabina_logo_gy4fwc.png",
    note: "Corporate merchandise and branded items.",
  },
  {
    id: "nordiska-museet",
    clientName: "Nordiska Museet",
    industry: "Arts & Culture",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782029102/Screen_Shot_2017-02-20_at_15.39.42_trvf4z.png",
    note: "Custom tote bags for museum gift shops and exhibitions.",
  },
  {
    id: "granier-respons",
    clientName: "Granier respons",
    industry: "Retail & Corporate",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782029135/Screen_Shot_2017-02-21_at_22.09.38_xvsgwl.png",
    note: "Corporate promotional items.",
  },
  {
    id: "sitrus",
    clientName: "Sitrus",
    industry: "Media & Publishing",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782032053/sitrus_logotype_x_black_CMYK_vw13gj.png",
    note: "Customized promotional merchandise.",
  },
  {
    id: "skandia-fastigheter",
    clientName: "Skandia Fastigheter",
    industry: "Real Estate",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782029193/Skandia_Fastigheter_Logo_100_CMYK_Green_nkpe68.png",
    note: "Corporate branding and promotional events.",
  },
  {
    id: "trafik-nostalgiska-forlaget",
    clientName: "Trafik-Nostalgiska Förlaget",
    industry: "Media & Publishing",
    region: "Nordic",
    logo: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1782032055/TNF-kassen_logo_Webb_accsoj.png",
    note: "Promotional tote bags for publishing and literary events.",
  }
];

export const categoryOptions = [
  { value: "", label: "Select a product category" },
  { value: "bags", label: "Bags (Cotton, Organic, Recycled, PP Woven)" },
  { value: "gloves", label: "Gloves (Jersey, PVC Dotted, Terry, Sailing)" },
  { value: "towels-bathrobes", label: "Towels & Bathrobes" },
  { value: "tshirts-beanies", label: "T-Shirts & Cotton Beanies" },
  { value: "bandanas", label: "Bandanas" },
  { value: "caps", label: "Caps & Headwear" },
  { value: "bedsheet-linen", label: "Bedsheet Linen" },
  { value: "rugs-carpets", label: "Rugs and Carpets" },
];
