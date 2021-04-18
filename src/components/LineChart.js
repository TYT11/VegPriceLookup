import React, { useEffect } from "react";
import * as d3 from "d3";
import { getAD, getCommon } from "./getRepublic";

export default function LineChart({ cropData }) {
  const parseTime = d3.timeParse("%Y-%m-%d");
  const dataSample = cropData.slice(0, 50);
  const commonCategory = getCommon(dataSample, "CropCode");
  const commonCity = getCommon(dataSample, "MarketName");

  const data = dataSample
    ?.filter(
      (crop) =>
        crop.Avg_Price !== 0 &&
        crop.CropCode === commonCategory &&
        crop.MarketName === commonCity
    )
    .map((crop) => {
      return { date: parseTime(getAD(crop.TransDate)), value: crop.Avg_Price };
    });

  console.log(data);

  useEffect(() => {
    if (data.length > 0) {
      const m = [20, 20, 20, 20];
      const w = 900 - m[1] - m[3];
      const h = 400 - m[0] - m[2];

      const svg = d3
        .select("#linechart")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("transform", "translate(" + m[1] * 2 + "," + m[0] * 2 + ")");

      const x = d3.scaleTime().rangeRound([0, w]);
      const y = d3.scaleLinear().rangeRound([h, 0]);

      x.domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      );
      y.domain([
        0,
        d3.max(data, function (d) {
          return d.value;
        }),
      ]);

      const yaxis = d3.axisLeft().scale(y);
      const xaxis = d3.axisBottom().scale(x);

      svg
        .append("g")
        .attr("transform", `translate(20,${h - m[0]})`)
        .call(xaxis);

      svg
        .append("g")
        .call(yaxis)
        .attr("transform", `translate(${m[3] * 1}, -20)`)
        .append("text")
        .text("價格")
        .attr("transform", "rotate(-90)")
        .attr("dy", ".75em")
        .attr("y", 6)
        .style("text-anchor", "end");

      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("transform", "translate(20,0)")
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.date);
            })
            .y(function (d) {
              return y(d.value);
            })
        );
    }

    return () => {
      d3.select("svg").remove();
    };
  }, [data]);

  return (
    <div id="linechart">
      {data.length === 0 ? (
        <div>指定日期內該地區沒有價格資料，換個地區試試！</div>
      ) : (
        ""
      )}
    </div>
  );
}
