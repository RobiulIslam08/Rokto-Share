import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const MainLayout = () => {
	return (
		<div>
		<Navbar/>
		  <main>
        <Outlet /> {/* এইখানে আপনার চাইল্ড রুট (HomePage) রেন্ডার হবে */}
      </main>
		<Footer/>
		</div>
	);
};

export default MainLayout;