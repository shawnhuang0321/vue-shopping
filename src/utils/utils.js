export const convertTime = function(time) {
  let day = new Date(time * 1000);
  let year = day.getFullYear();
  let month = ('0' + (day.getMonth() + 1)).slice(-2);
  let date = ('0' + day.getDate()).slice(-2);
  return `${year}-${month}-${date}`;
};