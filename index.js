const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    
    return Recipe.deleteMany()
  })
  .then(() => {
   return Recipe.create({
      title:"Pasta",
      cuisine:"Italian" }) 
   })

   .then(titleRecipe => {
     console.log(titleRecipe.title);
   }) 

 
 .then(() => {
   return Recipe.insertMany(data)
 }) 

 .then(recipes => {
  recipes.forEach(recipe => console.log(recipe.title));
 })

.then( () => {
  return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100}).then(console.log('success'))
})

.then( () => {
  return Recipe.deleteOne({title:"Carrot Cake"}).then(console.log('yay!'))
})

.then( () =>
mongoose.connection.close()
)


  .catch(error => {
    console.error('Error connecting to the database', error);
  });



