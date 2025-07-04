import {Outlet} from "react-router-dom";
import Footer from "../footer/Footer.jsx";
import AdminHeader from "../adminHeader/adminHeader.jsx";

const AdminLayout = () => {
    return (
        <>
            <AdminHeader/>
            <Outlet/>
            <Footer/>
        </>
    )
}
export default AdminLayout
