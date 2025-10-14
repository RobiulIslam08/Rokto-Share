import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { Toaster } from "sonner";
import { persistor, store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <Toaster 
      position="top-center"
        richColors
        closeButton
        
       />
    </Provider>
  </StrictMode>
);
