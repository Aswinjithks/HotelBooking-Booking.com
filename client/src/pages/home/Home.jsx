import React from 'react'
import Featured from '../../components/featured/Featured'
import Featuredproperties from '../../components/featuredproperties/Featuredproperties'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/maillist/MailList'
import Navbar from '../../components/navbar/Navbar'
import Propertylist from '../../components/propertylist/Propertylist'
import "./home.css"

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className='homeContainer'>
        <Featured />
        <h1 className='homeTitle'>Browse by property type</h1>
        <Propertylist />
        <h1 className='homeTitle'>Home gustes love</h1>
        <Featuredproperties />
        <MailList/>
        <Footer/>
      </div>
    </div>

  )
}

export default Home