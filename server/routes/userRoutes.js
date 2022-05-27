const express = require("express")
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const User = require("../models/userModel")

// register
router.post("/", async (req, res) => {

    //  check in postman
    // {
    //     "email": "adnan3@gmail.com",
    //     "password": "password",
    //     "passwordVerify": "password"
    // }

    try {
        const { email, password, passwordVerify } = req.body;

        if (!email || !password || !passwordVerify)
            return res.status(4000).json({
                errorMessage: "please enter all reaquire field"
            })

        if (password.length < 6)
            return res.status(4000).json({
                errorMessage: "Password atleast 6 Character"
            })

        if (password !== passwordVerify)
            return res.status(4000).json({
                errorMessage: "enter a same Password"
            })

        const exitingUser = await User.findOne({ email })
        if (exitingUser)
            return res.status(4000).json({
                errorMessage: "This User Already Exists"
            })



        //  Hash Passwor

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        //  save a new user account in db

        const newUser = new User({
            email, passwordHash
        })

        const savedUser = await newUser.save()

        // //  log the user in
        const token = jwt.sign(
            {
                User: savedUser._id,
            },
            //  process.env.JWT_SECERET ,
            "secret",
            {
                expiresIn: "1h"
            }
        );
        console.log(token);

        // send a token in HTTP-only cookies

        res.cookie("token", token, {
            httpOnly: true
        }).send()
        //    .setHeader('Content-Type', 'text/plain');

    } catch (err) {
        console.log(err);
        res.status(5000).send();
    }
});



// login
router.post("/login", async (req, res) => {
    try {

        // check in Postman
        // {
        //     "email": "adnan@gmail.com",
        //     "password": "password"    
        // }

        const { email, password } = req.body;
        if (!email || !password)
            return res.status(4000).json({
                errorMessage: "please enter all reaquire field"
            })
        const exitingUser = await User.findOne({ email })
        if (!exitingUser)
            return res.status(4001).json({
                errorMessage: "wrong email or password"
            })
        const passwordCorrect = await bcrypt.compare(
            password,
            exitingUser.passwordHash
        );
        if (!passwordCorrect)
            return res.status(401).json({
                errorMessage: "wrong email or password"
            })


        //  log the user in
        const token = jwt.sign(
            {
                User: exitingUser._id,
            },
            //  process.env.JWT_SECERET ,
            "secret",
            {
                expiresIn: "1h"
            }
        );
        console.log(token);

        // send a token in HTTP-only cookies

        res.cookie("token", token, {
            httpOnly: true
        }).send()

    } catch (err) {
        console.log(err);
        res.status(5000).send();
    }
})



// logout
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send()
})


// any user is already logged In 
router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token)return  res.json(false)
        jwt.verify(token, "secret")
        res.send(true)

    } catch (err) {
        console.error( `loggedIn : ${err}`);
        res.json(false)
    }
})



module.exports = router;