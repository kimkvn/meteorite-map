# Mapping Meteorites ☄️

An exercise in reading, displaying, understanding Meteorite landing data from NASA

In reviewing the data I was intrigued by the geolocation information included with each meteorite object. I figured it would be fun to render the data as points on a map of the earth.

While the dataset is large at ~1000 entries, with recordings dating back to the early 1800s, viewing the data on a map reveals how larger areas of "no recorded meteorite landings" correlates with areas of small to no human populations, indicating a type of confirmation bias. I wonder how many meteorites have fallen in these empty zones, and even the oceans, and we just haven't had the means to document them?

Screenshot:
![Screen Shot 2024-07-29 at 9 09 59 PM](https://github.com/user-attachments/assets/4d1347f0-ac8a-45b6-850b-a57e522c11f1)

### Built with React, Typescript, [amCharts](https://www.amcharts.com/javascript-maps/), Material-UI, Vite

### Steps to run locally:

- clone repo
- `npm install` && `npm run dev`
- the application should appear at `http://localhost:5173/`

### User has the ability to:

- interact with the map by click & dragging/scrolling, or pinch/zoom (mobile)
- click on a waypoint to view additional information about a meteorite
- search for a meteorite by name (see notes for known issues)

## Roadmap feature brainstorming

- a Date Range Slider for user to filter the data by min - max Year
- "heatmap" style waypoints; a waypoint will have increased or decreased radius correlating to its recorded mass
- a floating List component that detects what meteorites are currently in view, and displays the information in a scrollable list (think searching for and viewing AirBnb/Zillow listings)
- ability for a user to Favorite and save select meteorites, and store this data to persist across tabs (likely utilizing `localStorage` or implementing a POST -> GET request)
- ability to filter by continent/country (not sure how feasible, would require interpreting the geoLocation data per entry which seems expensive)

## Notes and Known Issues

### Search Meteorite by Name

High priority roadmap issue to implement better case validation for the Search functionality. At the present the logic is case sensitive `"duwun" !== "Duwun"`, and there's also an issue when it comes to special characters; searching for `Saratov` fails due to comparison checking with `São Jose do Rio Preto`. In the search logic, ` Sara > Sao ?` evals to `true` however ` Sara > São ?` evals to `false`

Nice to have would also be the map automatically snapping to and highlighting the resulting meteorite when searched.

### Implementation of fetching data

For this exercise the meteorite data is stored in a static file, and accessed using utility functions in `meteorites.ts`. `getMeteoriteByName` would be a GET request triggered by using the search box, and `getMeteoritesByDate` would be a POST request that returns data given both START and END years when triggered by a Date Range Slider (or some other UI element)

### What to do with entries that don't have geolocation data?

I noticed there would often be waypoints smack dab in the "middle" of the map/in the Gulf of Guinea due south of Ghana:

![Screen Shot 2024-07-29 at 9 52 31 PM](https://github.com/user-attachments/assets/c8c8da1d-4a1d-40e4-8c80-7ebd906d9033)

and viewing the corresponding data in the file revealed a number of entries with no geoLocation information. This is maybe the most prominent oopsie of this map implementation that I don't have an immediate solution for in terms of conveying this lack of information to the user
