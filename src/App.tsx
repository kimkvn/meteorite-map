import { useEffect, useState } from "react";
import "./App.css";
import Map from "./Map";
import { getMeteoriteByName, getMeteoritesByDate } from "./meteorites";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
  const [mapData, setMapData] = useState(getInitialData());
  const [selectedMeteorite, setSelectedMeteorite] = useState({
    name: "---",
    year: "---",
    mass: "---",
  });
  const [searchName, setSearchName] = useState("");

  const handleOnClick = (data) => {
    setSelectedMeteorite(data);
  };

  const handleSearch = (query) => {
    setSearchName(query);
  };

  const handleSearchSubmit = () => {
    const meteorite = getMeteoriteByName(searchName);
    setSelectedMeteorite(meteorite);
    console.log(meteorite);
  };

  return (
    <>
      <h1>Meteorite Madness</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Search By Name"
          variant="outlined"
          onChange={(event) => handleSearch(event.target.value)}
        />
        <Button variant="contained" onClick={handleSearchSubmit}>
          Submit
        </Button>
      </Box>
      <Map data={mapData} onClick={handleOnClick} />
      <div>
        <div>Name: {selectedMeteorite.name}</div>
        <div>Year: {new Date(selectedMeteorite.year).getFullYear()}</div>
        <div>Mass: {selectedMeteorite.mass}(g)</div>
      </div>
    </>
  );
}

export default App;
