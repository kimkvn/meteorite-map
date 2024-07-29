import { useEffect, useState } from "react";
import "./App.css";
import Map from "./Map";
import { getMeteoritesByDate } from "./meteorites";

const getInitialData = () => {
  const sortedByDate = getMeteoritesByDate().slice(0, 300);
  const meteoriteSet = sortedByDate.map((entry, i) => {
    return {
      long: entry.reclong,
      lat: entry.reclat,
      name: entry.name,
      id: entry.id,
      year: entry.year,
      mass: entry.mass,
    };
  });

  return meteoriteSet;
};

function App() {
  console.log(getInitialData());
  const [count, setCount] = useState(0);
  const [selectedMeteorite, setSelectedMeteorite] = useState({});

  const handleOnClick = (data) => {
    setSelectedMeteorite(data);
  };

  return (
    <>
      <h1>Meteorite Madness</h1>
      <Map data={getInitialData()} onClick={handleOnClick} />
      <div>
        <div>Name: {selectedMeteorite.name}</div>
        <div>Year: {new Date(selectedMeteorite.year).getFullYear()}</div>
        <div>Mass: {selectedMeteorite.mass}(g)</div>
      </div>
    </>
  );
}

export default App;
