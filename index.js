const express=require('express');
const  runMain  = require('module');
const { MongoClient } = require('mongodb');
const ObjectId=require('mongodb').ObjectId
require('dotenv').config()
const cors = require('cors')
const app=express();

const port=process.env.PORT|| 5000;
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lreh2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
         const database=client.db('fantasyKingdom');
         const serviceCollection=database.collection('services');
         const orderCollection=database.collection('order');
       //  get api
  
       app.get('/products',async(req,res)=>{
           const cursor=serviceCollection.find({})
           
           const service=await cursor.toArray()
           res.json(service)
       })
       app.get('/products/:id',async(req,res)=>{
           const id=req.params.id;
           const query={_id:ObjectId(id)};
           const product=await serviceCollection.findOne(query)
           console.log("we are offring  pro",id);
           res.send(product)
       })
    //post 
    app.post('/addService',async(req,res)=>{
        const user=req.body;
        const result=await serviceCollection.insertOne(user)
        res.send(result)
        console.log(user);
    })  
    
    // order post 
    app.post('/controlOrder',async(req,res)=>{
        const user=req.body;
        const result=await orderCollection.insertOne(user)
        res.send(result)
        console.log(result);
        console.log(user);
    })

  app.post('/services',async(req,res)=>{
      console.log("hit the post api")
      const service=req.body;
      const result=await serviceCollection.insertOne(service)
      res.json(result)
  })
    }
    finally{
        // await client.close();
    }

}
run().catch(console.dir);
app.get('/',(req,res)=>{
    res.send('hello world');
    console.log("fantasy");

})
app.listen(port, () => {
    console.log('Example app listening at',port)
  })