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
      console.log(api, res.data.Data);
    });
  };

  return (
    <div>
      <div>
        <div>臺灣近期菜價查詢</div>
        <div>Taiwan Produce Recent Price Lookup</div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <select
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
        <select
          name=""
          id=""
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
        <input
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
          type="date"
          max={today}
          defaultValue={today}
          onChange={(e) => {
            setCrop((prev) => {
              return { ...prev, endDate: getRepublic(e.target.value) };
            });
          }}
        />
        <button type="submit">FIND</button>
      </form>

      <Chart cropData={cropData} />
    </div>
  );
}
