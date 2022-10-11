import React from 'react'
import '../styles/Box.css'

const Box = () => {
  let x = JSON.parse(localStorage.getItem('singleCity'))
  console.log('x:', x)
  let y = JSON.parse(localStorage.getItem('cityName'))
  // console.log('y:', y)
  return (
    <>
      <div className='mainBoxpopUp'>
        <h1>{y}</h1>
        <p className='temp'>Min Temp : {x.temp.day}</p>
        {/* <p  className='temp'>Day :   </p> */}
        <p  className='temp'>{new Date(`${x.dt}` * 1000).toLocaleDateString()} , {new Date(`${x.dt}` * 1000).toLocaleDateString("en", {weekday: "short",})} </p>
        <br />
        <table>
          <thead></thead>
          <tbody>
              <tr>
                 <td>Morning temp : {x.feels_like.morn}</td>
                 <td className='col'>Day Temp : {x.feels_like.day}</td>
              </tr>
              <tr>
                 <td>Evening Temp : {x.feels_like.eve}</td>
                 <td className='col'>Night Temp : {x.feels_like.night}</td>
              </tr>
          </tbody>
        </table>
        <br />
        <p className='temp'>Sunrise : {new Date(`${x.sunrise}`* 1000).toLocaleDateString()} || Sunset : {new Date(`${x.sunset}` * 1000).toLocaleDateString()}</p>
        <p className='temp'>Moonrise : {new Date(`${x.moonrise}` * 1000).toLocaleDateString()} || Moonset : {new Date(`${x.moonset}` * 1000).toLocaleDateString()} </p>
      </div>
    </>
  )
}

export default Box