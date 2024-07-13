import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./services/AuthContext";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="755974647547-4hm4aj5a4rcvhp6644tnljffve50ttpg.apps.googleusercontent.com">
      <AuthProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <AppRoutes />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
