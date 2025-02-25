const express = require("express");
const path = require("path")
const bodyParser = require("body-parser")
const session = require("express-session") 
const passport = require("passport")
const sql = require("mssql")
const app = express();
const cors = require("cors")
require("dotenv").config()




app.use(cors())

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
      encrypt: process.env.DB_OPTIONS_ENCRYPT === "true",
      enableArithAbort: true,
    },
  };
  
  
  
  
  app.use(
    session({
      secret: "739f6d87048e4b3951d9d59acfaf441dd0a45fa43d6f4df9fb89b4659ea10afb",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: null,secure:false },
    })
  );
  
  
  app.use(passport.initialize())
  app.use(passport.session())
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((id, done) => {
    done(null, id);
  });
  
  app.use(bodyParser.urlencoded({extended:false}))
  app.use(bodyParser.json())
  
  app.use(express.static(path.join(__dirname,"/Public")))
  app.use(express.urlencoded({extended:true}))
  
  
  const main = require("./Router/main")

  
  sql.connect(config).then(()=>{
    app.use("/",main)

  
  }).catch(err=>{
    console.log("Could Not Connect to Database",err)
  }).catch(err=>{
    console.log("sql server connect error")
  })
  
  
  
  app.listen(3002, (err) => {
    if (err) console.log("server pasif");
  
    console.log("server active");
  });
  