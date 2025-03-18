import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { OperatorLayout } from "../layout/OperatorLayout";
import OperadorView from "../views/OperadorView";
import { OperadorAtivacao } from "../views/Senha/OperadorAtivacao";

const operatorPages = [
    {
        element: <ProtectedRoute userType="Operador" />,
        children: [{
            element: <OperatorLayout />,
            children: [{
                path: "/operador",
                element: <OperadorView />
            }]
        }]
    },
    {
        element: <OperadorAtivacao />,
        path: "/operador/ativacao/:passwordToken"
    }
];

export default operatorPages;