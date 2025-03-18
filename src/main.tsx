import "./styles/global.css";

import dayjs from "dayjs";
import locale_pt from "dayjs/locale/pt-br";
import advancedFormat from "dayjs/plugin/advancedFormat";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

dayjs.extend(advancedFormat).locale(locale_pt);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  // </React.StrictMode>,
)
