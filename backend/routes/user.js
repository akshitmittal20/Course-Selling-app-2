const mongoose = require ("mongoose")
mongoose.connect("mongodb+srv://akshitmittal20:pSD9tpjvHdOlEVax@290224.dl6gadx.mongodb.net/")
const express = require("express");
const userMiddleware = require("../middleware/user");
const { user, course } = require("../db");
const { JWT_SECRET } = require("../config");
const router = express.Router();
const jwt = require("jsonwebtoken")

router.post(('/signup'), (req, res)=>{
    //add user signup logic here 

    const username = req.body.username;
    const password = req.body.password;
    user.create({
        username,
        password
    })
    res.json({
        msg:"User created successfully"
    })
})

router.post(('/signin'), async (req, res)=>{
    //Logs in a user account.
    console.log(JWT_SECRET)
    const username = req.body.username;
    const password = req.body.password;

    const myUser = await user.find({
        username,
        password
    })

    if(myUser){
        const token = jwt.sign({
            username
        }, JWT_SECRET)
        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            msg:"wrong username and password"
        })
    }
})

router.get(('/courses'), async(req,res)=>{
    //implement listing all the courses logic here

    const allCourses = await course.find({})
    res.send(allCourses)
})

router.post(('/courses/:courseId'), userMiddleware, async (req,res)=>{
    //implement course purchase logic here

    const courseId = req.params.courseId        //extract value from a url like this
    const username = req.username;
    console.log(username)
    //zod can be added here
    try {await user.updateOne({        // in this update one funcion, the 1st qrgument is the filter on whcih we want to update the value, adn the 2nd argument is the updateing parameter whic we want to update
        username: username
    },
    {
        $push :{
            purchasedCourses : new mongoose.Types.ObjectId(courseId) 
        }
    })}
    catch(e){
        console.log(e)
    }       
    //in the above code, we have put the try cach to check the error exactly, and it will only work with await syntanx or promise syntax. As await syntax is more feasable, we will use that. 
    res.json({msg:"purchase complete"})
})

router.get(('/purchasedCourses'), userMiddleware, async(req, res)=>{
    //implement listing all the purchased courses logic here
    const thisisUser = await user.findOne({
        username: req.headers.username
    })
    console.log(thisisUser.purchasedCourses)

    try{
        const courses = await course.find({
            _id:{
                $in : thisisUser.purchasedCourses
            }   //this line means to find the courses model where the courseid is in the thisisUser.purchasedCourses
        })
        res.send(courses)
    }
    catch(e){
        console.log(e)
    }
})

module.exports= router

