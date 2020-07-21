/*
 * Author : Nancy Chauhan 
 * This is Employee model class which define schema for employee.
 * Using Mongoose which is a an Object Data Modeling (ODM) library for MongoDB and Node.js. 
 */

const mongoose = require('mongoose');

const Employee = mongoose.model('Employee', new mongoose.Schema({
    firstname:{
      type:String,
      required:true
    },
    lastname:{
      type:String,
      required:true
    },
    address:String,
    department:String,
    phone:{
      type:Number,
      required:true
    },
    rating:Number,
    comments:String
  }));
  
  module.exports = Employee;