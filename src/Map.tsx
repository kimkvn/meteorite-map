import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

import { Meteorite } from "./meteorites";
interface MapProps {
  data: Meteorite[];
  onClick: () => void;
}

const Map = (props: MapProps) => {
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

    polygonSeries.mapPolygons.template.setAll({
      stroke: am5.color(0xffffff),
      fill: am5.color(0x50fa1d),
      strokeWidth: 0.55,
      fillOpacity: 0.5,
    });

    let pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        name: "Series",
        latitudeField: "lat",
        longitudeField: "long",
      })
    );

    pointSeries.bullets.push(() => {
      let circle = am5.Star.new(root, {
        radius: 4,
        fill: am5.color(0xf5ff6a),
        tooltipText: "{name}",
      });

      circle.events.on("click", function (ev) {
        props.onClick(ev.target.dataItem.dataContext);
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

  useLayoutEffect(() => {
    pointSeriesRef.current.data.setAll(props.data);
  }, [props.data]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default Map;
