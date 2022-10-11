import React from 'react'
import '../styles/Maps.css'

const Maps = () => {
  let y = JSON.parse(localStorage.getItem('cityName'))

  return (
    <>
      <div className='mapdiv'>

        <iframe
          title="gmap"
          name="gMap"
          className="map"
          src={`https://maps.google.com/maps?q=${y}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          ></iframe>
          </div>
    </>
  )
}

export default Maps