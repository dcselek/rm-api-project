import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.scss";
import MainLayout from "./Layout/mainLayout";
import StoreProvider from "./StoreProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Rick and Morty Dcselek",
  description: "Rick and Morty Dcselek",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StoreProvider>
          <MainLayout>{children}</MainLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
