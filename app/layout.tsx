"use client";
import LayoutThing from "@/components/LayoutThing";
import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-svg-background bg-cover bg-no-repeat">
        <nav className="">
          <LayoutThing />
          jii
        </nav>
        {children}
      </body>
    </html>
  );
}
