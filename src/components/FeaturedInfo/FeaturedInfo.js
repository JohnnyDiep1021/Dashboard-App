import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useHttpClient } from "../../shared/hooks/http-hook";

import LoadingSpinner from "../../shared/components/UI/Loading/LoadingSpinner";
import {
  ArrowDownward,
  ArrowUpwnward,
} from "../../shared/components/Icon/Icons";

import "./FeaturedInfo.scss";

const FeaturedInfo = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [registerStats, setRegisterStats] = useState([]);
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchRegisterStats = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/registerStats`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log(responseData);
      setRegisterStats(responseData.membershipStats);
    };
    fetchRegisterStats();
  }, [sendRequest, token]);
  return (
    <div className="feature-container">
      <div className="feature-item">
        <span className="feature-title">Total users</span>
        <div className="feature-money-container">
          {registerStats.length > 0 && (
            <span className="feature-money-value">
              {registerStats[0].total + registerStats[1].total}
            </span>
          )}
          {registerStats.length === 0 && <LoadingSpinner asOverlay />}

          {/* <span className="feature-money-value">$2,415</span>
          <span className="feature-money-rate">
            -11.4 <ArrowDownward className="feature-icon negative" />
          </span> */}
        </div>
        {/* <span className="feature-sub">Compared to last month</span> */}
      </div>
      <div className="feature-item">
        <span className="feature-title">Premium users</span>
        <div className="feature-money-container">
          {registerStats[1] && (
            <span className="feature-money-value">
              {registerStats[1].total}
            </span>
          )}
          {registerStats.length === 0 && <LoadingSpinner asOverlay />}

          {/* <span className="feature-money-value">$4,415</span>
          <span className="feature-money-rate">
            -1.4 <ArrowDownward className="feature-icon negative" />
          </span> */}
        </div>
        {/* <span className="feature-sub">Compared to last month</span> */}
      </div>
      <div className="feature-item">
        <span className="feature-title">Standard users</span>
        <div className="feature-money-container">
          {registerStats[0] && (
            <span className="feature-money-value">
              {registerStats[0].total}
            </span>
          )}
          {registerStats.length === 0 && <LoadingSpinner asOverlay />}

          {/* <span className="feature-money-value">$2,225</span>
          <span className="feature-money-rate">
            -2.4 <ArrowUpwnward className="feature-icon" />
          </span> */}
        </div>
        {/* <span className="feature-sub">Compared to last month</span> */}
      </div>
    </div>
  );
};

export default FeaturedInfo;
