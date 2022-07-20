module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("clients", {
    full_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    mobile: {
      type: Sequelize.STRING
    }
  });

  return Tutorial;
};
