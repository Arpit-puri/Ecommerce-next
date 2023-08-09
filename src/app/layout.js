import "./globals.css";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";
import { Mulish } from "next/font/google";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/auth";
import "antd/dist/reset.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "ChronoCraze",
};

const mulish = Mulish({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={mulish.className}>
      <AuthProvider>
        <body>
          <Header />
          <div className="screen"> {children} </div>
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
