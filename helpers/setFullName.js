const setFullName = (data) => {
  data.map((item) => {
    item.fullName = item.name.first + " " + item.name.last;
  });

  return data;
};

module.exports = setFullName;
