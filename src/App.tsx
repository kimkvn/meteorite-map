import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Map from "./Map";

let mapData = [
  {
    long: -73.778137,
    lat: 40.641312,
    name: "New York",
  },
  {
    long: -0.454296,
    lat: 51.47002,
    name: "London",
  },
  {
    long: 116.597504,
    lat: 40.072498,
    name: "Beijing",
  },
  {
    long: 9.55,
    lat: 36.95,
    name: "Djoumine",
  },
];

function App() {
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
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Map data={mapData} />
    </>
  );
}

export default App;
