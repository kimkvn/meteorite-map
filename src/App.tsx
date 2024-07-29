import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Map from "./Map";
import { getMeteoritesByDate } from "./meteorites";

const getInitialData = () => {
  const sortedByDate = getMeteoritesByDate().slice(0, 100);
  const meteoriteSet = sortedByDate.map((entry, i) => {
    return {
      long: entry.reclong,
      lat: entry.reclat,
      name: entry.name,
      id: entry.id,
      year: entry.year,
    };
  });

  return meteoriteSet;
};

function App() {
  console.log(getInitialData());
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Map data={getInitialData()} />
    </>
  );
}

export default App;
