const express = require ("express") 
const adminMiddleware = require("../middleware/admin")
const router = express.Router()
const {JWT_SECRET} = require("../config")

const {admin, course, user}= require("../db/index")
const jwt= require ("jsonwebtoken")

router.post(('/signup'), async (req,res)=>{
    //route for the signup of the admin logic here
    const username = req.body.username;
    const password = req.body.password;
    await admin.create({
        username,
        password    //same as above
    })
    res.json({
        msg:"Admin created succesfully"
    })
})

router.post(('/signin'), async(req,res)=>{

    console.log(JWT_SECRET)
    const username = req.body.username;
    const password = req.body.password;

    const myuser= await user.find({ 
        username,
        password
    })
    if(myuser){
        const token = jwt.sign({
            username
        }, JWT_SECRET)
        res.json({
            token
        })
    }
    else{
        res.status(401).json({
            msg:"wrong username or password"
        })
    }
    
})

router.post(('/courses'), adminMiddleware, async (req,res)=>{
    //impelement course creation logic here
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    //zod can be used here!!

    const newCourse = await course.create({
        title,
        description,
        imageLink,
        price
    })

    console.log(newCourse)
    res.json({
        msg:"Course Created successfully", 
        courseId:newCourse._id
    })

})

router.get(('/courses'), adminMiddleware, async(req,res)=>{
        //implement fetching all the courses logiv here

    const allCourses = await course.find({
        //we want al the courss , that's why we will not send the filter for courses here. else we could have done like
        // price: 10000
    })
    res.send(allCourses)
});

module.exports= router;