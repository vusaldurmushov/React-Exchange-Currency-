
import './App.css';
import Card from "./components/Card.jsx"
import { useState, useEffect } from "react"





function App() {

  const [data, setData] = useState([]);
  // const [rates, setRates] = useState([])

  useEffect(() => {
    fetch("https://v6.exchangerate-api.com/v6/c6ba42697f9447f9e7cf8b2c/latest/USD")
      .then(res => res.json())
      .then((e) => setData(e.conversion_rates))


  }, [])












  return (
    <div className="App">


<Card data={data}  />







    </div>
  );
}

export default App;
