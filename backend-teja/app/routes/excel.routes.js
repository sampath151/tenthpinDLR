const express = require("express");
const router = express.Router();
const excelController = require("../controllers/excel.controller");
const upload = require("../middlewares/upload");
let routes = (app) => {
  router.post("/upload", upload.single("file"), excelController.upload);
  router.get("/records", excelController.getTutorials);
  app.use("/api/v1/excel", router);
};
module.exports = routes;