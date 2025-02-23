"use client";
import LayoutThing from "@/components/LayoutThing";
import "./globals.css";
import StoreProvider from "./storeProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-svg-background bg-cover bg-no-repeat min-h-screen">
        <StoreProvider>
          <nav className="">
            <LayoutThing />
          </nav>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
