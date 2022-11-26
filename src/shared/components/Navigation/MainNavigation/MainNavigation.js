import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authAction } from "../../../store/auth";
import { useHttpClient } from "../../../hooks/http-hook";

import Button from "../../UI/Button/Button";
import SettingsIcon from "@mui/icons-material/Settings";

import "./MainNavigation.scss";

const MainNavigation = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const { sendRequest } = useHttpClient();
  window.onscroll = () => {
    setIsNavScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const logoutHandler = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/logout`,
        "POST",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      dispatch(authAction.logout());
    } catch (err) {}
  };
  return (
    <div className={`main-nav ${isNavScrolled && "scroll-active"}`}>
      <div className="nav-container">
        <div className="left">
          <Button to="/">
            <span className="logo">admin board</span>
          </Button>
        </div>
        <div className="right">
          {/* <div className="nav-i-container">
            <Notification className="i-nav" />
            <span className="i-badge">2</span>
          </div>
          <div className="nav-i-container">
            <Globe className="i-nav" />
            <span className="i-badge">2</span>
          </div> */}
          <div className="nav-i-container">
            {/* <Settings className="i-nav" /> */}
            <div className="nav-i__icon">
              <SettingsIcon />
            </div>
            <Button className="btn btn-icon" onClick={logoutHandler}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
