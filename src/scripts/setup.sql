-- ==========================================
-- COADVERT & MH TEX DATABASE SETUP SCRIPT
-- Run this script inside the Supabase SQL Editor
-- ==========================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DROP EXISTING TABLES (If any, to avoid conflicts)
-- DROP TABLE IF EXISTS inquiry_submissions CASCADE;
-- DROP TABLE IF EXISTS company_offices CASCADE;
-- DROP TABLE IF EXISTS services CASCADE;
-- DROP TABLE IF EXISTS "references" CASCADE;
-- DROP TABLE IF EXISTS product_category_certifications CASCADE;
-- DROP TABLE IF EXISTS product_subcategories CASCADE;
-- DROP TABLE IF EXISTS product_categories CASCADE;
-- DROP TABLE IF EXISTS certifications CASCADE;

-- 2. CREATE AUTOMATIC TIMESTAMP TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';


-- 3. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS certifications (
    id TEXT PRIMARY KEY, -- e.g., 'gots', 'oeko-tex'
    name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    description TEXT NOT NULL,
    validity_scope TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER update_certifications_updated_at
BEFORE UPDATE ON certifications
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- 4. PRODUCT CATEGORIES (FAMILIES) TABLE
CREATE TABLE IF NOT EXISTS product_categories (
    id TEXT PRIMARY KEY, -- e.g., 'bags', 'gloves'
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    image_url TEXT NOT NULL,
    hero_image_url TEXT,
    meta_title TEXT,
    meta_description TEXT,
    og_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER update_product_categories_updated_at
BEFORE UPDATE ON product_categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- 5. CATEGORY-CERTIFICATION LINK TABLE (Many-to-Many)
CREATE TABLE IF NOT EXISTS product_category_certifications (
    category_id TEXT REFERENCES product_categories(id) ON DELETE CASCADE,
    certification_id TEXT REFERENCES certifications(id) ON DELETE CASCADE,
    PRIMARY KEY (category_id, certification_id)
);


-- 6. PRODUCT SUBCATEGORIES TABLE
CREATE TABLE IF NOT EXISTS product_subcategories (
    id TEXT PRIMARY KEY, -- e.g., 'cotton-bags', 'pvc-dotted-gloves'
    category_id TEXT REFERENCES product_categories(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    detailed_copy TEXT,
    features TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
    image_url TEXT NOT NULL,
    gallery TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
    certification_note TEXT,
    cta_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subcategories_category_id ON product_subcategories(category_id);

CREATE OR REPLACE TRIGGER update_product_subcategories_updated_at
BEFORE UPDATE ON product_subcategories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- 7. B2B REFERENCES (CLIENT CASE STUDIES) TABLE
CREATE TABLE IF NOT EXISTS "references" (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    region TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    note TEXT,
    display_order INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    website_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER update_references_updated_at
BEFORE UPDATE ON "references"
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- 8. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    details TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
    icon TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER update_services_updated_at
BEFORE UPDATE ON services
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- 9. COMPANY OFFICES TABLE
CREATE TABLE IF NOT EXISTS company_offices (
    id TEXT PRIMARY KEY, -- e.g., 'sweden', 'pakistan'
    country TEXT NOT NULL,
    company_name TEXT NOT NULL,
    reg_number TEXT NOT NULL,
    address TEXT NOT NULL,
    visit_address TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    role TEXT NOT NULL,
    website TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER update_company_offices_updated_at
BEFORE UPDATE ON company_offices
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- 10. INQUIRY SUBMISSIONS (ZERO-TRUST CAPTURE) TABLE
CREATE TABLE IF NOT EXISTS inquiry_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    category TEXT NOT NULL,
    quantity TEXT NOT NULL,
    message TEXT NOT NULL,
    has_custom_bag BOOLEAN DEFAULT FALSE,
    custom_description TEXT,
    custom_quantity TEXT,
    custom_image_name TEXT,
    custom_image_url TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_category_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE "references" ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_offices ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiry_submissions ENABLE ROW LEVEL SECURITY;

-- 1. READ POLICIES (Allow public read for static/catalog resources)
DROP POLICY IF EXISTS "Allow public read access to certifications" ON certifications;
CREATE POLICY "Allow public read access to certifications" ON certifications
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to product_categories" ON product_categories;
CREATE POLICY "Allow public read access to product_categories" ON product_categories
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to product_category_certifications" ON product_category_certifications;
CREATE POLICY "Allow public read access to product_category_certifications" ON product_category_certifications
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to product_subcategories" ON product_subcategories;
CREATE POLICY "Allow public read access to product_subcategories" ON product_subcategories
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to references" ON "references";
CREATE POLICY "Allow public read access to references" ON "references"
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to services" ON services;
CREATE POLICY "Allow public read access to services" ON services
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access to company_offices" ON company_offices;
CREATE POLICY "Allow public read access to company_offices" ON company_offices
    FOR SELECT USING (true);

-- 2. WRITE POLICIES (Write-Only for Contact Inquiries, Admin-Only for rest)
DROP POLICY IF EXISTS "Allow public insert for inquiry_submissions" ON inquiry_submissions;
CREATE POLICY "Allow public insert for inquiry_submissions" ON inquiry_submissions
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Restrict read access to inquiry_submissions" ON inquiry_submissions;
CREATE POLICY "Restrict read access to inquiry_submissions" ON inquiry_submissions
    FOR SELECT USING (false); -- Block public read (Admins access via dashboard/service_role)


-- ==========================================
-- SEED DATA INJECTION
-- ==========================================

-- A. CERTIFICATIONS
INSERT INTO certifications (id, name, short_name, logo_url, description, validity_scope) VALUES
('gots', 'Global Organic Textile Standard', 'GOTS', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892977/gots_rgb_ndxdl1.jpg', 'World''s leading processing standard for textiles made from organic fibres. Defines high-level environmental criteria along the entire organic textiles supply chain and requires compliance with social criteria as well.', 'Applied to Organic Cotton Bags, T-Shirts, and Terry Towels.'),
('gots-cu', 'Control Union (GOTS)', 'GOTS CU', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892977/GOTS_CU_mvmzio.jpg', 'Control Union Certifications is an independent, internationally operating certification body that carries out inspections and issues certificates for sustainable practices including GOTS.', 'Verification for our organic product line processing and manufacturing.'),
('oeko-tex', 'OEKO-TEX® Standard 100', 'OEKO-TEX', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892977/OEKO_yemxfn.png', 'One of the world''s best-known labels for textiles tested for harmful substances. Every thread, button, and accessory is verified as non-toxic and skin-safe.', 'Ensures all dyes, threads, and base fabrics are 100% skin-safe and hazard-free.'),
('fairtrade', 'Fairtrade Certification', 'Fairtrade', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892977/FairTrade-Logo_fjkmcg.png', 'Fairtrade sets fair prices and decent working conditions for farmers and workers, enabling sustainable development.', 'Applies to Organic & Fairtrade certified Cotton Bags.'),
('sedex', 'SEDEX Supply Chain Transparency', 'SEDEX', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892977/SEDEX_ugowrd.gif', 'SEDEX is one of the world''s leading ethical trade membership organisations, working to improve working conditions in global supply chains.', 'Covers our stitching, cutting, and packaging facilities in Faisalabad.'),
('recycled', 'Recycled Claim Standard', 'Recycled', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892977/Recycled_i84vnn.gif', 'Verifies the presence and amount of recycled material in a final product.', 'Applied to our recycled cotton bags and related products.'),
('ethically-made', 'Ethically Made', 'Ethical', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892977/EthicallyMadeWithRecycledCotton_cnehcq.png', 'Ensures ethical manufacturing processes using recycled cotton materials.', 'Applied to our recycled cotton bags and related products.'),
('sgs', 'SGS Certification', 'SGS', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781892978/sgs_mcthpq.jpg', 'SGS is the world''s leading inspection, verification, testing and certification company. It ensures products meet international quality and safety requirements.', 'Governs our quality control and product safety compliance.'),
('iso-9001', 'ISO 9001 Quality Management', 'ISO 9001', '/images/cert-iso.png', 'Specifies requirements for a quality management system, demonstrating ability to consistently provide high-quality products.', 'Governs our quality control protocols and administrative workflows.'),
('ce-compliance', 'CE Safety Compliance', 'CE', '/images/cert-ce.png', 'Certifies products meet EU safety, health, and environmental requirements. Mandatory for safety work gloves.', 'Mandatory compliance for our safety and protective work gloves.')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    short_name = EXCLUDED.short_name,
    logo_url = EXCLUDED.logo_url,
    description = EXCLUDED.description,
    validity_scope = EXCLUDED.validity_scope;


-- B. PRODUCT CATEGORIES (FAMILIES)
INSERT INTO product_categories (id, name, description, long_description, image_url, hero_image_url, meta_title, meta_description) VALUES
('bags', 'Bags', 
 'Cotton, organic, recycled, non-woven, PP woven, and rug bags. Customised designs, multiple weights and printing options.',
 'CoAdvert AB Sweden and MH Tex, Pakistan is the legacy of a family associated with cotton and cotton products for the last 47 years. Cotton being biodegradable, natural and breathable fabric has been used by humans for thousands of years. Cotton Bags provide long-time durability and most impressions than any other give-away product.',
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812310/18_rpungm.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812310/18_rpungm.jpg',
 'Bags B2B Wholesale Manufacturing | CoAdverts', 'Wholesale B2B organic, cotton, recycled and PP-woven bag production.'),

('gloves', 'Gloves',
 'Wide variety including Nitrile, Vinyl, Cotton, Interlock, Jersey, PVC Dotted, Terry and Sailing Gloves.',
 'A wide variety to choose from — including Nitrile Gloves, Vinyl Gloves, Cotton Gloves, Interlock, Jersey Gloves, Working Gloves, PVC Dotted Gloves and Terry Gloves. Best-selling promotional and safety items suitable for the European market.',
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988988/Sailing_gloves_cfwmvp.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988988/Sailing_gloves_cfwmvp.jpg',
 'Safety & Industrial Gloves Supplier | CoAdverts', 'High protection work, safety, and promotional gloves.'),

('towels-bathrobes', 'Towels & Bathrobes',
 'All kinds of terry products from 100% Cotton, Organic Cotton, Blended Ring Spun & Open End Yarns.',
 'All kinds of Terry Products from 100% Cotton, Organic Cotton, Blended Ring Spun & Open End Yarns. Terry Towels (400 to 800 gsm), Bath Mats (600 to 1000 gsm), and Bath Robes (400 to 450 gsm) — available White, Dyed & Pigment Printed.',
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987216/Towel_3_ayxk17.png', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987216/Towel_3_ayxk17.png',
 'Wholesale Terry Towels & Bathrobes | CoAdverts', 'Premium resort, spa, hotel towels and custom bathrobes.'),

('tshirts-beanies', 'T-shirts',
 'Promotional T-shirts in Cotton, Organic Cotton and Cotton-Polyester. High quality 160–210 GSM.',
 'Get the best deals on promotional T-shirts custom imprinted with your advertisement. We provide all kind of t-shirts in Cotton, Organic Cotton and Cotton-Polyester mix fabric. High quality T-shirts are produced from 160 gsm to 210 gsm and available in all different designs, sizes and colours.',
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905104/Branca_huklwz.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905104/Branca_huklwz.jpg',
 'Custom T-Shirts & Knitted Beanies | CoAdverts', 'B2B customized corporate wear, printed tees, and promotional beanies.'),

('bandanas', 'Bandanas',
 'Silk or cotton fabric bandanas dyed with various colours — head, hand, or promotional use.',
 'A bandana is a silk or cotton fabric that looks like a handkerchief, often dyed with various colours. Mostly worn on the head, around the hand, or carried for symbolic representation of an individual or group.',
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905177/46453102_742532862775986_4458650608479502336_n_jfec9b.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905177/46453102_742532862775986_4458650608479502336_n_jfec9b.jpg',
 'Wholesale Custom Printed Bandanas | CoAdverts', 'B2B silk and cotton patterned bandanas and promotional headwear.'),

('caps', 'Caps & Headwear',
 'Premium cotton and blended caps for promotional and retail purposes.',
 'High-quality caps and headwear available in various styles including baseball caps, snapbacks, and dad hats. Fully customizable with embroidery and printing.',
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905047/20141006_131930_oansp2.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905047/20141006_131930_oansp2.jpg',
 'Caps & Headwear | CoAdverts', 'Premium cotton and blended caps for promotional and retail purposes.'),

('bedsheet-linen', 'Bedsheet Linen',
 'Luxurious cotton bedsheets and linens for hotels and retail.',
 'Our premium bedsheet linens are crafted from the finest cotton, offering exceptional comfort and durability. Available in various thread counts and sizes.',
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905329/bedsheet2_zg8t6x.png', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905329/bedsheet2_zg8t6x.png',
 'Bedsheet Linen | CoAdverts', 'Luxurious cotton bedsheets and linens for hotels and retail.'),

('rugs-carpets', 'Rugs and Carpets',
 'Hand-woven and machine-made rugs and carpets for home and retail.',
 'Discover our diverse collection of rugs and carpets, ranging from traditional hand-woven designs to modern machine-made patterns.',
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905364/46377555_2128526277398073_6092852838172459008_n_1_wgn6yc.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905364/46377555_2128526277398073_6092852838172459008_n_1_wgn6yc.jpg',
 'Rugs and Carpets | CoAdverts', 'Hand-woven and machine-made rugs and carpets for home and retail.')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    long_description = EXCLUDED.long_description,
    image_url = EXCLUDED.image_url,
    hero_image_url = EXCLUDED.hero_image_url,
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description;


-- C. CATEGORY-CERTIFICATION LINKS
INSERT INTO product_category_certifications (category_id, certification_id) VALUES
('bags', 'gots'), ('bags', 'gots-cu'), ('bags', 'fairtrade'), ('bags', 'oeko-tex'), ('bags', 'recycled'), ('bags', 'ethically-made'),
('gloves', 'iso-9001'), ('gloves', 'ce-compliance'),
('towels-bathrobes', 'gots'), ('towels-bathrobes', 'gots-cu'), ('towels-bathrobes', 'oeko-tex'),
('tshirts-beanies', 'gots'), ('tshirts-beanies', 'gots-cu'), ('tshirts-beanies', 'oeko-tex'),
('bandanas', 'oeko-tex'),
('caps', 'sgs'),
('bedsheet-linen', 'oeko-tex'),
('rugs-carpets', 'ethically-made')
ON CONFLICT (category_id, certification_id) DO NOTHING;


-- D. PRODUCT SUBCATEGORIES
INSERT INTO product_subcategories (id, category_id, name, description, detailed_copy, features, image_url, gallery, certification_note) VALUES
-- Bags Subcategories
('cotton-bags', 'bags', 'Cotton Bags',
 'Natural, breathable cotton bags in a wide variety of weights and designs.',
 'Cotton being biodegradable, natural and breathable fabric has been used by humans for thousands of years. Cotton Bags provide long-time durability and most impressions than any other give-away product. Available in different weights, sizes and designs. Customized designs are our speciality.',
 ARRAY['Weight of fabric from 100 to 450 GSM (standard 150 GSM)', 'Laminated options for water-resistance', 'Silk Screen, Heat Transfer and Offset printing', 'Webbing Cotton, Rope Handles and more', 'Handle length adjusted to your needs'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812904/TBC_Mixed_leaves_ih6pe4.jpg',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812225/Reused_Remade_CBF_Grass_brokqv.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812223/P%C3%A5sar0005_sjoqed.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812223/P%C3%A5sar0032_egkccz.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812170/CBF_grass_cgoi2z.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812416/46382831_1002646186584734_6042450726939000832_n_bmebjj.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812619/Skiss_totebag_2016_iajxsw.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987948/Red_Sports_Bag_a3gawr.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987950/Wooden_Handels2_s966du.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987998/US_z6gwfg.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988038/Sk%C3%A4rmavbild_2017-12-03_kl._19.35.42_bhugqr.png', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812486/Foto_2015-06-10_11_14_26_oxe4vk.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812388/42281411_472883393225847_2752094182897090560_n_gjucxm.jpg'],
 'Available in GOTS certified organic cotton.'),

('organic-fairtrade-bags', 'bags', 'Organic & Fairtrade Cotton Bags',
 'GOTS certified organic cotton bags — grown without pesticides, seeds not genetically modified.',
 'Ever increasing need of environment friendly bags has become a new mantra to challenge conventional usage of plastic and paper bags. Third-party certification organizations verify the complete organic cotton cycle. GOTS ensures ecological, environmental, and social standards.',
 ARRAY['120, 140, 250 and 350 GSM in stock', 'GOTS (Global Organic Textile Standard) certified', 'No pesticides or insecticides', 'Non-GMO seeds', 'Other qualities developed on request'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813225/organic_02_xkmgu2.jpg',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813226/organic_03_bmv4ep.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813224/organic_01_kl34dl.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813228/organic_05_mq6tik.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813233/organic_04_ilbthy.jpg'],
 'GOTS & Fairtrade certified.'),

('recycled-cotton-bags', 'bags', 'Recycled Cotton Bags',
 'Regenerated yarn from textile waste, mixed with recycled PET polyester for strength.',
 'Textile and fashion industries around the globe have huge environmental footprints. To reduce textile waste, we regenerate these wastes and make bags with them. Yarn is regenerated from old and used cloths, mixed with recycled PET bottle polyester to give it extra strength.',
 ARRAY['75% Recycled Cotton, 25% Recycled Polyester', 'Available in 150, 250 and 360 GSM', 'Webbing Cotton handles (360 GSM)', 'Fully circular production model', 'Reduces textile industry waste'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813255/Recycled_06_z4ltvp.jpg',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813242/Recycled_04_ugwnb7.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813244/Recycled_01_ewf1gp.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813255/Recycled_07_yb7ld5.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813243/Recycled_02_o4jgju.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813245/Recycled_03_nd2esw.jpg'],
 'Recycled content verified.'),

('nonwoven-pp-bags', 'bags', 'Non-Woven & PP Woven Bags',
 'PP spun-bound non-woven and polypropylene woven bags — strong, lightweight and reusable.',
 'PP Spun bound Non-Woven fabric is environment friendly, strong, reusable, lightweight, non-toxic and water-resistant. In our range of woven fabrics, we focus on woven Polypropylene (PP) bags — strong and water resistant.',
 ARRAY['Non-woven: 55 GSM to 140 GSM, large colour selection', 'With and without OPP Film or Foil lamination', 'PP Woven: 110 GSM to 180 GSM, Matt or Gloss', 'Rotogravure & Silk Screen printing options', 'Cord and flat handles in hand/shoulder length'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813293/P%C3%A5sar0005_i4ukgn.jpg',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813291/P%C3%A5sar0032_myqmgx.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813279/T-gusset_non_woven_bag_1_rldws4.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813282/P1_jbmagw.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813278/ultrasonik_iigzzd.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813267/The_first_bag_of_RE-BA_bags_2_g5atyu.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813261/The_first_bag_of_ICA_bags_3_fst2vq.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813266/The_first_bag_of_ICA_bags_5_hxkrej.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813275/Non-woven_T-shirt_Bags_1_zuckmr.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813280/The_sample_of_ICA_bags_3_zhozow.jpg'],
 'Environment-friendly and reusable.'),

('rug-carpet-bags', 'bags', 'Rug & Carpet Tote Bags',
 'Hand-woven customized rug bags and simple woven rugs for retailers.',
 'Hand-woven customized rugs and bags made with rugs. Simple woven rugs can be provided to retailers on affordable prices.',
 ARRAY['Hand-woven with recycled cotton', 'Customized patterns on larger quantities', 'Cord handles', 'MOQ: 500 pcs', 'Unique artisan aesthetic'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905365/46373423_342214903001831_1560310955202576384_n_oxnd9n.jpg',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905367/46118509_199536640935995_5865761377313882112_n_kthzw4.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905371/46438320_223803594997999_8410083356171042816_n_fm5et5.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905374/_39R7936_vfatwq.jpg'],
 'Handcrafted using recycled materials.'),

-- Gloves Subcategories
('interlock-jersey-gloves', 'gloves', 'Interlock & Jersey Gloves',
 'Lightweight natural cotton gloves for general purpose, household cleaning, and painting.',
 'Light Weight Natural cotton gloves are general purpose gloves. Medium weight Jersey Gloves are ideal light-duty gloves for household cleaning, general maintenance and painting. Knit wrist keeps out dirt and debris.',
 ARRAY['100% natural cotton', 'Available in different designs and colours', 'Knit wrist for debris protection', 'Light to medium weight', 'General purpose utility'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988989/Jersey_Gloves_1_zry6gz.jpg',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988990/interlock_2_b1xtrd.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988991/interlock_f97hzg.jpg'],
 'Standard cotton safety compliance.'),

('pvc-dotted-gloves', 'gloves', 'PVC Dotted Gloves',
 'Canvas cotton PVC coated dot gloves for working, cleaning, and loading/unloading.',
 'Large selection and sizes of Canvas Cotton PVC Coated Dot Gloves. Available in different designs and colours. Can be used as working gloves as well as for daily cleaning and loading, unloading jobs.',
 ARRAY['PVC dots for superior grip', 'Canvas cotton base', 'Available in multiple sizes', 'Heavy-duty working applications', 'Loading and unloading tasks'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988987/PVC_Dotted_1_a956bi.jpg',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988988/PVC_dotted_2_dvugcy.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988989/PVC_dotted_3_sjggcc.jpg'],
 'Work safety compliant.'),

('terry-mittens-gloves', 'gloves', 'Terry Gloves & Mittens',
 'Heavy-weight terry cloth gloves and kitchen mittens — promotional and functional.',
 'Heavy weight Terry cloth working gloves, also used as bathroom accessory. Mitten is a type of protective clothing used to cover the hand. A kitchen is incomplete without mittens — a handful choice for promotional activities.',
 ARRAY['Heavy weight terry cloth', 'Bathroom accessory use', 'Kitchen mitten variants', 'Available in different sizes and colours', 'Ideal for promotional giveaways'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988989/mittens_gqsagk.png',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988990/Terry_Gloves_hl00xi.jpg'],
 'Safe for household use.'),

('sailing-gloves', 'gloves', 'Sailing Gloves',
 'Warm, strong, waterproof sailing gloves with easy grip — best-selling for European market.',
 'Wide range of warm, strong, waterproof sailing gloves with easy grip. Best-selling promotional item suitable for the European market.',
 ARRAY['Warm and waterproof construction', 'Easy grip design', 'European market favourite', 'Best-selling promotional item', 'Wide size range'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988988/Sailing_gloves_cfwmvp.jpg',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781988988/Sailing_gloves_cfwmvp.jpg'],
 'Marine-grade waterproof materials.'),

-- Towels Subcategories
('terry-towels', 'towels-bathrobes', 'Terry Towels',
 '400 to 800 GSM in White, Dyed & Pigment Printed from 100% Cotton or Organic Cotton.',
 'Premium terry towels from 100% Cotton, Organic Cotton, Blended Ring Spun & Open End Yarns. White, Dyed & Pigment Printed available.',
 ARRAY['400 to 800 GSM weight range', '100% Cotton, Organic Cotton or blended', 'White, Dyed & Pigment Printed', 'Ring Spun & Open End Yarns', 'Bulk hotel and spa supply'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987216/towels_mkahqx.png',
 ARRAY[]::TEXT[],
 'GOTS certified organic cotton variant available.'),

('bath-mats', 'towels-bathrobes', 'Bath Mats',
 '600 to 1000 GSM bath mats, dyed & pigment printed for hotels and home.',
 'Heavy-duty bath mats in 600 to 1000 GSM — dyed and pigment printed, suitable for hotels, spas, and institutional buyers.',
 ARRAY['600 to 1000 GSM — extra thick', 'Dyed & Pigment Printed options', 'Non-slip backing available', 'Hotel and institutional supply', 'Custom sizes available'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781987216/towels_3_qhzxl4.jpg',
 ARRAY[]::TEXT[],
 'Safe non-toxic dye compliance.'),

-- T-Shirts Subcategories
('cotton-tshirts', 'tshirts-beanies', 'Cotton T-Shirts',
 '160–210 GSM promotional and branded t-shirts in pure cotton, organic or polyester blend.',
 'Get the best deals on promotional T-shirts custom imprinted with your advertisement. Available in all different designs, sizes and colours.',
 ARRAY['160 GSM to 210 GSM high quality', 'Pure cotton, organic cotton or Cotton-Polyester mix', 'Available in all designs, sizes and colours', 'Logo imprinted and/or embroidered', 'Polo style shirts in Pique fabric also available'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905104/Branca_huklwz.jpg',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905109/JackAndCoke_logo_tshirt-skiss_dga62d.png', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905105/t-shirt_qrjysp.png', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905104/Shirt_m1lw7h.png'],
 'Organic variant is GOTS certified.'),

-- Bandanas Subcategories
('classic-bandanas', 'bandanas', 'Classic Printed Bandanas',
 'Traditional square bandanas in cotton or silk, dyed in various colours and patterns.',
 'Bandana is a silk or cotton fabric, that looks like a handkerchief, and often dyed with various colours. Mostly worn on the head or around the hand. Fully customisable with your brand artwork.',
 ARRAY['Cotton or silk fabric', 'Fully custom colours and patterns', 'Screen print and discharge options', 'Standard 22" x 22" or custom sizes', 'MOQ: 1,000 units'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905177/46453102_742532862775986_4458650608479502336_n_jfec9b.jpg',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905177/46348340_171033080518776_7433671620016734208_n_muzbbk.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905177/image005_upikkr.png'],
 'OEKO-TEX skin-safe dyes.'),

-- Caps Subcategories
('baseball-caps', 'caps', 'Baseball Caps',
 'Classic 6-panel baseball caps in premium cotton.',
 '',
 ARRAY['100% Cotton Twill', 'Adjustable strap', 'Custom embroidery'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905036/45993898_189564455283064_1450101913998589952_n_q1krvn.jpg',
 ARRAY[]::TEXT[],
 ''),

('winter-caps', 'caps', 'Winter Caps',
 'Premium winter caps for all age groups in premium stuff.',
 '',
 ARRAY['Premium Cotton', 'Premium Stuff', 'Embroidery'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905047/20141006_131930_oansp2.jpg',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905041/20141022_142043_ppwa5c.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905038/SAM_2183_rvgpoz.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905037/Caps_kjrzfu.jpg'],
 ''),

-- Bedsheet Linen Subcategories
('cotton-bedsheets', 'bedsheet-linen', 'Cotton Bedsheets',
 'High thread count pure cotton bedsheets.',
 '',
 ARRAY['100% Pure Cotton', 'Available in all standard sizes', 'Wrinkle resistant'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905330/Bedsheet1_mdmrxx.png',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905330/Bedsheet1_mdmrxx.png'],
 ''),

-- Rugs and Carpets Subcategories
('handwoven-rugs', 'rugs-carpets', 'Handwoven Rugs',
 'Artisanal handwoven rugs made with recycled materials.',
 '',
 ARRAY['Handcrafted', 'Custom dimensions', 'Eco-friendly materials'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905368/IMG_20140326_140749_c48kip.jpg',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905369/IMG_20140326_140911_hjop4t.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905367/IMG_20140326_140056_lmhmqj.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905366/IMG_20140326_140404_nywpdn.jpg'],
 ''),

('machine-made-rugs', 'rugs-carpets', 'Machine-Made Rugs',
 'Durable and affordable machine-made rugs for everyday use.',
 '',
 ARRAY['Machine-made', 'Custom dimensions', 'Eco-friendly materials'],
 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905376/Mandal_us5fja.jpg',
 ARRAY['https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905365/Stetind_Blue_jhia7x.jpg', 'https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905364/46377555_2128526277398073_6092852838172459008_n_1_wgn6yc.jpg'],
 '')
ON CONFLICT (id) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    detailed_copy = EXCLUDED.detailed_copy,
    features = EXCLUDED.features,
    image_url = EXCLUDED.image_url,
    gallery = EXCLUDED.gallery,
    certification_note = EXCLUDED.certification_note;


-- E. CLIENT REFERENCES
INSERT INTO "references" (id, client_name, industry, region, logo_url, note, display_order, is_featured) VALUES
('finansforbundet', 'Finansförbundet', 'Financial Services', 'Nordic', '/images/ref-finansforbundet.png', 'Custom branded cotton tote bags for member events and trade fairs.', 1, true),
('storytel', 'Storytel', 'Media & Publishing', 'Nordic', '/images/ref-storytel.png', 'Promotional cotton bags for subscription campaigns across Scandinavia.', 2, true),
('boulebar', 'Boulebar', 'Hospitality & Leisure', 'Nordic', '/images/ref-boulebar.png', 'Branded merchandise and promotional bags for venue events.', 3, true),
('demadly', 'Demadly Sweden', 'Fashion & Retail', 'Nordic', '/images/ref-demadly.png', 'Private label cotton bags for retail collections.', 4, true),
('fillipak', 'Fillipak', 'Packaging & Distribution', 'Europe', '/images/ref-fillipak.png', 'Bulk packaging and industrial bag supply.', 5, false),
('sanoma', 'Sanoma', 'Media & Publishing', 'Europe', '/images/ref-sanoma.jpg', 'Promotional merchandise bags for publishing campaigns.', 6, false),
('tellkiddo', 'Tellkiddo', 'Children & Family', 'Nordic', '/images/ref-tellkiddo.jpg', 'Custom cotton bags for children''s retail brand.', 7, false),
('hsr', 'HSR', 'Education & Research', 'Nordic', '/images/ref-hsr.png', 'Branded bags for student and faculty outreach programmes.', 8, false)
ON CONFLICT (id) DO UPDATE SET
    client_name = EXCLUDED.client_name,
    industry = EXCLUDED.industry,
    region = EXCLUDED.region,
    logo_url = EXCLUDED.logo_url,
    note = EXCLUDED.note,
    display_order = EXCLUDED.display_order,
    is_featured = EXCLUDED.is_featured;


-- F. SERVICES
INSERT INTO services (id, title, description, details, icon) VALUES
('supplier-network', 'Supplier Network Sourcing',
 'Wide array of duly selected reliable suppliers and manufacturers across cotton, yarns, and safety materials.',
 ARRAY['Network of audited cotton growers in Pakistan', 'Strict raw-material chemical screening', 'Priority sourcing for specialized polymers and dyes', 'Direct factory relationships — no middlemen'],
 'network'),
('price-negotiation', 'Price Negotiation & Purchase Orders',
 'We handle full price negotiation and purchase order processes, eliminating middlemen and broker markups.',
 ARRAY['Direct mill pricing with no intermediary fees', 'Volume-based sliding scales', 'Transparent material cost breakdowns', 'Fixed pricing contracts for long-term runs'],
 'negotiation'),
('design-development', 'Design Development & Product Categorisation',
 'Our design teams refine sizing, fabric specifications, tech packs, and print-ready artwork.',
 ARRAY['Product categorisation and range development', 'Detailed tech packs and vector templates', 'Physical sampling and prototype proofs', 'Digital mockups for team approvals'],
 'design'),
('ethical-compliance', 'Social & Environmental Compliance',
 'We ensure implementation of social and environmental codes and principles throughout the supply chain.',
 ARRAY['Zero tolerance for child and forced labour', 'Fair living wages and legal working hours', 'Environmental wastewater treatment monitoring', 'GOTS, Fairtrade and SEDEX audit support'],
 'compliance'),
('inspection', 'Production Inspection & Review',
 'Review and inspection of goods during the complete production cycle at every stage.',
 ARRAY['Inline inspections at raw material, cut, and sew stages', 'Pre-shipment final AQL inspection', 'Formal inspection reports sent before loading', 'Tensile strength and colorfastness lab validation'],
 'inspection'),
('shipping-customs', 'Shipping & Customs Clearance',
 'Shipping and customs clearances handled through reliable transport agents — door to door.',
 ARRAY['Sea freight (FCL/LCL) and air express cargo', 'Bills of Lading and Certificates of Origin', 'DDP shipping to eliminate EU customs fees', 'Full tracking until final warehouse arrival'],
 'shipping')
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    details = EXCLUDED.details,
    icon = EXCLUDED.icon;


-- G. OFFICES
INSERT INTO company_offices (id, country, company_name, reg_number, address, visit_address, email, phone, role, website) VALUES
('sweden', 'Sweden', 'CoAdvert AB', '556892-9052', 'Kivra: 556892-9052, 106 31 Stockholm SE, Sweden', 'Stockholm, Sweden', 'customerservice@coadvert.com', '+46 76 042 87 17', 'Head Office, Design & Scandinavian Logistics Hub', 'www.coadvert.com'),
('pakistan', 'Pakistan', 'MH Tex', '023491-3', 'P-5, Street 01, Behind Jhang Sizing, Nawaz Park, Chack 279/RB Khurd, Kaleem Shaheed Park, Faisalabad, Pakistan', NULL, 'mhtextile.pk@gmail.com', '+92 321 66 74 655', 'Manufacturing Base, Weaving & Stitching Facility', 'www.mhtextile.com.pk')
ON CONFLICT (id) DO UPDATE SET
    country = EXCLUDED.country,
    company_name = EXCLUDED.company_name,
    reg_number = EXCLUDED.reg_number,
    address = EXCLUDED.address,
    visit_address = EXCLUDED.visit_address,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone,
    role = EXCLUDED.role,
    website = EXCLUDED.website;


-- ==========================================
-- H. STORAGE BUCKET & ZERO-TRUST POLICIES
-- ==========================================

-- Create the private 'inquiries' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'inquiries',
    'inquiries',
    false,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow anonymous uploads (INSERT) only
DROP POLICY IF EXISTS "Allow public uploads to inquiries bucket" ON storage.objects;
CREATE POLICY "Allow public uploads to inquiries bucket"
ON storage.objects
FOR INSERT
WITH CHECK (
    bucket_id = 'inquiries'
);

-- Policy to completely block public reads (SELECT)
DROP POLICY IF EXISTS "Block public read of inquiries bucket" ON storage.objects;
CREATE POLICY "Block public read of inquiries bucket"
ON storage.objects
FOR SELECT
USING (
    false
);
