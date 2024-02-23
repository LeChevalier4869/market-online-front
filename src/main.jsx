import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { ProductContextProvider } from "./contexts/ProductContext.jsx";
import { AdminContextProvider } from "./contexts/AdminContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdminContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </AdminContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
