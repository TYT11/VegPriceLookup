import React from "react";
import LineChart from "./LineChart";

export default function Chart({ cropData }) {
  return cropData.length > 0 ? (
    <LineChart cropData={cropData} />
  ) : (
    <div>Search!</div>
  );
}
