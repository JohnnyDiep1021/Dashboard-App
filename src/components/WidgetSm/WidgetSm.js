import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useSelector } from "react-redux";

import Paginator from "../../shared/components/UI/Paginator/Paginator";
import Button from "../../shared/components/UI/Button/Button";
import LoadingSpinner from "../../shared/components/UI/Loading/LoadingSpinner";

import { Visibility } from "@mui/icons-material";

import "./WidgetSm.scss";

const WidgetSm = () => {
  const token = useSelector((state) => state.auth.token);
  const [newUsers, setNewUsers] = useState([]);
  const [userPage, setUserPage] = useState(1);
  const [totalUser, setTotalUser] = useState(0);
  const { isLoading, sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchNewUser = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users?page=`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log(responseData.users);
      setNewUsers(responseData.users);
      setTotalUser(responseData.totalUsers);
    };
    fetchNewUser();
  }, [sendRequest, token]);
  const loadUserHandler = async (direction) => {
    let page = userPage;
    if (direction === "next") {
      page++;
      setUserPage(page);
    }
    if (direction === "previous") {
      page--;
      setUserPage(page);
    }
    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/users?page=${page}`,
      "GET",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    setNewUsers(responseData.users);
  };
  return (
    <div className="widgetSm-container">
      <span className="widgetSm-title">New Join Members</span>
      <ul className="widgetSm-list">
        {!isLoading && newUsers && (
          <Paginator
            onPrevious={() => {
              loadUserHandler("previous");
            }}
            onNext={() => {
              loadUserHandler("next");
            }}
            lastPage={Math.ceil(totalUser / 5)}
            currentPage={userPage}
          >
            {newUsers.map((newUser) => (
              <li className="widgetSm-list-item" key={newUser._id}>
                <img
                  src={
                    newUser.profileImg.file ||
                    `https://i.pinimg.com/originals/b4/0f/9f/b40f9f8fc0fb88aabf2a8acbc39c0ac0.png`
                  }
                  alt=""
                  className="widgetSm-img"
                />
                <div className="widgetSm-user">
                  <span className="widgetSm-username">{newUser.username}</span>
                  <span className="widgetSm-usertitle">Web Developer</span>
                </div>
                <Button className="widgetSm-btn">
                  <Visibility className="widgetSm-btn-icon" />
                  Display
                </Button>
              </li>
            ))}
          </Paginator>
        )}
        {isLoading && <LoadingSpinner asOverlay />}
      </ul>
    </div>
  );
};

export default WidgetSm;
