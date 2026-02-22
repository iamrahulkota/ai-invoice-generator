import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

export default function RootLayout() {
  return (
    <div className="container relative mx-auto">
      <div className="border-border border-dashed sm:border-x">
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
      </div>
    </div>
  );
}
