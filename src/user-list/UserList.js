import React from "react";
import { useState, useEffect } from "react";
import users from "../services/users.api";
import UserCard from "../user-card/UserCard";
import "./UserList.css";
import { Spinner } from "react-bootstrap";

function UserList() {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const result = users.fetchUsers();
    result.then((result) => {
      setUserDetails(result);
      setLoading(true);
    });
  }, []);

  return (
    <div className="user-list-container">
      <div className="user-list-title">
        <h3>List of Users</h3>
      </div>
      {loading ? (
        Object.keys(userDetails).map((key) => {
          return Object.keys(userDetails[key]).map((index) => {
            return <UserCard key={index} user={userDetails[key][index]} />;
          });
        })
      ) : (
        <Spinner animation="grow" />
      )}
    </div>
  );
}

export default UserList;
