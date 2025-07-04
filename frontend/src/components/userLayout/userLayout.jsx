import {Outlet} from "react-router-dom";
import Footer from "../footer/Footer.jsx";
import UserHeader from "../userHeader/UserHeader.jsx";

const UserLayout = () => {
    return (
        <>
            <UserHeader/>
            <Outlet/>
            <Footer/>
        </>
    )
}
export default UserLayout
