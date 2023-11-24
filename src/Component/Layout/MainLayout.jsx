import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Navbar/Navbar";

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;