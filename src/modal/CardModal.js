import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Calendar from "react-calendar";
import "./CardModal.css";
import "react-calendar/dist/Calendar.css";
function CardModal(props) {
  const [date] = useState(new Date());
  const [currentDate, setCurrentDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndData] = useState('')
  const [isDayToday, setIsDayToday] = useState(false)
  const [loadCalender, setLoadCalender] = useState(false);
  const [renderArray, updateRenderArray] = useState([]);

  useEffect(() => {
    let todaysDate;
    const str = String(date);
    if (str !== "") {
      let trimedDate = str.split(" ");
      todaysDate = trimedDate[1] + " " + trimedDate[2] + " " + trimedDate[3];
    }
    setCurrentDate(todaysDate)
    setIsDayToday(true)
    setDataArray(todaysDate, todaysDate);
    return () => {
      updateRenderArray([]);   //this will reset the renderArray after the componet unmounts
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  // this will run only once after render method. this is equivalent as componentDidMount lifecycle



  //this method will be called after start time and end time, both selected on calender
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
        trimedStrDate[1] + " " + trimedStrDate[2] + " " + trimedStrDate[3];     //formatting the  date to correct format
      inputEndDate =
        trimedEndDate[1] + " " + trimedEndDate[2] + " " + trimedEndDate[3];     //formatting the  date to correct format
    }
    if (inputStartDate === inputEndDate && inputEndDate === currentDate) {
      setIsDayToday(true)
    }
    else {
      setIsDayToday(false)
    }
    setStartDate(inputStartDate)
    setEndData(inputEndDate)
    setDataArray(inputStartDate, inputEndDate);     //this method will update the data for given range 
    setLoadCalender(false);                    //hiding calendar after selection
  };


  //this method filter the data from given data(api) for selected range
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


  const dataObj = () => {
    if (!renderArray.length) {
      if (isDayToday) {
        return 'No Activity Today'
      } else {
        return 'No Activity'
      }
    }
    return renderArray.map((date, index) => {
      return (
        <div key={index}>
          <div>
            <span className="start-time">Start Time </span>: {date.start_time}
          </div>
          <div>
            <span className="end-time">End Time </span>: {date.end_time}
          </div>
          <br></br>
        </div>
      );
    });
  };


  const modalText = () => {
    const text = loadCalender ? "Hide Calender" : "Select Range";
    return (
      <Button
        variant="secondary"
        size="sm"
        active
        onClick={() => setLoadCalender(!loadCalender)}
      >
        {text}
      </Button>
    );
  };


  const selectedDate = () => {
    let sDate = isDayToday ? currentDate : startDate;
    let sEndDate = isDayToday ? currentDate : endDate;
    return (
      <table>
        <tbody>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </tbody>
        <tbody>

          <tr>
            <td>{sDate}</td>
            <td>{sEndDate}</td>
          </tr>
        </tbody>

      </table>
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
          <div className="modal-user-name">{props.user.real_name}</div>
          {modalText()}
        </Modal.Title>
        {loadCalender ? (
          <Calendar
            id="modal-calendar"
            onChange={onChange}
            selectRange={true}
            closeButton={true}
          />
        ) :
          selectedDate()
        }
      </Modal.Header>
      <Modal.Body>
        <h4>{isDayToday ? `Today's Activity` : 'Activity in Selected Dates'}</h4>
        <div>{dataObj()}</div>
      </Modal.Body>
    </Modal>
  );
}

export default CardModal;
