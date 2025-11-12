const express = require('express');
const mongoose = require('mongoose');       
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      
    },
    companyName: {
      type: String,
      default: "",
     
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      
    //   match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
    //   required: [true, "Password is required"],
    //   minlength: [6, "Password must be at least 6 characters long"],
    //   select: false, // hides password in queries by default
    },
    agreedToTerms: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { 
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    },
    toObject: {
      transform: function(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);
module.exports = mongoose.model('Users', userSchema);