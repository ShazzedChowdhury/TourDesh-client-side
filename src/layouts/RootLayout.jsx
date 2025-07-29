import { Outlet } from "react-router";
import Header from "../components/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="bg-[#111827]">
        <Footer />
      </footer>
    </>
  );
};

export default RootLayout;
