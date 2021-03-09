const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors'); 
const path = require('path')
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/schema');
const resolvers = require('./resolvers/resolvers')
const bodyParser = require('body-parser')
const mongoSchema = require('./schemas/metricsModel.js')
const app = express();
const url = "mongodb+srv://KubraKai:codesmith@cluster0.btqz2.mongodb.net/kubrakai?retryWrites=true&w=majority";
const bcrypt = require('bcrypt')

app.set('view-engine','ejs')
const connect = mongoose.connect(url, { useNewUrlParser: true });
connect.then((db) => {
      console.log('Connected correctly to server!');
}, (err) => {
      console.log(err);
});
app.use(bodyParser.json());
app.use('*', cors());
const fakeDbContent = []
//Jordan added this
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.get("/", (req, res) => {
  res.render('index.ejs',{name:'user'})
  // res.sendFile(path.resolve(__dirname, "../index.html"));
});
app.get('/login',(req,res)=>{
  res.render('login.ejs')
})
app.post('/login',(req,res)=>{
 
})
app.get('/register',(req,res)=>{
  res.render('register.ejs')
})
app.post('/register', async (req,res)=>{
 try{
 const hashPassword = await bcrypt.hash(req.body.password, 10)
 fakeDbContent.push({
   id: Date.now().toString(),
   name:req.body.name,
   email: req.body.email,
   password:hashPassword
 })
 console.log('im about to redirect')
 res.redirect('/login') 
 } catch {
   console.log('catch')
res.redirect('/register')
 } 
 console.log(fakeDbContent)
})

const server = new ApolloServer({ 
  introspection: true, 
  playground: true,
  resolvers, 
  typeDefs });

// const mongoServer = new ApolloServer({
//   interospection: true,
//   playgroud: true,
//   typeDefs: mongoSchema,
//   resolvers
// })

server.applyMiddleware({ app });

app.use((req, res) => {
  res.status(200);
  res.send('Hello!');
  res.end();
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)