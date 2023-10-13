import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from "react";
import { SerachContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";

function Reserve({ setOpen, hotelId }) {
  console.log("hotelId", hotelId);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [select, setSelect] = useState([]);
  const { date } = useContext(SerachContext);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unAvailavableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    console.log("isFound", isFound);

    return !isFound;
  };

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];
    while (date <= end) {
      list.push(new Date(date));
      date.setDate(date.getTime() + 1);
    }
    return list;
  };

  const allDates = getDatesInRange(date[0].startDate, date[0].endDate);
  console.log("qqq", date[0].startDate, date[0].endDate);

  const handleSelect = (e) => {
    const selected = e.target.checked;
    const value = e.target.value;
    console.log("selected", selected, "value", value);

    setSelect(
      selected ? [...select, value] : select.filter((item) => item !== value)
    );
  };

  const handleSubmit = async () => {
    try {
      await Promise.all(
        select.map((roomId) => {
          const res = axios.put(`rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
    } catch (error) {}
  };

  //console.log("select", select);

  //console.log("chillu", data);
  return (
    <div className="reserve">
      <div className="container">
        <FontAwesomeIcon
          className="clos"
          onClick={() => setOpen(false)}
          icon={faCircleXmark}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="ritem">
            <div className="riteminfo">
              <div className="rtitle">{item.title}</div>
              <div className="rdesc">{item.desc}</div>
              <div className="rmax">
                <b>Max people:{item.maxpeople}</b>
              </div>
              <div className="rprice">₹{item.price}</div>
            </div>
            <div className="rselectedroom">
              {item.roomNumbers.map((room) => (
                <div className="room">
                  <label>{room.number}</label>
                  <input
                    type="checkbox"
                    value={room._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(room)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleSubmit} className="rbutton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
}

export default Reserve;
