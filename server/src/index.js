require("dotenv").config();
const port = process.env.PORT || 5003;
const app = require("./app");

const connectDB = require("./config");

async function start() {
  try {
    await connectDB.db(process.env.DB_CONNECTION_STRING);
    app.listen(port, () =>
      console.log(`Server connected to  http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
}

start();
