import React from 'react';
import { useState } from "react";
import CardModal from '../modal/CardModal';
import './UserCard.css'

function UserCard(props) {
  const [showModal, setModalShow] = useState(false);
  return (<div >
    <div className='user-card' onClick={() => setModalShow(true)}>
      {props.user.real_name}
    </div>
    {showModal ?
      <CardModal
        show={showModal}
        user={props.user}
        onHide={() => setModalShow(false)}
      />
      :
      null}
  </div>

  );
}

export default UserCard;