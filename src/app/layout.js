import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow px-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
