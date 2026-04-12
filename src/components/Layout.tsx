import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import GlobalBackground from "./GlobalBackground";
import CookieConsent from "./CookieConsent";

const Layout = () => (
  <div className="min-h-screen flex flex-col relative">
    <GlobalBackground />
    <Header />
    <main className="flex-1 relative z-10">
      <Outlet />
    </main>
    <Footer />
    <CookieConsent />
  </div>
);

export default Layout;
