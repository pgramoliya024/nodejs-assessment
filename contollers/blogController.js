const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const blogSchema = require('../models/blogsModel');

dotenv.config();

const blogDataCollection = mongoose.model('blog', blogSchema);


exports.addBlog = (req, res, next) => {
    console.log("Add blog API is Called");
    
    let blogObj;

    blogObj = new blogDataCollection({
        title : req.body.title,
        description : req.body.description,
        modifyDate : req.body.modifyDate,
        status : req.body.status,
        category :req.body.category,
        userId : req.body.userId
    });

    if(blogObj.status === "Publish") {
        blogObj.publisedDate = req.body.publisedDate
    }

    blogObj.save((err, blog) => {
        if(err) {
            console.log(err);
            res.send(err);
        }else {
            console.log(blog);
            res.send(blog);
        }
    });
}


exports.updateBlog = (req, res, next) => {
    console.log("update blog API is Called");
    
    let userId = req.body.userId;
    let role = req.body.role;
    let blogId = req.body.blogId;


    let blogData = blogDataCollection.findOne({ _id : blogId});

    if((blogData.userId == userId && role == "User") || role == "Admin"){        
        let blogData = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            category : req.body.category,
        }
    
        if(blogData.status === "Publish") {
            blogData.publisedDate = new Date();
        }

        blogDataCollection.findByIdAndUpdate(blogId, blogData, (err,data) => {
            if(err){
                console.log(err);
                res.status(400).send(err)
            }else{
                console.log(data)
                res.status(200).json({ data :data})
            }
        })

    }else{
        res.send('user not exist or has no permission');
    }
}


exports.deleteBlog = async (req, res, next) => {
    console.log("delete blog API is Called");
    
    let userId = req.body.userId;
    let role = req.body.role;
    let blogId = req.body.blogId;


    let blogData = blogDataCollection.findOne({ _id : blogId});

    if((blogData.userId == userId && role == "User") || role == "Admin"){        
        let _id = mongoose.Types.ObjectId(blogId);
        await blogDataCollection.findByIdAndDelete(_id);
        res.send("data removerd");
    }else{
        res.send('user not exist or has no permission');
    }

    


}