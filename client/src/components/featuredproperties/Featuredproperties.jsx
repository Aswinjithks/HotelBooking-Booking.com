import React from 'react'
import useFetch from '../../hooks/useFetch'
import './featuredproperties.css'

function Featuredproperties() {

const {data,loading,error} = useFetch("/hotels?featured=true&limit=4")

    return (
        <div className='fp'>
            {loading ? "Loading" : <>
          {data.map(item=>(<div className='fpItem' key={item._id}>
                <img src="https://media.timeout.com/images/105938335/image.jpg" alt="" className='fpImg' />
                <span className='fpName'>{item.name}</span>
                <span className='fpCity'>{item.city}</span>
                <span className='fpPrice'>Starting from Rs {item.cheapestPrice}/-</span>
                {item.rating &&  <div className='fpRating'>
                    <button>{item.rating}</button>
                    <span>Excelent</span>
                </div>}
            </div>))}
            </>} 
        </div>
    )
}

export default Featuredproperties