/*
 * Author : Nancy Chauhan
 * This is handling all the request from client (handling of CRUD operation at server)
 * Using Joi for validating client data. 
 * Mongoose also provide validation while communicating with DB.
 * Using Mongo DB.
 */

const Joi = require("joi");
const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

//GET request - getting all data
router.get("/", async (req, res) => {
  const emp = await Employee.find().sort("firstname"); //sorted with first name
  res.send(emp);
});

//GET request with ID - getiing data for given id
router.get("/:id", async (req, res) => {
  const emp = await Employee.findById(req.params.id);

  //Error handling if employee does not exist from given id.
  if (!emp)
    return res
      .status(404)
      .send("The Employee with the given ID was not found.");

  res.send(emp);
});

//POST request -- Creating New data in DB
router.post("/", async (req, res) => {
  //Error handling for validity of data
  const { error } = validateEmployee(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //creating new employee record
  let emp = new Employee(req.body);
  try {
    emp = await emp.save();
  } catch (ex) {
    console.log(ex);
  }

  //sending newly created employee data to client.
  res.send(emp);
});

//PUT request with id -- updating the data for given id
router.put("/:id", async (req, res) => {
  //Error handling for validity of data
  const { error } = validateEmployee(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find and update the data altogether
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  //if emp does not exist.
  if (!emp)
    return res
      .status(404)
      .send("The Employee with the given ID was not found.");

  //sending updated employee data to client.
  res.send(emp);
});

//DELETE request with id -- deleting data for given id
router.delete("/:id", async (req, res) => {
  //find and delete data altogether
  const emp = await Employee.findByIdAndRemove(req.params.id);

  //if emp not found in DB.
  if (!emp)
    return res
      .status(404)
      .send("The Employee with the given ID was not found.");

  //sending deleted record to client
  res.send(emp);
});

//Validating the data received from client
function validateEmployee(emp) {
  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    address: Joi.string(),
    department: Joi.string(),
    rating: Joi.number(),
    phone: Joi.number(),
    comments: Joi.string()
  };

  return Joi.validate(emp, schema);
}

module.exports = router;
