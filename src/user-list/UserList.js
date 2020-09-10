import React from "react";
import { useState, useEffect } from "react";
import users from "../services/users.api";
import UserCard from "../user-card/UserCard";
import "./UserList.css";
import { Spinner } from "react-bootstrap";

function UserList() {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const result = users.fetchUsers();
    result.then((result) => {
      setUserDetails(result);
    }).catch(err => {
      console.error(err)
    }).finally(()=>{
      setLoading(false);
    })
  }, []);   //this will run only once



  return (
    <div className="user-list-container">
      <div className="user-list-title">
        <h3>List of Users</h3>
      </div>
      {!loading ? (
       userDetails.members && userDetails.members.map((user, index) => {
          return <UserCard key={index} user={user} />;
        })
      ) : (
          <Spinner animation="grow" />
        )}
    </div>
  );
}

export default UserList;
