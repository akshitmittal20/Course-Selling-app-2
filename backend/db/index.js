const mongoose = require ("mongoose")
mongoose.connect("mongodb+srv://akshitmittal20:pSD9tpjvHdOlEVax@290224.dl6gadx.mongodb.net/")

const adminSchema = new mongoose.Schema({
    username : String,
    password: String,
})

const userSchema = new mongoose.Schema({
    username : String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'course'
    }]
})


const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number
})


const admin = mongoose.model('admin', adminSchema)
const user = mongoose.model('user', userSchema)
const course = mongoose.model('course', courseSchema)

module.exports={
    admin,
    user,
    course
}
