import { Poppins } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Al Ghawali Agent",
  description: "Al Ghawali Agent",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={poppins.className}>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}