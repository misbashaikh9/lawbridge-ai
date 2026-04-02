import LawNavbar from "../components/lawfirm/LawNavbar";
import ServicesSection from "../components/lawfirm/Services";
import LawFooter from "../components/lawfirm/LawFooter";

const ServicesPage = () => {
  return (
    <div className="bg-white">
      <LawNavbar />
      {/* Spacer for fixed navbar */}
      <div className="h-20" />
      <ServicesSection />
      <LawFooter />
    </div>
  );
};

export default ServicesPage;
