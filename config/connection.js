const mongoose = require("mongoose")

const connectionString = process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then((res)=>{
    console.log("mongoose atlas successfully connected with cookpedia server");
}).catch(err=>{
    console.log(("mongoose connection failed!!!"));
    console.log(err);
})