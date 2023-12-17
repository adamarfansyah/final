const { parseISO, format } = require("date-fns");

exports.formatDate = (time) => {
  const parseTime = parseISO(time);

  const formattedTime = format(parseTime, "yyyy-MM-dd HH:mm:ss");
  console.log(formattedTime);
  return formattedTime;
};
