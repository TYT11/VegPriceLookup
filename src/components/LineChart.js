import React, { useEffect } from "react";
import * as d3 from "d3";
import { getAD, getCommon, getDateFormat } from "./getRepublic";

export default function LineChart({ cropData }) {
  const parseTime = d3.timeParse("%Y-%m-%d");
  const dataSample = cropData.slice(0, 50);
  const commonCategory = getCommon(dataSample, "CropCode");
  const commonCity = getCommon(dataSample, "MarketName");

  const data = cropData
    ?.filter(
      (crop) =>
        crop.Avg_Price !== 0 &&
        crop.CropCode === commonCategory &&
        crop.MarketName === commonCity
    )
    .map((crop) => {
      return { date: parseTime(getAD(crop.TransDate)), value: crop.Avg_Price };
    });

  const handleClick = (e) => {};

  useEffect(() => {
    if (data.length > 0) {
      const m = [20, 20, 20, 20];
      const w = parseInt(d3.select(".App").style("width"), 10) - 40;
      const h = 400;

      const svg = d3
        .select("#linechart")
        .append("svg")
        .attr("width", w - m[1])
        .attr("height", h);

      const x = d3.scaleTime().rangeRound([m[3], w - m[1] - m[3]]);
      const y = d3.scaleLinear().rangeRound([h, m[0]]);

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
      const xaxis = d3
        .axisBottom()
        .scale(x)
        .tickFormat(d3.timeFormat("%m/%d"))
        .ticks(Math.max((w / 80).toFixed(0), 5));

      svg
        .append("g")
        .attr("transform", `translate(0,${h - m[2]})`)
        .call(xaxis);

      svg
        .append("g")
        .call(yaxis)
        .attr("transform", `translate(${m[3]}, ${-m[2]} )`)
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
        .attr("transform", "translate(0,-20)")
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

      function handleMouseOver(d) {
        d3.select(this).attr("r", 10).style("fill", "lightblue");
        const target = d.target.__data__;

        svg
          .append("text")
          .attr("id", `text${x(target.date)}${y(target.value)}`)
          .attr("fill", "black")
          .attr("x", function () {
            return x(target.date) - 10;
          })
          .attr("y", function () {
            return y(target.value) + 10;
          })
          .text(function () {
            return [target.value];
          });

        svg
          .append("text")
          .attr("id", `date${x(target.date)}${y(target.value)}`)
          .attr("fill", "black")
          .attr("x", function () {
            return x(target.date) - 13;
          })
          .attr("y", function () {
            return y(target.value) - 40;
          })
          .text(function () {
            return [getDateFormat(target.date)];
          });
      }

      function handleMouseOut(d) {
        d3.select(this).attr("r", 4).style("fill", "steelblue");
        const target = d.target.__data__;
        d3.select(`#text${x(target.date)}${y(target.value)}`).remove();
        d3.select(`#date${x(target.date)}${y(target.value)}`).remove();
      }

      svg
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("fill", "steelblue")
        .attr("class", "dot")
        .attr("cx", function (d) {
          return x(d.date);
        })
        .attr("transform", "translate(0,-20)")
        .attr("cy", function (d) {
          return y(d.value);
        })
        .attr("r", 4)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("click", handleClick);
    }

    return () => {
      d3.select("svg").remove();
    };
  }, [data]);

  return (
    <div id="linechart" className="d-flex justify-content-center">
      {data.length === 0 ? (
        <div>指定日期內該地區沒有價格資料，換個地區試試！</div>
      ) : (
        ""
      )}
    </div>
  );
}
