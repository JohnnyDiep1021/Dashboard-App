import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";

import Button from "../../shared/components/UI/Button/Button";

import "./UserList.scss";

const UserList = () => {
  const token = useSelector((state) => state.auth.token);
  const { sendRequest } = useHttpClient();
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchNewUser = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log(responseData.users);
      setUserData(responseData.users);
    };
    fetchNewUser();
  }, [sendRequest, token]);
  const columns = [
    { field: "id", headerName: "ID", width: 280 },
    {
      field: "fname",
      headerName: "First name",
      width: 200,
    },
    {
      field: "lname",
      headerName: "Last name",
      width: 200,
    },
    {
      field: "user",
      headerName: "Username",
      width: 300,
      renderCell: (params) => {
        // console.log(params.row.avatar);
        return (
          <div className="userList-user">
            <img
              src={
                params.row.profileImg.file ||
                `https://i.pinimg.com/originals/b4/0f/9f/b40f9f8fc0fb88aabf2a8acbc39c0ac0.png`
              }
              alt=""
              className="userList-img"
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 300 },

    // {
    //   field: "transaction",
    //   headerName: "Transaction Volume",
    //   width: 300,
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              className="btn-status "
              to={{ pathname: `/users/${params.row.id}`, user: params.row }}
              edit
            ></Button>
            <Button
              className="btn-status "
              onClick={() => {
                deleteHandler(params.row.id);
              }}
            >
              <DeleteOutline className="userList-delete-icon" />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const deleteHandler = async (id) => {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/users/${id}`,
      "DELETE",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(responseData.message);
    if (responseData.isDeleted) {
      setUserData((prevState) => prevState.filter((data) => data.id !== id));
    }
  };
  return (
    <div className="userList-container">
      {/* <div className="userList-table"> */}
      <DataGrid
        rows={userData}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        // autoHeight
        className="userList-table"
      />
    </div>
    // </div>
  );
};

export default UserList;
