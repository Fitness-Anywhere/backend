export const convertingTime = (start_time) => {
  const convert = new Date(start_time);
  const t = convert.toLocaleTimeString().split(":");
  const am = t.slice(-1)[0].split(" ")[1];
  const time = `${t[0]}:${t[1]} ${am}`;

  //   console.log("time here ", time);
  return time;
};
