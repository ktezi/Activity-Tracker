import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Calendar from "react-calendar";
import './CardModal.css'
import "react-calendar/dist/Calendar.css";
function CardModal(props) {
  const [date, setDate] = useState(new Date());
  const [loadCalender, setLoadCalender] = useState(false);
  const [renderArray, updateRenderArray] = useState([]);

  const onChange = (date) => {
    let strDat = String(date[0]);
    let endDat = String(date[1]);
    let trimedStrDate;
    let trimedEndDate;
    let inputStartDate;
    let inputEndDate;
    if (strDat !== "" && endDat !== "") {
      trimedStrDate = strDat.split(" ");
      trimedEndDate = endDat.split(" ");
      inputStartDate =
        trimedStrDate[1] + " " + trimedStrDate[2] + " " + trimedStrDate[3];
      inputEndDate =
        trimedEndDate[1] + " " + trimedEndDate[2] + " " + trimedEndDate[3];
    }
    setDataArray(inputStartDate, inputEndDate);
    setLoadCalender(false);
  };

  const setDataArray = (inputStartDate, inputEndDate) => {
    const { activity_periods } = props.user;
    const selectedPeriod = activity_periods.filter((a) => {
      let p_strDat = String(a.start_time);
      let p_endDat = String(a.end_time);
      let p_activityStartDate, p_activityEndDate;
      const trimedStrDate = p_strDat.split(" ");
      const trimedEndDate = p_endDat.split(" ");
      p_activityStartDate =
        trimedStrDate[0] + " " + trimedStrDate[1] + " " + trimedStrDate[2];
      p_activityEndDate =
        trimedEndDate[0] + " " + trimedEndDate[1] + " " + trimedEndDate[2];
      if (
        inputStartDate <= p_activityStartDate &&
        p_activityEndDate <= inputEndDate
      ) {
        return true;
      } else {
        return false;
      }
    });
    updateRenderArray(selectedPeriod);
  };

  function handleSelect(val) {
    setLoadCalender(val);
  }

  useEffect(() => {
    let todaysDate;
    const str = String(date);
    if (str !== "") {
      let trimedDate = str.split(" ");
      todaysDate = trimedDate[1] + " " + trimedDate[2] + " " + trimedDate[3];
    }
    setDataArray(todaysDate, todaysDate);
    return () => {
      updateRenderArray([]);
    };
  }, []);

  const dataObj = () => {
    return renderArray.map((a, index) => {
      return (
        <div key={index}>
          <div><span className="start-time">Start Time </span>: {a.start_time}</div>
          <div><span className="end-time">End Time     </span>: {a.end_time}</div>
          <br></br>
        </div>
      );
    });
  };

  const modalText = ()=>{
    const text = loadCalender ?   'Hide Calender' : 'Select Range'
    return (
      <Button variant="secondary" size="sm" active onClick={()=> handleSelect(!loadCalender)}>
            {text}
          </Button>
    )
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable="true"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="modal-user-name" >{props.user.real_name}</div>
          {modalText()}
        </Modal.Title>
        {loadCalender ? (
          <Calendar id="modal-calendar" onChange={onChange} selectRange={true} closeButton={true} />
        ) : (
          ""
        )}
      </Modal.Header>
      <Modal.Body>
        <h4>Today's Activity</h4>
        <div>{dataObj()}</div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default CardModal;
