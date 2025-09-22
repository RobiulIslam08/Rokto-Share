import MainLayout from "@/components/layout/MainLayout";
import ErrorPage from "@/pages/ErrorPage";
import FindBloodDonnerPage from "@/pages/FindBloodDonnerPage";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout/>,
		errorElement:<ErrorPage/>,
		children: [
			{
				index:true,
				element:<HomePage/>
			},
			{
				path:'/find-blood-donner-page',
				element:<FindBloodDonnerPage/>
			}
			
		]
	},

]);







