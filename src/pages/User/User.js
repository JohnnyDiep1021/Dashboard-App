import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { useForm } from "../../shared/hooks/form-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ImageUpload from "../../shared/components/UI/Upload/ImageUpload";
import Input from "../../shared/components/UI/Input/Input";
import Button from "../../shared/components/UI/Button/Button";

import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  AddCircle,
} from "@mui/icons-material";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import {
  BIO_MAXLENGTH,
  EMAIL_MAXLENGTH,
  EMAIL_MINLENGTH,
  NAME_MAXLENGTH,
  USERNAME_MAXLENGTH,
  USERNAME_MINLENGTH,
} from "../../shared/util/util";

import "./User.scss";

const User = (props) => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const user = useLocation().user;
  const { sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: user.username,
        isValid: true,
      },
      fname: {
        value: user.fname,
        isValid: true,
      },
      lname: {
        value: user.lname,
        isValid: true,
      },
      email: {
        value: user.email,
        isValid: true,
      },
      membership: {
        value: user.membership,
        isValid: true,
      },
      bio: {
        value: user.bio,
        isValid: true,
      },
      profileImg: {
        value: {
          file: user.profileImg.file,
          fileRef: user.profileImg.fileRef,
        },
        isValid: true,
      },
    },
    true
  );
  const submitUpdateHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${user.id}`,
        "PATCH",
        JSON.stringify({
          id: user.id,
          email: formState.inputs.email.value,
          username: formState.inputs.username.value,
          fname: formState.inputs.fname.value,
          lname: formState.inputs.lname.value,
          bio: formState.inputs.bio.value,
          profileImg: {
            file: formState.inputs.profileImg.value.file,
            fileRef: formState.inputs.profileImg.value.fileRef,
          },
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log(updatedProfile);
      history.push("/users");
    } catch (error) {}
  };
  return (
    <div className="user-container">
      <div className="user-title-container">
        <h1 className="user-title">User Information</h1>
        <Button className="user-btn-add" to="/newUser">
          Create
        </Button>
      </div>
      <div className="user-control-container">
        {/* <div className="user-show-container">
          <div className="user-show-top">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="user-show-img"
            />
            <div className="user-show-info">
              <span className="user-show-username">Johnny Diep</span>
              <span className="user-show-title">Software Engineer</span>
            </div>
          </div>
          <div className="user-show-bottom">
            <span className="user-show-title">Account Details</span>
            <div className="user-show-info">
              <PermIdentity className="user-show-icon" />
              <span className="user-show-info-title">johnny1121</span>
            </div>
            <div className="user-show-info">
              <CalendarToday className="user-show-icon" />
              <span className="user-show-info-title">10.12.1999</span>
            </div>
            <span className="user-show-title">Contact Details</span>

            <div className="user-show-info">
              <PhoneAndroid className="user-show-icon" />
              <span className="user-show-info-title">+1 123 456 67</span>
            </div>
            <div className="user-show-info">
              <MailOutline className="user-show-icon" />
              <span className="user-show-info-title">johnny1121@gmail.com</span>
            </div>
            <div className="user-show-info">
              <LocationSearching className="user-show-icon" />
              <span className="user-show-info-title">New York | USA</span>
            </div>
          </div>
        </div> */}
        <div className="user-update-container">
          <span className="user-update-title">Account info</span>
          <form className="user-update-form" onSubmit={submitUpdateHandler}>
            <div className="inputUpdateForm-container">
              <div className="left">
                <div className="user-update-item">
                  <Input
                    id="username"
                    element="input"
                    label="Username"
                    type="text"
                    validators={[
                      VALIDATOR_MINLENGTH(USERNAME_MINLENGTH),
                      VALIDATOR_MAXLENGTH(USERNAME_MAXLENGTH),
                    ]}
                    errorText="6-36 character(s)"
                    onInput={inputHandler}
                    initialValue={formState.inputs.username.value}
                    initialValid={formState.inputs.username.isValid}
                  />
                </div>
                <div className="user-update-item">
                  <Input
                    id="fname"
                    element="input"
                    label="First name"
                    type="text"
                    validators={[VALIDATOR_MAXLENGTH(NAME_MAXLENGTH)]}
                    errorText="only 64 character(s)"
                    onInput={inputHandler}
                    initialValue={formState.inputs.fname.value}
                    initialValid={formState.inputs.fname.isValid}
                  />
                </div>
                <div className="user-update-item">
                  <Input
                    id="lname"
                    element="input"
                    label="Last name"
                    type="text"
                    validators={[VALIDATOR_MAXLENGTH(NAME_MAXLENGTH)]}
                    errorText="only 64 character(s)"
                    onInput={inputHandler}
                    initialValue={formState.inputs.lname.value}
                    initialValid={formState.inputs.lname.isValid}
                  />
                </div>
                <div className="user-update-item">
                  <Input
                    id="email"
                    element="input"
                    label="Email"
                    type="text"
                    validators={[
                      VALIDATOR_EMAIL(),
                      VALIDATOR_MINLENGTH(EMAIL_MINLENGTH),
                      VALIDATOR_MAXLENGTH(EMAIL_MAXLENGTH),
                    ]}
                    errorText="include '@' (3-60 characters)"
                    onInput={inputHandler}
                    initialValue={formState.inputs.email.value}
                    initialValid={formState.inputs.email.isValid}
                  />
                </div>
                <div className="user-update-item">
                  <Input
                    id="bio"
                    label="Biography"
                    validators={[VALIDATOR_MAXLENGTH(BIO_MAXLENGTH)]}
                    errorText="Only 256 character(s)"
                    onInput={inputHandler}
                    initialValue={formState.inputs.bio.value}
                    initialValid={formState.inputs.bio.isValid}
                  />
                </div>
                <div className="user-update-item">
                  <Input
                    element="select"
                    id="membership"
                    label="Membership"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="wwhat type of membership?"
                    onInput={inputHandler}
                    initialValue={formState.inputs.membership.value}
                    initialValid={formState.inputs.membership.isValid}
                  >
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </Input>
                </div>
              </div>
              <div className="right">
                <ImageUpload
                  imageFile
                  userUpload
                  title={formState.inputs.username.value}
                  id="profileImg"
                  label="Profile Image"
                  fileLabel="Profile Image"
                  src={formState.inputs.profileImg.value.file}
                  filePath={formState.inputs.profileImg.value.fileRef}
                  accept=".jpg,.png,.jpeg,.webp,.svg"
                  errorText="Profile image is required!"
                  ImgFileStyle={{ height: "350px" }}
                  onInput={inputHandler}
                  center
                />
              </div>
            </div>
            <Button
              type="submit"
              className="btn btn-update"
              disabled={!formState.isValid}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
