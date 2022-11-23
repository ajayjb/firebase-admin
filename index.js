const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const { DB, AUTH, MESSAGING } = require("./initializeFirebase");

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

const registrationTokens = [
  "currentToken fNdJbrBhnL9mWlH8wmfj6R:APA91bGK6duoioCS8KQvb1Ais9ubkPoAWaHxzuucoI8uYH5Wuo_PC2g-1rCnf3rHeResCviAC0-iPzLxcX8uHE5il8Ji28Aq4UAOcjSv8TZ6TNUqs84F-j-Zv-r_c8IlXTUXWmOHzxLZ",
];

const messageRegistrationTokens = {
  notification: {
    title: "$FooCorp up 1.43% on the day",
    body: "$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.",
    image:
      "https://i.pinimg.com/originals/9b/e2/de/9be2de9e79ddbef252270a2956243f02.jpg",
  },
  android: {
    notification: {
      imageUrl:
        "https://i.pinimg.com/originals/9b/e2/de/9be2de9e79ddbef252270a2956243f02.jpg",
    },
  },
  apns: {
    payload: {
      aps: {
        "mutable-content": 1,
      },
    },
    fcm_options: {
      image:
        "https://i.pinimg.com/originals/9b/e2/de/9be2de9e79ddbef252270a2956243f02.jpg",
    },
  },
  webpush: {
    headers: {
      image:
        "https://i.pinimg.com/originals/9b/e2/de/9be2de9e79ddbef252270a2956243f02.jpg",
    },
  },
  data: { score: "850", time: "2:45" },
  token:
    "currentToken fNdJbrBhnL9mWlH8wmfj6R:APA91bGK6duoioCS8KQvb1Ais9ubkPoAWaHxzuucoI8uYH5Wuo_PC2g-1rCnf3rHeResCviAC0-iPzLxcX8uHE5il8Ji28Aq4UAOcjSv8TZ6TNUqs84F-j-Zv-r_c8IlXTUXWmOHzxLZ",
};

const sendNotificationToRegistrationToken = () => {
  // Send a message to devices subscribed to the provided topic.
  MESSAGING.send(messageRegistrationTokens)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

// sendNotificationToRegistrationToken();

const subscribeToTopic = async () => {
  try {
    const x = await MESSAGING.subscribeToTopic(
      [
        "fNdJbrBhnL9mWlH8wmfj6R:APA91bGK6duoioCS8KQvb1Ais9ubkPoAWaHxzuucoI8uYH5Wuo_PC2g-1rCnf3rHeResCviAC0-iPzLxcX8uHE5il8Ji28Aq4UAOcjSv8TZ6TNUqs84F-j-Zv-r_c8IlXTUXWmOHzxLZ",
      ],
      "promotions"
    );
    console.log(x);
  } catch (err) {
    console.log(err);
  }
};

// subscribeToTopic();

const topic = "promotions";

const message = {
  notification: {
    title: "$FooCorp up 1.43% on the day",
    body: "$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.",
    image:
      "https://i.pinimg.com/originals/9b/e2/de/9be2de9e79ddbef252270a2956243f02.jpg",
  },
  data: {
    score: "850",
    time: "2:45",
  },
  topic: topic,
};

const sendNotificationToTopic = () => {
  // Send a message to devices subscribed to the provided topic.
  MESSAGING.send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

// sendNotificationToTopic();

app.listen(3008, () => {
  console.log("Server is listening on port 3005");
});
