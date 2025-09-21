import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";

const MainLayout = () => {
	return (
		<div>
		<Navbar/>
		  <main>
        <Outlet /> {/* এইখানে আপনার চাইল্ড রুট (HomePage) রেন্ডার হবে */}
      </main>
			<p>footer</p>
		</div>
	);
};

export default MainLayout;