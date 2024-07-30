import { useState } from "react";
import "../App.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export interface SelectedMeteorite {
  name: string | null;
  year: string | null;
  mass: number | null;
}

interface MapHeaderProps {
  meteorite: SelectedMeteorite;
  submitSearch: (val: string) => void;
}

const textFieldStyles = {
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
};

const buttonStyles = {
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
};

const MapHeader = (props: MapHeaderProps) => {
  const { meteorite, submitSearch } = props;

  const [searchName, setSearchName] = useState("");

  const handleSearchSubmit = () => {
    submitSearch(searchName);
  };

  return (
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
        onChange={(event) => setSearchName(event.target.value)}
        sx={textFieldStyles}
      />
      <Button
        variant="contained"
        onClick={handleSearchSubmit}
        sx={buttonStyles}
      >
        Submit
      </Button>
      <div className="info-container">
        <div>Name: {meteorite.name}</div>
        <div>
          Year:{" "}
          {meteorite.year ? new Date(meteorite.year).getFullYear() : "----"}
        </div>
        <div>Mass: {meteorite.mass}(g)</div>
      </div>
    </Box>
  );
};

export default MapHeader;
