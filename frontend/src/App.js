
import "./App.css"
import Map, { Marker, Popup } from 'react-map-gl';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios"

import moment from "moment"
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {


  const myStorage=window.localStorage;
  // const currentUser = ""
  const [currentUser,setCurrentUser]=useState(null)
  const [pins, setPins] = useState([])
  const [currentPlacedId, setCurrentPlacedId] = useState("")
  const [newPlace, setNewPlace] = useState(null)
  const [showRegister,setShowRegister] = useState(false)
  const [showLogin,setShowLogin] = useState(true)
  const [view, setView] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14
  })

  // //? form ka data
  const [place, setPlace] = useState("")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState("")


  useEffect(() => {

    //get all pins from database
    const getPins = async () => {
      try {
        const res = await axios.get('/pins')
        setPins(res.data)
        // console.log(pins)
      }
      catch (err) { console.log(err) }
    }
    getPins()
  }, [])
  useEffect(() => {
    console.log("new pin", newPlace)
    setPlace("")
    setRating(1)
    setReview("")

  }, [newPlace])

  useEffect(() => {
    console.log("view change hua hai");
  }, [view]);

  const handleMarkerclick = (id, lat, long) => {

    setCurrentPlacedId(id)
    setView({ ...view, latitude: lat, longitude: long })

  }
  
  const handleDoubleClick = (e) => {
    console.log("double click -You clicked me", e)
    const lng = e.lngLat.lng
    const lat = e.lngLat.lat

    console.log(lng,lat)
    setNewPlace({ lng, lat })
  
    
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newPin = {
      username: currentUser,
      title: place,
      description: review,
      rating: rating,
      latitude: newPlace.lat,
      longitude: newPlace.lng,
    };
  
    console.log("Pin", newPin);
  
    try {
      const res = await axios.post("/pins", newPin);
      setPins((prevPins) => [...prevPins, res.data]); // Use functional update here
      setNewPlace(null);
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <>
    <Navbar setShowRegister={setShowRegister} setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} currentUser={currentUser} myStorage={myStorage}/>
    {/* MAP  */}
    <Map
      initialViewState={view}
      style={{ width: "100vw", height: "90vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      onDblClick={handleDoubleClick}

    >


      {pins && pins.map(pin => (
        <div key={pin._id}>
          <Marker longitude={pin.longitude} latitude={pin.latitude} color={(currentUser===pin.username?"tomato":"pink")} onClick={() => handleMarkerclick(pin._id, pin.latitude, pin.longitude)} />

          {currentPlacedId === pin._id && <Popup longitude={pin.longitude} latitude={pin.latitude}
            anchor="top-left" closeButton={true} closeOnClick={false} onClose={() => setCurrentPlacedId(null)}

          >
            <div className="card">
              <label htmlFor="">Place</label>
              <h2 className='place'>{pin.title}</h2>
              <label htmlFor="">Review</label>
              <p className='desc'>{pin.description}</p>
              <label htmlFor="">Rating</label>
              <div className='stars'>

                {Array(pin.rating).fill(<StarIcon className='stars' />)}
              </div>
              
              <label htmlFor="">Infromation</label>
              <span className='username'>Created by <b>{pin.username}</b></span>
              <span className='date'>{moment(pin.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
            </div>
            {/* You are here */}
          </Popup>}
        </div>
      ))}

      {/* New Place */}
 
      {newPlace && <Popup longitude={newPlace.lng} latitude={newPlace.lat}
        anchor="top-left" closeButton={true} closeOnClick={false} onClose={() => setNewPlace(null)}

      >
        <form onSubmit={handleSubmit}>
          <div className="card">
            <h1 style={{ color: "tomato" }}> Add  a New Place</h1>
            <label htmlFor="">Place</label>
            <input placeholder="Enter Place Name" value={place} onChange={(e) => setPlace(e.target.value)} />
            <label htmlFor="">Review</label>
            <input placeholder="Enter Review" value={review} onChange={(e) => setReview(e.target.value)} />

            <label htmlFor="">Rating</label>
            <input placeholder="Enter Rating b/w 1 to 5 " value={rating} onChange={(e)=>setRating(e.target.value)}/>

            <button className="btn">Add</button>

           {/* <label htmlFor="">Infromation</label>
          <span className='username'>Created by <b>kkkkbk</b></span>
          <span className='date'>{format(new Date())}</span>   */}
           </div>
        </form>
      </Popup>}  

          
           

    </Map >
   {showRegister && <Register myStorage={myStorage} setCurrentUser={setCurrentUser} setShowRegister={setShowRegister}/>} 
   {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser} />}
     
    </>
    
  );
}

export default App;

