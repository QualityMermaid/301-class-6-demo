import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState({})
  const [map, setMap] = useState("")

  function handleSearch(event){
  // console.log("Hey")
    setSearchQuery(event.target.value)
    console.log(searchQuery)
  }

  async function getLocation(event){
    // add try then a catch for error handling
    try{
      event.preventDefault()
      event.target.name.value=""
      // using LocationIQ API from the web
      // install dotenv from terminal: npm i dotenv
      // console.log("location found")
      // endpoint server ideally for YOUR location to begin with
      // const API = `https://eu1.locationiq.com/v1/search?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json`;
      // edit the url with js below. before ? is url ? = what are our prams and after are the prams key=AcciessToken, seperates multiple prams with with &
      // install from terminal axios. npm i axios
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
      const res = await axios.get(API)
      setLocation(res.data[0])
      handleMap(res.data[0])
    }catch(error){
      console.log(error)
    }
  }

  function handleMap(data){
    console.log(data)
    // using staticmaps from locationIQ
    // const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&centre=${data.lat},${data.lon}&zoom=9`
    const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${data.lat},${data.lon}`
    // const res = axios.get(API)
    setMap(API)
  }

  return (
    <div className="App">
      <form onSubmit={getLocation}>
      <input type='text' placeholder='search for a city' name="name" onChange={handleSearch}></input>
      <button type='submit'>Explore!</button>
      </form>
      <p>{location.display_name}</p>
      {map && <map src={map} alt="map"></map>}
    </div>
  );
}

export default App;
