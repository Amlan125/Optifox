import React from "react";
import { ThemeContextProvider } from "../context/ThemeContext";
import "./globals.css";
import AppBarComponent from "@/components/AppBarComponent";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>OptiFox</title>
      </head>
      <body>
        <ThemeContextProvider>
          <AppBarComponent />
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  );
};

export default Layout;
