import React from 'react';
import { useState, useEffect } from "react";
import users from '../services/users.api'
import UserCard from '../user-card/UserCard';
import './UserList.css';

function UserList() {
    const [hasError, setErrors] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    useEffect(() => {
        const result = users.fetchUsers();
        console.log('tezi', result)
        result
        .then(result => setUserDetails(result))
        .catch(err => setErrors(err));
    }, []
    );

    return (<div className="user-list-container">
      <div>
        <h3>List of Users</h3>
      </div>
      {Object.keys(userDetails).map((key) => {
          return(
            Object.keys(userDetails[key]).map((index) => {
                    // console.log(userDetails[key][index].id)
                  return (  <UserCard key={index} user={userDetails[key][index]}/> );
            }))
      })}
    </div>
    );
}

export default UserList;