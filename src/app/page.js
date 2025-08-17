import Image from "next/image";
import ServicesSection from "./HomeComponents/ServicesSection";

export default function Home() {
  return (
    <div className="container-width px-3 md:px-6 py-8">
      <ServicesSection />
    </div>
  );
}
