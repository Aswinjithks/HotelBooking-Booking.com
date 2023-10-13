import React from "react";
import { Link } from "react-router-dom";
import "./SearchItem.css";

function SearchItem({ item }) {
  return (
    <div className="serachItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}</span>
        <span className="siTaxiOp"> Free airport taxi</span>
        <span className="siSubTitle">
          Studio appartment with Air Condintioning
        </span>
        <span className="siFeatures"> {item.distance}</span>
        <span className="siCancelOp">Free cancelation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later,so lock this price today
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excelent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">₹ {item.cheapestPrice}</span>
          <span className="siTaxOp">Incl all tax</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See avilability</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
