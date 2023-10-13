import React, { useContext, useState } from 'react'
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns"
import { useNavigate } from "react-router-dom";
import { SerachContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

function Header({ type }) {
  const [openDate, setOpenDate] = useState(false)
  const [openOption, setOpenOption] = useState(false)
  const [destinatiuon, setDestination] = useState(" ")
  const navigate = useNavigate()
  const [date, setDate ] = useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }])
  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1
  })

  const {user} = useContext(AuthContext)

  const handleOption = (name, operation) => {
    setOptions(prev => {
      return {
        ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1
      }
    })
  }

  const {dispatch} = useContext(SerachContext)

  const handleSearch = () => {
    dispatch({type:"NEW_SERACH", payload:{destinatiuon,date,options }})
    navigate("/hotels", { state: { destinatiuon, date, options } })
  }




  return (
    <div className='header'>  
      <div className={type === "list" ? "headerContainer listmode" : "headerContainer"}>
        <div className='headerList'>
          <div className='headerListItem active'>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && <>
          <h1 className='headerTitle'>A lifetime discounts? it's Genius</h1>
          <p className='headerDecs'>Get rewardes for your travels - unlock instant savings of 10% or more with a bookingapp account</p>
          {!user && <button className='headerbtn'>Register/Login</button>}
          <div className='headerSearch'>
            <div className='headerSearchItem'>
              <FontAwesomeIcon icon={faBed} className="headerIcon" />
              <input type="text"
                placeholder='Where are you going ?'
                className='headerSearchInput'
                onChange={(e) => {
                  setDestination(e.target.value)
                }} />
            </div>
            <div className='headerSearchItem'>
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
              <span onClick={() => setOpenDate(!openDate)} className='headerSearchText '>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")} `}</span>
              {openDate && <DateRange
                editableDtaeInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
              />}
            </div>
            <div className='headerSearchItem'>
              <FontAwesomeIcon icon={faPerson} className="headerIcon" />
              <span onClick={() => setOpenOption(!openOption)} className='headerSearchText'>{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
              {openOption && <div className='options'>
                <div className='optionItem'>
                  <span className='optionText'>Adult</span>
                  <div className='optionCounter'>
                    <button disabled={options.adult <= 1} className='optionCountrButton' onClick={() => handleOption("adult", "d")}>-</button>
                    <span className='optionCounterNumver'>{options.adult}</span>
                    <button className='optionCountrButton' onClick={() => handleOption("adult", "i")}>+</button>
                  </div>
                </div>
                <div className='optionItem'>
                  <span className='optionText'>Children</span>
                  <div className='optionCounter'>
                    <button disabled={options.children <= 0} className='optionCountrButton' onClick={() => handleOption("children", "d")}>-</button>
                    <span className='optionCounterNumver'>{options.children}</span>
                    <button className='optionCountrButton' onClick={() => handleOption("children", "i")}>+</button>
                  </div>
                </div>
                <div className='optionItem'>
                  <span className='optionText'>Room</span>
                  <div className='optionCounter'>
                    <button disabled={options.room <= 1} className='optionCountrButton' onClick={() => handleOption("room", "d")}>-</button>
                    <span className='optionCounterNumver'>{options.room}</span>
                    <button className='optionCountrButton' onClick={() => handleOption("room", "i")}>+</button>
                  </div>
                </div>
              </div>}
            </div>
            <div className='headerSearchItem'>
              <button className='headerbtn' onClick={handleSearch}>Search</button>
            </div>
          </div>
        </>
        }
      </div>
    </div>
  )
}

export default Header