const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-admin-3fb43.firebaseio.com/",
});

const DB = admin.firestore();

const AUTH = admin.auth();

const MESSAGING = admin.messaging();

module.exports = { DB, AUTH, MESSAGING };
