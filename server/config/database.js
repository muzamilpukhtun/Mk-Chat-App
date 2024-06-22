const mongoose=require('mongoose')


exports.connectMongoDb=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(con=>console.log(`Database Connected ${con.connection.host}`))
    .catch(e=>console.log(e))
}