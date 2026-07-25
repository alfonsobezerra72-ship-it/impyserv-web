import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { FeaturedCatalog } from "@/components/sections/FeaturedCatalog";
import { WhyUs } from "@/components/sections/WhyUs";
import { CTASection } from "@/components/sections/CTASection";
import { getFeaturedProjects } from "@/lib/data/projects";
import { getFeaturedProducts } from "@/lib/data/products";

export default async function Home() {
  const [projects, products] = await Promise.all([
    getFeaturedProjects(4),
    getFeaturedProducts(6),
  ]);

  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <FeaturedProjects projects={projects} />
      <FeaturedCatalog products={products} />
      <WhyUs />
      <CTASection />
    </>
  );
}
