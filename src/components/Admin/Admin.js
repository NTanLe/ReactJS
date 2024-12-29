import SideBar from "./Sidebar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import Language from "../Header/Language";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  console.log(`isAuthenticated: `, isAuthenticated)
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span onClick={() => setCollapsed(!collapsed)}>
            <FaBars className="leftside" />
          </span>
          <div className="rightside">
            <Language />
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item >Profile</NavDropdown.Item>
              <NavDropdown.Item >Logout</NavDropdown.Item>
            </NavDropdown>

          </div>
        </div>
        <div className="admin-main">
          {/* <PerfectScrollbar> */}
          <Outlet />
          {/* </PerfectScrollbar> */}
        </div>
      </div>

    </div>
  )
}
export default Admin;