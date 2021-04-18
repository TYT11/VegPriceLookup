export function getRepublic(date) {
  let republicDate = date.split("-");
  republicDate[0] = parseInt(republicDate[0], 10) - 1911;
  republicDate = republicDate.join(".");
  return republicDate;
}

export function getAD(date) {
  let adDate = date.split(".");
  adDate[0] = parseInt(adDate[0], 10) + 1911;
  adDate = adDate.join("-");
  return adDate;
}

export function getCommon(data, type) {
  const appearences = {};
  data.forEach((item) => {
    if (item[type].length > 2) {
      appearences[item[type]] = (appearences[item[type]] || 0) + 1;
    }
  });
  const appearencesOrder = Object.entries(appearences).sort(
    ([, v1], [, v2]) => v2 - v1
  );
  console.log(appearencesOrder);
  const maximumPair =
    appearencesOrder.length > 0 ? appearencesOrder[0][0] : false;

  return maximumPair;
}
