const db = require("../models");
const md5 = require("md5");

const jwtutill = require('../utills/jwt.generator');

const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  
  // Tutorial.findAll({ where: condition })
  Tutorial.findAll({
    raw: true,
    where: {
      type: 1,
      status: 1
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

exports.findByEmail = (req, res) => {

  if(req.body.email !== undefined && req.body.password !== undefined) {

    Tutorial.findAll({
      raw: true,
      where: {
        email: req.body.email,
        password: md5(req.body.password),
        type: 2
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

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Create and Save a new Tutorial
exports.createUser = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.mobile || !req.body.name || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  console.log(req.body);

  // Create a Tutorial
  const tutorial = {
    email: req.body.email,
    password: md5(req.body.password),
    full_name: req.body.name,
    mobile: req.body.mobile,
    status: 1
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    });
};

generateJWTToken = (userId, userName) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
      time: Date(),
      userId: userId,
      userName: userName,
  }
  const token = jwt.sign(data, jwtSecretKey);

  return token;
}