const  express =  require("express");
const mongoose =  require("mongoose");
const http = require('http')
const router = require("./routes");

const app = express();
const port = 7000;

mongoose.connect("mongodb+srv://{username}:{password}@cluster0.tv95o.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(res => console.log(`Connection Succesful `))
.catch(err => console.log(`Error in DB connection ${err}`));

//body-parser config;
app.use(express.json());
  
//body-parser config;
app.use("/", router);

app.listen(port, () => {
    console.log(`Application is listening at port ${port}`);
});
