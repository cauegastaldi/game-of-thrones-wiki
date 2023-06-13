import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layouts/Layout";
import ErrorPage from "./ErrorPage";
import HomePage from "./Pages/HomePage";
import CharactersPage from "./Pages/CharactersPage";
import FamiliesPage from "./Pages/FamiliesPage";
import FamilyModalForm from "./Components/ModalForm/FamilyModalForm";
import { findOneFamily } from "./Api/Services/FamilyService";
import { findOneCharacter } from "./Api/Services/CharacterService";
import CharacterModalForm from "./Components/ModalForm/CharacterModalForm";

const Router = createBrowserRouter([
	{
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "familias",
				element: <FamiliesPage />,
				children: [
					{
						path: "add",
						element: <FamilyModalForm isOpen={true} />,
					},
					{
						path: "edit/:id",
						element: <FamilyModalForm isOpen={true} />,
						loader: async ({ params }) => {
							return findOneFamily(params.id);
						},
					},
				],
			},
			{
				path: "personagens",
				element: <CharactersPage />,
				children: [
					{
						path: "add",
						element: <CharacterModalForm isOpen={true} />,
					},
					{
						path: "edit/:id",
						element: <CharacterModalForm isOpen={true} />,
						loader: async ({ params }) => {
							return findOneCharacter(params.id);
						},
					},
				],
			},
		],
	},
]);

export default Router;
