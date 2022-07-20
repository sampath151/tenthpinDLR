module.exports = app => {
  const clienttut = require("../controllers/admin.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", clienttut.create);

  // Retrieve all clienttut
  router.get("/", clienttut.findAll);

  // Retrieve all published clienttut
  router.get("/published", clienttut.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", clienttut.findOne);

  // Retrieve a single Tutorial with id
  router.post("/login", clienttut.findByEmail);

  // Update a Tutorial with id
  router.put("/:id", clienttut.update);

  // Delete a Tutorial with id
  router.delete("/:id", clienttut.delete);

  // Delete all clienttut
  router.delete("/", clienttut.deleteAll);

  app.use('/api/v1/admin', router);
};
