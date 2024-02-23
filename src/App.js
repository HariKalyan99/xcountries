import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countryFlags, setCountryFlags] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;
    const fetchFlags = async() => {
      try{
        const {data} = await axios.get('https://restcountries.com/v3.1/all', signal);
        setCountryFlags(data);
      }catch(error) {
        console.log("Error", error);
      }
    }
    
    fetchFlags();

    return () => {
      controller.abort();
    }
  }, [])
  return (
    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      {countryFlags.map((country) => (
        <div key={country.cca3} style={{display: "flex", flexWrap:"wrap", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "10px", border: "1px solid white", width: "200px", margin: "10px", height: "200px", borderRadius: "10px", boxShadow: "1px 1px 5px pink"}}>
          <img src={country.flags.svg} alt={country.flags.alt} style={{width: "100px", height: "100px"}}/>
        <h3>{country.name.common}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
