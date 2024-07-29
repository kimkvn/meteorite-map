import { data } from "./data";

// data length = 1000

export const getMeteoritesByDate = () => {
  return data.sort((a, b) => {
    return new Date(b.year) - new Date(a.year);
  });
};
