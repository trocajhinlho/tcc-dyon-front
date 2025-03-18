import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import NovoEvento from "../views/NovoEvento";

const organizationPages = {
    element: <ProtectedRoute userType={"Instituicao"} />,
    children: [
        {
            path: "/novo-evento",
            element: <NovoEvento />
        }
    ]
};

export default organizationPages;