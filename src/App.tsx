import { useState } from "react";
import "./App.css";
import MapHeader, { SelectedMeteorite } from "./components/MapHeader";
import Map from "./components/Map";
import {
  Meteorite,
  getMeteoriteByName,
  getMeteoritesByDate,
} from "./server/meteorites";

const getInitialData = () => {
  const sortedByDate = getMeteoritesByDate();
  return sortedByDate;
};

function App() {
  const [mapData, setMapData] = useState(getInitialData());
  const [selectedMeteorite, setSelectedMeteorite] = useState<SelectedMeteorite>(
    {
      name: null,
      year: null,
      mass: null,
    }
  );

  const handleOnClick = (data: Meteorite) => {
    setSelectedMeteorite(data);
  };

  const handleSearchSubmit = (query: string) => {
    const meteorite = getMeteoriteByName(query);
    setSelectedMeteorite(meteorite);
  };

  return (
    <>
      <h1>Mapping Meteorites</h1>

      <MapHeader
        meteorite={selectedMeteorite}
        submitSearch={handleSearchSubmit}
      />
      <Map data={mapData} onClick={handleOnClick} />
      <div>
        <p>Use mouse, or pinch/zoom, to move around the map</p>
        <p>Click on a waypoint to view meteorite information</p>
      </div>
    </>
  );
}

export default App;
