module.exports = (sequelize, Sequelize) => {
  const Exceldata = sequelize.define("tutorials", {
    userid: {
      type: Sequelize.STRING
    },
    uniqueId: {
      type: Sequelize.STRING
    },
    phase: {
      type: Sequelize.STRING
    },
    scope: {
      type: Sequelize.STRING
    },
    optional: {
      type: Sequelize.STRING
    },
    istemplateordeployment: {
      type: Sequelize.STRING
    },
    tmc2020: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.STRING
    },
    ferringdeployment: {
      type: Sequelize.STRING
    },
    ferringtemplate: {
      type: Sequelize.STRING
    },
    biontech: {
      type: Sequelize.STRING
    },
    action: {
      type: Sequelize.STRING
    },
    responsibleteam: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    descriptiondetails: {
      type: Sequelize.TEXT
    },
    waterfalloragile: {
      type: Sequelize.STRING
    },
    l3: {
      type: Sequelize.STRING
    },
    l4: {
      type: Sequelize.STRING
    },
    activedeliverales: {
      type: Sequelize.STRING
    },
    tmcdelive: {
      type: Sequelize.STRING
    },
    impltype: {
      type: Sequelize.STRING
    },
    created_date: {
      type: Sequelize.DATE
    },
    modeified_date: {
      type: Sequelize.DATE
    }

  });

  return Exceldata;
};
