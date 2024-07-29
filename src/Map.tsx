import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

const Map = (props) => {
  const pointSeriesRef = useRef(null);

  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "none",
        projection: am5map.geoNaturalEarth1(),
      })
    );

    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    let pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        name: "Series",
        latitudeField: "lat",
        longitudeField: "long",
      })
    );

    pointSeries.bullets.push(() => {
      let circle = am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0xff0000),
        tooltipText: "{name}",
      });

      circle.events.on("click", function (ev) {
        alert("Clicked on " + ev.target.dataItem.dataContext.name);
      });

      return am5.Bullet.new(root, {
        sprite: circle,
      });
    });

    pointSeriesRef.current = pointSeries;

    return () => {
      root.dispose();
    };
  }, []);

  // This code will only run when props.data changes
  useLayoutEffect(() => {
    pointSeriesRef.current.data.setAll(props.data);
  }, [props.data]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default Map;
