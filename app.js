const express = require("express");
const bodyParser = require("body-parser");
const request = ("request");
const https = require("https");
require("dotenv").config();

console.log()


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.FirstName;
    const lasttName = req.body.LastName;
    const email = req.body.Email;

    const data = {
        members: [
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lasttName,

                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    // https://us9.api.mailchimp.com/3.0/lists/8283cf3895
    // https://us9.api.mailchimp.com/3.0/8283cf3895
    
    const url = "https://us9.api.mailchimp.com/3.0/lists/8283cf3895";

    const options = {
        method: "POST",
        auth: "niyus:"+process.env.API_KEY+""
    }

    const requested = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function (data) {
            const datas = (JSON.parse(data));
           
        })
    })

    requested.write(jsonData);
    requested.end();

})

app.post("/failure", function (req,res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function () {
    console.log("Server is running at localport 3000");
})


// WEBSITE URL
// https://newsletter-emails.onrender.com/