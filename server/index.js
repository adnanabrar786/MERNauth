const express = require("express")
const mongoose = require("mongoose")

const app = express();

const userRouter = require("./routes/userRoutes")
const customerRouter = require("./routes/customerRoutes")

const cors = require('cors')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5000;



app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"] ,
        // use acess token readable for Login users
        credentials : true
    })
)
app.use(cookieParser())



app.get("/", (req, res) => {
    res.send("hello")
})

// atlast 
// mongoose.connect('mongodb+srv://myusername:adnan1245abrar@dev.pucwl.mongodb.net/dev?retryWrites=true&w=majority',
//     {useNewUrlParser : true}
//     //  ,
//     // {useUnifiedTopology : true}
//     )

mongoose.connect('mongodb://localhost:27017/auth'
    , { useNewUrlParser: true }
    //  ,
    // {useUnifiedTopology : true}
)
    .then(() => {
        console.log("database compass is connected");
    }).catch((err) => {
        console.log(` Error ${err}`);
    })


    app.get('/', (req, res) => {
        res.send('Hello World!')
      })

      
app.use("/auth", userRouter)
app.use("/customer", customerRouter)


app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
})
