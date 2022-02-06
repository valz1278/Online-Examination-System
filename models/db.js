const mongoose = require("mongoose");

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
  },
  (err) => {
    if (err) {
      console.error(err);
      console.error("ERROR CONNECTING TO DB");
    } else console.log("CONNECTED TO DB");
  }
);

mongoose.set("useFindAndModify", false);
