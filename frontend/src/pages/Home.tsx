// @ts-nocheck
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      className="min-h-screen bg-background text-foreground font-sans"
      style={{ scrollBehavior: "smooth" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </motion.div>
  );
}
export default Home;
