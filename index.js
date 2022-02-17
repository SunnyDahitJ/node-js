const express = require("express");
var cors = require("cors");
const fs = require("fs");
var mysql = require('mysql2');

// connecting to database
 mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Freakin@104',
  database: 'infrastructure'
}).connect((err) => {
  if (err) { console.log("DB Connection Failed."); return }

  // Initializing Exprress Server
  const app = express();
  app.use(cors());
  
  //Routes/Apis
  app.use("/readFile", async (req, res) => {
    res.end(await fs.readFileSync("C:\\Users\\dahit\\Desktop\\n\\nikit\\node-main\\data.json"))
  });
  app.use("/writeFile", async (req, res) => {
    var id = req.query.id
    var name = req.query.name
    if (id && name) {
      var data = JSON.parse(await fs.readFileSync("./data.json"))
      data.data.push({ id: id, name: name })
      await fs.writeFileSync("./data.json", JSON.stringify(data))
      res.json({ status: "File Updated." })
    } else {
      res.end("Error Occured")
    }
  });

  // display
  app.get("/employees", (req, res) => {
    connection.query("SELECT * FROM employee;", (err, results, fields) => {
      if (err) return res.json({ error: err.message })
      res.json(results)
    })
  })

// search
  app.get("/employee/:id", (req, res) => {
    if(!req.params.id){
      res.json({error: "Id required"})
      return
    }
    var id = req.params.id
    connection.query("SELECT * FROM employee WHERE emp_id = "+id, (err, results, fields) => {
      if (err) return res.json({ error: err.message })
      res.json(results)
    })
  })

  // add
  app.get("/addEmployee", (req, res) => {
    if(!req.query.id){
      res.json({error: "Id required"})
      return
    }
    if(!req.query.name){
      res.json({error: "Name required"})
      return
    }
    var id = req.query.id
    var name = req.query.name
    connection.query(`INSERT INTO employee VALUES(${id},'${name}','Dahit','M',1234567890,'Koramangala','SDE6','22')`, (err, results, fields) => {
      if (err) return res.json({ error: err.message })
      res.json(results)
    })
  })

  // update
  app.get("/updateEmployee", (req, res) => {
    if(!req.query.id){
      res.json({error: "Id required"})
      return
    }
    if(!req.query.name){
      res.json({error: "Name required"})
      return
    }
    var id = req.query.id
    var name = req.query.name
    connection.query(`UPDATE employee SET fisrt_name = '${name}' WHERE emp_id = ${id}`, (err, results, fields) => {
      if (err) return res.json({ error: err.message })
      res.json(results)
    })
  })

  // delete
  app.get("/deleteEmployee", (req, res) => {
    if(!req.query.id){
      res.json({error: "Id required"})
      return
    }
    
    var id = req.query.id
    connection.query(`DELETE FROM employee WHERE emp_id = ${id}`, (err, results, fields) => {
      if (err) return res.json({ error: err.message })
      res.json(results)
    })
  })
  app.use("*",(req, res)=>{
    res.end("path not defined")
  })

  //Port
  const port = 8000;

  //Starting a server
  app.listen(port, () => {
    console.log(`*** SERVER STARTED AT PORT ${port} ***`);
  });

})
