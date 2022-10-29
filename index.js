const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const { DB, AUTH } = require("./initializeFirebase");

// Create user
const createUser = async () => {
  try {
    await AUTH.createUser({
      email: "user@example.com",
      emailVerified: false,
      phoneNumber: "+11234567890",
      password: "secretPassword",
      displayName: "John Doe",
      photoURL: "http://www.example.com/12345678/photo.png",
      disabled: false,
    });
  } catch (err) {
    console.log("create user", err);
  }
};

//Add data to firestore
const addData = async (data) => {
  const res = await DB.collection("cities").doc(uuidv4()).set(data);
};

addData({ name: "ajay jb" });
createUser();

//Read data from firestore

app.listen(3008, () => {
  console.log("Server is listening on port 3005");
});
