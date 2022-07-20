const db = require("../models");
const md5 = require("md5");
const jwtutill = require('../utills/jwt.generator');

const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.findByEmail = (req, res) => {
  
  if(req.body.email !== undefined && req.body.password !== undefined) {

    Tutorial.findAll({
      raw: true,
      where: {
        email: req.body.email,
        password: md5(req.body.password),
        // type: 1,
        status: 1
      }
    })
    .then(data => {
      if( Object.keys(data).length > 0) {
        let jwtToken = jwtutill.generateJWTToken(data[0].id, data[0].full_name);
        resData = {
          auth: jwtToken,
          ...data[0]
        }
        res.send(resData);
      } else {
        res.send({
          message:
            "Invalid Login."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  } else {
    if(req.body.email === undefined) {
      res.send({
        message:
          "Please enter the Email Id."
      });
    }
    if(req.body.password === undefined) {
      res.send({
        message:
          "Please enter the Password."
      });
    }
  }

};