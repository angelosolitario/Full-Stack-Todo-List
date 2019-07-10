var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer');

mongoose.connect("mongodb://localhost:27017/todo_app", {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

var todoSchema = new mongoose.Schema({
    title: String,
    isCompleted: {type: Boolean, default: false}
});

const TODO = mongoose.model("Todo",todoSchema);


//index
app.get("/",function(req,res){
    TODO.find({}, function(err,allTodos){
        if(err) console.log(err);
        else{
            res.render("home", {todos: allTodos});
        }
    });
});

//create
app.post("/",function(req,res){
    var newTodo = {title: req.body.newTodo};
    if(newTodo.title!==""){
        TODO.create(newTodo,function(err,todo){
            if(err) console.log(err);
            else{
                res.redirect("/");
            }
        });
    }else{
        res.redirect("/");
    }
});

//destroy
app.delete("/:id", function(req,res){
    TODO.findByIdAndRemove(req.params.id, function(err){
        if(err) console.log(err);
        else{
            res.redirect("/");
        }
    });
});



app.listen(3000, function(){
    console.log("Serving on port 3000");
});