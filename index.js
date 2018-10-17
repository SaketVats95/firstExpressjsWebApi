const http=require("http");
const express=require("express");
const app=express();
const Joi=require("joi");

app.use(express.json());
var emps=[
    {id:1, name:"Saket" },
    {id:2, name:"Saket2" },
    {id:3, name:"Saket3" },
    {id:4, name:"Saket4" }
];
app.get('/',(req,res)=>{
    res.send("Hello Saket Vats");
});

app.get('/api/employees', (req,res)=>
{
    res.send(JSON.stringify(emps));
});

app.get('/api/employees/:id',(req,res)=>
{
    const emp=emps.find(a=>a.id===parseInt(req.params.id));
    if(!emp) res.status(404).send(`THe employee id ${req.params.id} is not Found`);
    res.send(emp);
    
});

app.post('/api/employees',(req,res)=>
{
    const schema={
        name: Joi.string().min(4).required()
    }
    const result=Joi.validate(req.body.name,schema.name);
    console.log(result);
    if(result.error)
    {
        res.status(400).send(result.error);
        return;
    }
    const emp={id : emps.length+1,
    name: req.body.name};

    emps.push(emp);
    res.send(emp);
});
  
const port=process.env.PORT||3000;

app.listen(port,()=>console.log(`Listening to the port ${port}`) );