import React, { useState } from "react";
import "./getTime";
import axios from "axios";
import { getRepublic } from "./getRepublic";
import getTime from "./getTime";
import Chart from "./Chart";

export default function Finder() {
  const today = getTime();
  const daysPrior = getTime(31);
  const cities = [
    "",
    "台北",
    "台中",
    "南投",
    "屏東",
    "高雄",
    "嘉義",
    "台南",
    "台東",
    "花蓮",
  ];
  const veggies = [
    "",
    "嫩薑",
    "蒜頭",
    "洋蔥",
    "蘿蔔",
    "茄子",
    "韭菜",
    "芹菜",
    "菠菜",
    "油菜",
    "紅蔥頭",
    "結球萵",
    "玉米筍",
    "杏鮑菇",
    "秀珍菇",
    "小白菜",
    "萵苣菜",
    "芥藍菜",
    "花椰菜",
    "筊白筍",
  ];
  const [crop, setCrop] = useState({
    crop: "",
    city: "",
    startDate: getRepublic(daysPrior),
    endDate: getRepublic(today),
  });
  const [cropData, setCropData] = useState([]);

  const handleSubmit = () => {
    const api = `https://agridata.coa.gov.tw/api/v1/AgriProductsTransType/?Start_time=${crop.startDate}&End_time=${crop.endDate}&MarketName=${crop.city}&CropName=${crop.crop}`;
    axios.get(api).then((res) => {
      setCropData(res.data.Data);
    });
  };

  return (
    <div className="mt-4">
      <div className="mb-3">
        <div className="h3">近期菜價查詢</div>
        <div className="h5">Produce Recent Price Lookup</div>
      </div>
      <form
        className="mb-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="mt-2">
          <label htmlFor="crop">項目：</label>
          <select
            id="crop"
            className="mr-2"
            value={crop.crop}
            onChange={(e) => {
              setCrop((prev) => {
                return { ...prev, crop: e.target.value };
              });
            }}
          >
            {veggies.map((veggie) => (
              <option key={veggie} value={veggie}>
                {veggie}
              </option>
            ))}
          </select>
          <label htmlFor="city">地區：</label>
          <select
            className="mr-2"
            name=""
            id="city"
            onChange={(e) => {
              setCrop((prev) => {
                return { ...prev, city: e.target.value };
              });
            }}
            value={crop.city}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2 mr-2 ml-2 d-flex justify-content-center align-items-center">
          <input
            className="ml-2 mr-2 flex-grow-1"
            type="date"
            min={daysPrior}
            defaultValue={daysPrior}
            onChange={(e) => {
              setCrop((prev) => {
                return { ...prev, startDate: getRepublic(e.target.value) };
              });
            }}
          />{" "}
          至{" "}
          <input
            className="ml-2 mr-2 flex-grow-1"
            type="date"
            max={today}
            defaultValue={today}
            onChange={(e) => {
              setCrop((prev) => {
                return { ...prev, endDate: getRepublic(e.target.value) };
              });
            }}
          />
          <button
            type="submit"
            className="btn btn-outline-primary ml-2 mr-2  flex-grow-1"
            style={{ fontSize: "1rem", width: "4rem" }}
          >
            查詢
          </button>
        </div>
      </form>

      <Chart cropData={cropData} />
    </div>
  );
}
