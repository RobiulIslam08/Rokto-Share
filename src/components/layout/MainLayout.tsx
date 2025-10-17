
// MainLayout.js
import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import CTASection from "../common/CTASection";

// এই লেআউটে কোনো ধরনের লোডিং লজিক বা setTimeout থাকবে না।
const MainLayout = () => {
  return (
    <div className="aurora-background">
      <Navbar />
      <main>
        {/* এখানে HomePage বা অন্যান্য পেজ সরাসরি রেন্ডার হবে */}
        <Outlet /> 
      </main>
      <CTASection />
      <Footer />
    </div>
  );
};

export default MainLayout;