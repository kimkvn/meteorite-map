import { useEffect, useState } from "react";
import "./App.css";
import MapHeader, { SelectedMeteorite } from "./MapHeader";
import Map from "./Map";
import {
  Meteorite,
  getMeteoriteByName,
  getMeteoritesByDate,
} from "./meteorites";

const getInitialData = () => {
  const sortedByDate = getMeteoritesByDate();
  return sortedByDate;
};

function App() {
  const [mapData, setMapData] = useState(getInitialData());
  const [selectedMeteorite, setSelectedMeteorite] = useState<SelectedMeteorite>(
    {
      name: "---",
      year: "---",
      mass: "---",
    }
  );

  const handleOnClick = (data: Meteorite) => {
    setSelectedMeteorite(data);
  };

  const handleSearchSubmit = (query: string) => {
    console.log(query);
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
    </>
  );
}

export default App;
