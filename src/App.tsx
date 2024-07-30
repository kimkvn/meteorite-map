import { useEffect, useState } from "react";
import "./App.css";
import Map from "./Map";
import { getMeteoriteByName, getMeteoritesByDate } from "./meteorites";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const getInitialData = () => {
  const sortedByDate = getMeteoritesByDate().slice(0, 500);
  return sortedByDate;
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
  };

  return (
    <>
      <h1>Meteorite Madness</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Search By Name"
          variant="outlined"
          onChange={(event) => handleSearch(event.target.value)}
          sx={{
            // Root class for the input field
            "& .MuiOutlinedInput-root": {
              color: "#50fa1d",
              fontFamily: "Monaspace Krypton",
              fontWeight: 400,
              borderRadius: 0,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#50fa1d",
                borderWidth: "2px",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#50fa1d",
                  borderWidth: "2px",
                },
              },
              "&:hover:not(.Mui-focused)": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ccc",
                },
              },
            },
            "& .MuiInputLabel-outlined": {
              fontFamily: "Monaspace Krypton",
              color: "#50fa1d",
              fontWeight: "bold",
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearchSubmit}
          sx={{
            backgroundColor: "#50fa1d",
            borderColor: "#50fa1d",
            borderWidth: "2px",
            borderRadius: "0px",
            fontFamily: "Monaspace Krypton",
            color: "#242424",
            maxWidth: "100px",
            "&:hover": {
              background: "#242424",
              border: "2px solid #50fa1d",
              color: "#50fa1d",
            },
          }}
        >
          Submit
        </Button>
        <div className="info-container">
          <div>Name: {selectedMeteorite.name}</div>
          <div>Year: {new Date(selectedMeteorite.year).getFullYear()}</div>
          <div>Mass: {selectedMeteorite.mass}(g)</div>
        </div>
      </Box>
      <Map data={mapData} onClick={handleOnClick} />
    </>
  );
}

export default App;
