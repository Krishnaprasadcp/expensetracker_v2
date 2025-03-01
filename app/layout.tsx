"use client";
import LayoutThing from "@/components/LayoutThing";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import RestoreSession from "@/components/RestoreSession";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-svg-background bg-cover bg-no-repeat min-h-screen">
        <Provider store={store}>
          <RestoreSession />
          <nav className="">
            <LayoutThing />
          </nav>
          {children}
        </Provider>
      </body>
    </html>
  );
}
