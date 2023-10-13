import React from 'react'
import useFetch from '../../hooks/useFetch'
import './Propertylist.css'

function Propertylist() {


  const { data, loading, error } = useFetch("/hotels/countByType")

  const images = [
    "https://www.tajhotels.com/content/dam/tajhotels/ihcl/vivanta/vivanta_sikkim_ihcl.jpg",
    "https://www.tajhotels.com/content/dam/tajhotels/ihcl/vivanta/vivanta_sikkim_ihcl.jpg",
    "https://www.tajhotels.com/content/dam/tajhotels/ihcl/vivanta/vivanta_sikkim_ihcl.jpg",
    "https://www.tajhotels.com/content/dam/tajhotels/ihcl/vivanta/vivanta_sikkim_ihcl.jpg",
    "https://www.tajhotels.com/content/dam/tajhotels/ihcl/vivanta/vivanta_sikkim_ihcl.jpg",
  ]

  return (
    <div className='pList'>
      {console.log("hai")}
      {loading ? ("Please wait loading") :
        <>
          {data && images.map((img, i) => (
            <div className='pListItem' key={i}>
              <img src={img} alt="" className='pListImg' />
              <div className='pListTitles'>
                <h1>{data[i]?.type}</h1>
                <h2>{data[i]?.count} {data[i]?.type}</h2>
              </div>
            </div>))}
        </>}
    </div>
  )
}

export default Propertylist