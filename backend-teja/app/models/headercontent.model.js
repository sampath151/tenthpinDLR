module.exports = (sequelize, Sequelize) => {
  const Headercontent = sequelize.define("headerscontent", {
    headername: {
      type: Sequelize.STRING
    },
    headersubname: {
      type: Sequelize.STRING
    }
  });

  return Headercontent;
};
