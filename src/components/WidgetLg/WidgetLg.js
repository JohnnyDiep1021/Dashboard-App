import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useHttpClient } from "../../shared/hooks/http-hook";

import Paginator from "../../shared/components/UI/Paginator/Paginator";
import LoadingSpinner from "../../shared/components/UI/Loading/LoadingSpinner";
import Button from "../../shared/components/UI/Button/Button";

import "./WidgetLg.scss";

const WidgetLg = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [userAccount, setUserAccount] = useState([]);
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
      setUserAccount(responseData.users);
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
    setUserAccount(responseData.users);
  };
  return (
    <div className="widgetLg-container">
      {/* <h3 className="widgetLg-title">Latest transaction</h3> */}
      <h3 className="widgetLg-title">Account registration</h3>
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
        <table className="widgetLg-table">
          <thead>
            <tr className="widgetLg-row">
              <th className="widgetLg-header">Customer</th>
              <th className="widgetLg-header">Date</th>
              {/* <th className="widgetLg-header">Amount</th> */}
              <th className="widgetLg-header">Membership</th>
              <th className="widgetLg-header">Status</th>
            </tr>
          </thead>
          <tbody>
            {userAccount.length > 0 &&
              userAccount.map((user) => (
                <tr className="widgetLg-row" key={user.id}>
                  <td className="widgetLg-user">
                    <img
                      src={
                        user.profileImg.file ||
                        `https://i.pinimg.com/originals/b4/0f/9f/b40f9f8fc0fb88aabf2a8acbc39c0ac0.png`
                      }
                      alt=""
                      className="widgetLg-img"
                    />
                    <span className="widgetLg-name">{user.username}</span>
                  </td>
                  <td className="widgetLg-date">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="widgetLg-amount">{user.membership}</td>
                  <td className="widgetLg-status-btn">
                    <Button className="btn-status" approved></Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isLoading && <LoadingSpinner asOverlay />}
      </Paginator>
    </div>
  );
};

export default WidgetLg;
