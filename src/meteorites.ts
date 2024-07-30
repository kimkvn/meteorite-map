import { data } from "./data";
interface Meteorite {
  name: string;
  id: number;
  nametype: string;
  recclass: string;
  mass: string;
  fall: string;
  year: string;
  reclat?: string;
  reclong?: string;
  geolocation?: {
    type: string;
    coordinates: number[];
  };
}

const noData = {
  long: null,
  lat: null,
  name: "N/A",
  id: null,
  year: null,
  mass: null,
};

// formats data to be consumed by am5
export const formatMapData = (data: Meteorite[]) => {
  return data.map((entry: Meteorite) => {
    return {
      long: entry.reclong,
      lat: entry.reclat,
      name: entry.name,
      id: entry.id,
      year: entry.year,
      mass: entry.mass,
    };
  });
};

export const getMeteoritesByDate = () => {
  const sortedData = data.sort((a, b) => {
    return new Date(b.year) - new Date(a.year);
  });
  const formatted = formatMapData(sortedData);
  return formatted;
};

const searchMeteoriteByName = (arr, query: string) => {
  console.log(arr);
  const middleIndex = Math.floor(arr.length / 2);
  const middleVal = arr[middleIndex];
  if (middleVal.name === query) return middleVal;
  if (arr.length <= 1) return false;
  if (middleVal.name < query) {
    return searchMeteoriteByName(arr.slice(middleIndex), query);
  } else if (middleVal.name > query) {
    return searchMeteoriteByName(arr.slice(0, middleIndex), query);
  }
  return false;
};

export const getMeteoriteByName = (query: string) => {
  const sortByName = data.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const match = searchMeteoriteByName(sortByName, query);
  return match ? match : noData;
};
