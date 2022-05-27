const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {

        console.log(req.cookies.token);

        const token = req.cookies.token ;

        // const token = req.cokies.token;

        if (!token)
            return res.status(401).json({
                errorMessage: "Unautharized"
            })

         const verified = jwt.verify(token, "secret")

        // console.log(verified);
         req.user = verified.user
         next()

    } catch (err) {
        console.error(err);
        res.status(401).json({
            errorMessage: "Unautharized"
        })
    }
}

module.exports = auth;