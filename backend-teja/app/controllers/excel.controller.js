const db = require("../models");
const Tutorial = db.excel;
const readXlsxFile = require("read-excel-file/node");
const moment = require("moment");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    } 
    
    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;
    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();
      let tutorials = [];
      let timedata = moment().format("YYYY-MM-DD H:mm:ss");
      rows.forEach((row) => {
        let tutorial = {
          userid: req.body.userId,
          uniqueId: row[0],
          phase: row[1],
          scope: row[2],
          optional: row[3],
          istemplateordeployment: row[4],
          tmc2020: row[5],
          active: row[6],
          ferringdeployment: row[7],
          ferringtemplate: row[8],
          biontech: row[9],
          action: row[10],
          responsibleteam: row[11],
          description: row[12],
          descriptiondetails: row[13],
          waterfalloragile: row[14],
          l3: row[15],
          l4: row[16],
          activedeliverales: row[17],
          tmcdelive: row[18],
          impltype: row[19],
          created_date: timedata,
          modeified_date: timedata
        };
        tutorials.push(tutorial);
      });
      Tutorial.bulkCreate(tutorials)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};
const getTutorials = (req, res) => {
  Tutorial.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
module.exports = {
  upload,
  getTutorials,
};