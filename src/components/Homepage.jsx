import React, { useRef } from 'react'
import '../styles/Homepage.css'
import logo from '../images/location.png'
import axios from 'axios'
import { useState } from 'react'
import Modal from 'react-modal'
import PopupBox from './Box'
import Map from './Maps'
import Chart from "react-apexcharts";
import { useEffect } from 'react'


  const Homepage = () => {



    const [cities, setCities] = useState([])
    const [weather, setWeather] = useState([])
    const [display, setDisplay] = useState(true)
    const [cityName, setCityName] = useState('')
    const [modal, setModal] = useState(false);

    const array = useRef([])
    
    
    const ShowCity = () => {
      axios
      .get(" https://ipinfo.io/json?token=52ed0181817dc8")
      .then((response) => {
        setCityName(response.data.city)
        WeatherFetch(response.data.city)
        localStorage.setItem('cityName', JSON.stringify(response.data.city))
      })
    }
    
    useEffect(()=>{
      ShowCity()
    },[])




    const WeatherFetch = (name) => {
      let lon; 
      let lat;
      

      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&cnt=7&appid=d07f44f393d328ed6b9bd3de4e36c2f8&units=metric`).then((res)=>{
        lon = res.data.city.coord.lon
        lat = res.data.city.coord.lat
        
       
      }).catch((error)=>{
        console.log('error:', error)
      })



    
      setTimeout(()=>{
        sevenDays(lat, lon)
      },500)
      
      
      



    }
   
    const sevenDays = (lat, lon) => {
      



      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=d07f44f393d328ed6b9bd3de4e36c2f8&units=metric`).then((res)=>{
        setWeather(res.data.daily)
     
        let x = res.data.daily[0].feels_like

      array.current =  Object.values(x)


      }).catch((error)=>{
      console.log('error:', error)

      })
    }


    const citiesFetch = (e) => {
      const {value} = e.target

      if(value.length !== 0){
        setDisplay(false)
        
        axios.get(`https://list-of-cities.herokuapp.com/cities`).then(({data})=>{
          
          let arr = data.filter((post) =>
          post.city.toLowerCase().includes(value)
            );
  
            setCities([...arr])
          }).catch((error)=>{
            console.log('error:', error)
          })
        }
        else{
        
            setDisplay(true)
          }
    }
        
        const fetchWeather = (ele) => {
          setDisplay(true)
          WeatherFetch(ele.city)
          setCityName(ele.city)
          localStorage.setItem('cityName', JSON.stringify(ele.city))
    }
   
    const Popup = (data) => {

      let day = Object.values(data.feels_like)

      Array.current = day
      
      
      setModal(true)
      localStorage.setItem('singleCity', JSON.stringify(data))

     
    }

    

  return (
    <>
      <div className='mainBox'>
          <div className='logoinp'>
            <img src={logo} alt=""  className='logo'/>
            <input type="text" className='inpSearchBox' onChange={
              citiesFetch
            } />
          </div>
          <div className='outputBox' style={{display: display ? "none" : 'block' }}>
            {cities.map((e,i) => {
              return(
                <div key={i} className='cityBoxSingle'  onClick={()=>{fetchWeather(e)}} >
                  <span className='city'>{e.city}</span>, <span className='state'>{e.state}</span>
                </div>
              )
            })}
          </div>
      </div>
      
     
     <div>

      
        <h2 style={{textAlign:'center', marginTop:'-10px'}}>{cityName}</h2>
      <div className='outWeatherBox'>
          {weather.map((data, i)=>{
           
            return(
              <div key={i} className='singleweather' onClick={()=>{
                Popup(data)
              }}>
                  <h3  style={{margin:'0px'}}>{new Date(`${data.dt}` * 1000).toLocaleDateString("en", {weekday: "short",})}</h3>
                  <p style={{margin:'0px'}}>{data.weather[0].main}</p>
                  <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="" className='cloudImg' />
                 
                  
                  <p className='temp'>{data.temp.min} °</p>
                   <h4 className='temp'>{data.temp.max} °</h4>
              </div>
            )
          })}
      </div>
          </div>

  
          
    
    <div className="App">
      <Modal className='modalBox' modal={modal} onRequestClose={() => setModal(false)}>
          <PopupBox/>
        <button class="button-38" onClick={() => setModal(false)}>Close Modal</button>
      </Modal>
    </div>

    {/* ------------------------------------------------------------------------------------------ */}


  <div>


    <div className='mapGraphBox'>
      <div>
      <Map />
      </div>
      <div>

      <Chart id='chartData'
          type="area"
          series={[
            {
              name: "Temperature",
              data: [...array.current],
            },
          ]}
          options={{
            dataLabels: {
              formatter: (val) => {
              },
            },
            yaxis: {
              labels: {
                formatter: (val) => {
                  return `${Math.ceil(25)}℃`;
                },
              },
            },
            xaxis: {
              categories: ["12:00am", "6:00am", "12:00pm", "6:00pm"],
            },
          }}
        />
        </div>
      </div>

            </div>
     
     

  

    </>


              
  )
}

export default Homepage;