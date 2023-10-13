import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleChevronRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/maillist/MailList";
import Navbar from "../../components/navbar/Navbar";
import Reserve from "../../components/reserve/Reserve";
import { AuthContext } from "../../context/AuthContext";
import { SerachContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./hotel.css";

function Hotel() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { loading, error, data } = useFetch(`/hotels/find/${id}`);
  console.log("hoteldata", data);

  const { date, options } = useContext(SerachContext);
  //console.log("context",date[0].endDate);
  const MILLISECONSD_PER_DAY = 1000 * 60 * 60 * 24;

  const dayDiffrence = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    console.log("timeDiff", timeDiff);
    const diffDays = Math.ceil(timeDiff / MILLISECONSD_PER_DAY);
    return diffDays;
  };

  const days = dayDiffrence(date[0].endDate, date[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const { user } = useContext(AuthContext);
  const handleClick = () => {
    setOpenModal(true);
    // if (user) {
    //   setOpenModal(true);
    // } else {
    //   navigate("/login");
    // }
  };

  const handleMove = (direction) => {
    let newSliderNumber;

    if (direction === "l") {
      newSliderNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSliderNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSliderNumber);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="slideWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWraper">
            <button className="bookNow" onClick={handleClick}>
              Reserve or Book now!
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Exelent location {data.distance}m from center
            </span>
            <span className="hotelPriceHighLight">
              Book a room for ₹ {data.cheapestPrice} and get free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper">
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>{data.title}</h1>
                <span>{data.desc}</span>
                <h2>
                  <b>₹ {days * data.cheapestPrice * options.room}</b>(for {days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or BookNow!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  );
}

export default Hotel;
