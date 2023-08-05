
import "./App.css"
import Map, { Marker, Popup } from 'react-map-gl';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios"


import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from "react";
// import { useState } from "react";

// const MAPBOX_TOKEN = ''; // Set your mapbox token here

function App() {

  // const [showPopup,setShowPopup]= useState(true)
  // console.log("**",showPopup)
  const [pins, setPins] = useState([])

  useEffect(() => {

    //get all pins from database
    const getPins = async () => {
      try {
        const res = await axios.get('/pins')
        setPins(res.data)


      }
      catch (err) { console.log(err) }
    }
    getPins()

  }, [])
   
   

  return (
    <Map
      initialViewState={{
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14
      }}
      style={{ width: "80vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    >


      {pins && pins.map(pin => (
        <div div key={pin._id}>
          <Marker longitude={pin.longitude} latitude={pin.latitude} color="red" />

          <Popup longitude={pin.longitude} latitude={pin.latitude}
            anchor="top-left" closeButton={true} closeOnClick={false}

          >
            <div className="card">
              <label htmlFor="">Place</label>
              <h2 className='place'>{pin.title}</h2>
              <label htmlFor="">Review</label>
              <p className='desc'>{pin.description}</p>
              <label htmlFor="">Rating</label>
              <div className='stars'>
               
                <StarIcon className='stars' />
                <StarIcon className='stars' />
                <StarIcon className='stars' />
                <StarIcon className='stars' />
                <StarIcon className='stars' />
              </div>
              <label htmlFor="">Infromation</label>
              <span className='username'>Created by <b>{pin.username}</b></span>
              <span className='date'>1 hour ago</span>
            </div>
            You are here
          </Popup>
        </div>
      ))}
    </Map >
  );
}

export default App;

