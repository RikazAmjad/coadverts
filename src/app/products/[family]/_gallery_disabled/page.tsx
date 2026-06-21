import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ProductService } from "@/core/services/ProductService";

interface PageProps {
  params: Promise<{ family: string }>;
}

// Generate static paths for Next.js App Router static site generation
export async function generateStaticParams() {
  const categories = await ProductService.getAllCategories();
  return categories.map((category) => ({
    family: category.id,
  }));
}

export const dynamicParams = false;

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { family } = await params;
  const category = await ProductService.getCategoryById(family);

  if (!category) {
    return {
      title: "Gallery Not Found",
    };
  }

  return {
    title: `${category.name} Design & Production Gallery`,
    description: `Browse all custom-manufactured ${category.name.toLowerCase()} design samples, mockups and production details.`,
  };
}

export default async function GalleryPage({ params }: PageProps) {
  const { family } = await params;
  const category = await ProductService.getCategoryById(family);

  if (!category) {
    notFound();
  }

  // Filter subcategories that actually have gallery images
  const gallerySubcategories = category.subcategories.filter(
    (sub) => sub.gallery && sub.gallery.length > 0
  );

  if (gallerySubcategories.length === 0) {
    notFound();
  }

  // Define some nice color variants for subcategory section cards based on index
  const colorSchemes = [
    { color: "bg-amber-50 border-amber-200", badge: "bg-amber-100 text-amber-800" },
    { color: "bg-green-50 border-green-200", badge: "bg-green-100 text-green-800" },
    { color: "bg-teal-50 border-teal-200", badge: "bg-teal-100 text-teal-800" },
    { color: "bg-blue-50 border-blue-200", badge: "bg-blue-100 text-blue-800" },
    { color: "bg-rose-50 border-rose-200", badge: "bg-rose-100 text-rose-800" },
  ];

  const totalImages = gallerySubcategories.reduce(
    (acc, sub) => acc + (sub.gallery?.length || 0),
    0
  );

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm">
        <div className="container-wide py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-neutral-900 font-heading">
              {category.name} — Production Gallery
            </h1>
            <p className="text-xs text-neutral-500">
              {gallerySubcategories.length} subcategories · {totalImages} images
            </p>
          </div>
          <Link
            href={`/products/${category.id}`}
            className="text-sm text-brand-700 hover:underline font-medium"
          >
            ← Back to {category.name} page
          </Link>
        </div>
      </div>

      <div className="container-wide py-12 space-y-16">
        {gallerySubcategories.map((sub, index) => {
          const scheme = colorSchemes[index % colorSchemes.length];
          const images = sub.gallery || [];
          return (
            <section key={sub.id} id={sub.id}>
              {/* Section Header */}
              <div className={`flex items-center gap-4 mb-6 p-4 rounded-xl border ${scheme.color}`}>
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${scheme.badge}`}>
                  {sub.id}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 font-heading mb-0.5">
                    {sub.name}
                  </h2>
                  <p className="text-xs text-neutral-600">{sub.description}</p>
                </div>
                <span className="ml-auto text-xs text-neutral-400 font-medium">
                  {images.length} images
                </span>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 hover:shadow-lg hover:border-neutral-300 transition-all duration-300"
                  >
                    <Image
                      src={img}
                      alt={`${sub.name}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Quick Jump Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-white shadow-xl border border-neutral-200 rounded-full px-4 py-2.5 z-20">
        {gallerySubcategories.map((sub, index) => {
          const scheme = colorSchemes[index % colorSchemes.length];
          return (
            <a
              key={sub.id}
              href={`#${sub.id}`}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${scheme.badge} hover:opacity-80`}
            >
              {sub.id}
            </a>
          );
        })}
      </div>
    </main>
  );
}
