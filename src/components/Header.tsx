import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AppState } from "../store";
import { logoutUser } from "../store/actions/userLoginActions";

const HeaderDiv = styled.div`
  width: 100%;
  margin: auto;
  padding: 10px 30px 10px 30px;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  background-color: black;
  color: white;

  .title {
    font-size: 24px;
  }

  .links {
    color: white;
    margin-top: 10px;
    margin-right: 10px;
    font-size: 18px;

    .link-item {
      margin-right: 10px;
      margin-top: 10px;
      padding: 5px;
      border: 1px solid black;
      border-radius: 10px;
      color: white;

      a {
        text-decoration: none;
        color: white;
        background-color: black;
      }
    }

    .is-Active {
      text-decoration: underline;
      color: white;
      background-color: black;
    }
  }
`;

const Header: React.FC = (): React.ReactElement => {
  const { userData, userDataHasError, userDataError } = useSelector(
    (state: AppState) => ({
      userData: state.user.userData,
      userDataError: state.user.error,
      userDataHasError: state.user.hasError
    })
  );
  const dispatch = useDispatch();

  return (
    <HeaderDiv>
      <span className="title">Charging Points App</span>
      <div className="links">
        <NavLink exact activeClassName="is-Active" className="link-item" to="/">
          Welcome
          {userData
            ? `, ${userData.firstName} ${userData.lastName}`
            : ", Guest"}
        </NavLink>

        <NavLink
          exact
          activeClassName="is-Active"
          className="link-item"
          to="/map"
        >
          Map
        </NavLink>

        {!userData && (
          <NavLink
            exact
            activeClassName="is-Active"
            className="link-item"
            to="/login"
          >
            Login
          </NavLink>
        )}
        {userData && (
          <a onClick={() => dispatch(logoutUser())} className="link-item">
            Logout
          </a>
        )}
        {userDataHasError && <a>{userDataError}</a>}
      </div>
    </HeaderDiv>
  );
};

export default Header;
