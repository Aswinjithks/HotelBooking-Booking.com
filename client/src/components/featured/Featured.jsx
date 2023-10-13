import React from 'react'
import useFetch from '../../hooks/useFetch.js'
import './featured.css'



function Featured() {

  const { data, error, loading } = useFetch("/hotels/countByCity?cities=calicut,Kochi,Mumbai")

  return (
    <div className='featured'>
      {loading ? ("Loading please wait") : <><div className='featuredItem'>
        <img src="https://23c133e0c1637be1e07d-be55c16c6d91e6ac40d594f7e280b390.ssl.cf1.rackcdn.com/u/gpch/Park-Hotel-Group---Explore---Grand-Park-City-Hall-Facade.jpg" alt="" className='featuredImg' />
        <div className='featuredTitles '>
          <h1>Calicut</h1>
          <h2>{data[0]} properties </h2>
        </div>
      </div>
        <div className='featuredItem'>
          <img src="https://23c133e0c1637be1e07d-be55c16c6d91e6ac40d594f7e280b390.ssl.cf1.rackcdn.com/u/gpch/Park-Hotel-Group---Explore---Grand-Park-City-Hall-Facade.jpg" alt="" className='featuredImg' />
          <div className='featuredTitles '>
            <h1>kochi</h1>
            <h2>{data[1]} properties </h2>
          </div>
        </div>
        <div className='featuredItem'>
          <img src="https://23c133e0c1637be1e07d-be55c16c6d91e6ac40d594f7e280b390.ssl.cf1.rackcdn.com/u/gpch/Park-Hotel-Group---Explore---Grand-Park-City-Hall-Facade.jpg" alt="" className='featuredImg' />
          <div className='featuredTitles '>
            <h1>mumbai</h1>
            <h2>{[data[2]]} properties </h2>
          </div>
        </div>
        </>
        }

    </div>
  )
}

export default Featured 