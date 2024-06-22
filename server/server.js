const app=require('./app')
const {connectMongoDb}= require('./config/database')

connectMongoDb();
app.listen(process.env.PORT,()=>{
    console.log(`Server is Connected to http://localhost:${process.env.PORT}`)
})
