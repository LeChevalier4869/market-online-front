import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { ProductContextProvider } from "./contexts/ProductContext.jsx";
import { AdminContextProvider } from "./contexts/AdminContext.jsx";
import { AddressContextProvider } from "./contexts/AddressContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdminContextProvider>
        <ProductContextProvider>
          <AddressContextProvider>
            <App />
          </AddressContextProvider>
        </ProductContextProvider>
      </AdminContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
