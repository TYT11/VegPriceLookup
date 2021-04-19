export default function getTime(daysPrior = false) {
  let currentTime = new Date();

  if (daysPrior) {
    let time = new Date().setDate(currentTime.getDate() - daysPrior);
    currentTime = new Date(time);
  }

  let year = currentTime.getYear() + 1900;
  let month = currentTime.getMonth() + 1;
  let date = currentTime.getDate();

  if (month < 10) {
    month = 0 + month.toString();
  }
  if (date < 10) {
    date = 0 + date.toString();
  }

  return year + "-" + month + "-" + date;
}
