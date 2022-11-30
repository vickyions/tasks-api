const app = require("./app");
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017"
mongoose.connect(MONGODB_URI, {dbName: "tasksdb"}, err => {
    if (err) console.dir(err);
    else console.log("connected to DB");
})

const PORT = 8080;
app.listen(PORT, err => {
    if (err) console.dir(err);
    else console.log("server listening on ", PORT);
})
