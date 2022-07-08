const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const hbs = require('hbs');

const viewPath = path.join(__dirname, '../../templates/views');
const pathForCss = path.join(__dirname, '../public');
const partialPath = path.join(__dirname,  '../../templates/partials');

app.use(express.static(pathForCss));

app.set('view engine', 'hbs');
app.set('views', viewPath);

hbs.registerPartials(partialPath);

app.get("/", (req, res)=>{
   res.render('index');
})
app.get("/weather", (req, res)=>{
   res.render('weather');
})
app.get("/about", (req, res)=>{
   res.render('about');
})
app.get("*", (req,res)=>{
   res.render('error');
})


app.listen(port, ()=>{
   console.log(`Listening to the port at ${port}`);
});