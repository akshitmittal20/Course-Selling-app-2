const express = require("express");
const app = express();
app.use(express.json());


const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const port = 3000;

app.listen(port, ()=>{
    console.log(`Server is running ont he port numebr - ${port}`)
})
