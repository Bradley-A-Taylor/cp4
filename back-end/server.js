const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const mongoose = require('mongoose');
// connect to the database
mongoose.connect('mongodb://localhost:27017/dating', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const dateSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    catergory: String,
    cost: String,
    time: String,
    rating: Number,
})

const commentSchema = new mongoose.Schema({
    associatedIdea: String,
    associatedUser: String,
    date: String,
    name: String,
    body: String
})

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  first_name: String,
  last_name: String,
  savedIdeas: [{id: String}],
  myIdeas: [{id: String}]
})

  const Date = mongoose.model('Date', dateSchema);
  const Comment = mongoose.model("Comment", commentSchema);
  const User = mongoose.model("User", userSchema);

  app.listen(3001, () => console.log('Server listening on port 3001!'));

  app.delete('/api/ideas/:id', async (req, res) => {
    try{
      const user = await User.findById(req.header('Authorization'));
      if(user){
        index = user.myIdeas.indexOf(req.params.id);
        if (index === -1){
          return res.sendStatus(404);
        }
        user.myIdeas.splice(index, 1);
        await user.save();
        return res.send(user.myIdeas);
      }
      res.sendStatus(403);
    } catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.delete('/api/saved/:id', async (req, res) => {
    try{
      const user = await User.findById(req.header('Authorization'));
      if(user){
        index = user.savedIdeas.indexOf(req.params.id);
        if (index === -1){
          return res.sendStatus(404);
        }
        user.savedIdeas.splice(index, 1);
        await user.save();
        return res.send(user.savedIdeas);
      }
      res.sendStatus(403);
    } catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.post('/api/saved', async (req, res) =>{
    try{
      const user = await User.findById(req.header('Authorization'));
      if(user){
        user.savedIdeas.push(req.body.idea);
        return res.sendStatus(200);
      }
      res.sendStatus(403);
    } catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.post('/api/comments', async (req, res) => {
    try{
      const comment = new Comment ({
        associatedIdea: req.body.associatedIdea,
        associatedUser: req.body.associatedUser,
        date: req.body.date,
        name: req.body.name,
        body: req.body.body
      });
      await comment.save();
      res.send(comment);
    } catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/comments/:id', async (req, res) => {
    try{
      const comments = await Comment.find({associatedIdea: req.params.id});
      res.send(comments);
    } catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/user/ideas', async (req, res) => {
    try{
      const user = await User.findById(req.header('Authorization'));
      if(user){
        return res.send(user.myIdeas);
      }
      res.sendStatus(403);
    } catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/user/saved', async (req, res) => {
    try{
      const user = await User.findById(req.header('Authorization'));
      if(user){
        return res.send(user.savedIdeas);
      }
      res.sendStatus(403);
    } catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/user/comments', async (req, res) => {
    try{
      const comments = await Comment.find({associatedUser: eq.header('Authorization')});
      res.send(comments);
    } catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.post('/api/register', async (req, res) => {
    try{
      const existingUser = await User.findOne({
      username: req.body.username
      });
      if (existingUser)
        res.status(403).send({
        message: "username already exists"
      });
      const user = new User({
          username: req.body.username,
          password: req.body.password,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          savedIdeas: [],
          myIdeas: []
      });
      await user.save();
      res.send({
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        auth: user._id
      });
    }
    catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.post('/api/login', async (req, res) => {
    try{
      const user = await User.findOne({
        username: req.body.username,
      });
      if (!user) {
        return res.status(403).send({
          message: "username or password is wrong"
        })
      }
      if (req.body.password != user.password){
        return res.status(403).send({
          message: "username or password is wrong"
        })
      }
      res.send({
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        auth: user._id
      });
    } catch (error){
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/date_ideas', async (req, res) => {
    try{
      let date_ideas = await Date.find();
      res.send({
        date_ideas: date_ideas
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/date_ideas/:id', (req, res) => {
    try{
      Date.findById(req.params.id, (error, date) =>{
        if (error) {
          res.sendStatus(404);
        }
        else{
          res.send(date);
        }
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.post('/api/photos', upload.single('photo'), async (req, res) => {
    if (!req.file) {
      return res.sendStatus(400);
    }
    res.send({
      path: "/images/" + req.file.filename
    });
  });

  app.post('/api/date_ideas', async (req, res) => {
    const date = new Date({
      title: req.body.title,
      description: req.body.description,
      image: req.body.description,
      catergory: req.body.catergory,
      cost: req.body.cost,
      time: req.body.time,
      rating: req.body.rating
    });
    try {
      await date.save();
      res.send(date);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.delete('/api/date_ideas/:id', async (req, res) => {
    try {
      await Date.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.put('/api/date_ideas/:id', async (req, res) => {
    try{
      let date = await Date.findOne({
        _id: req.params.id
      });
      date.title = req.body.title;
      date.description = req.body.description;
      date.image= req.body.description;
      date.catergory = req.body.catergory;
      date.cost = req.body.cost;
      date.time = req.body.time;
      date.rating = req.body.rating;
      await date.save();
      res.sendStatus(200);
    } catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });
