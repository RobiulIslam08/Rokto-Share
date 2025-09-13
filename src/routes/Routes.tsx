import MainLayout from "@/components/layout/MainLayout";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout/>,
		errorElement:<ErrorPage/>,
		children: [
			{
				path: '/',
				element:<HomePage/>
			},
			
		]
	},

]);







