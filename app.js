var express = require("express");
    app = express();
    http = require("http");
    server = http.createServer(app);
    bodyParser = require("body-parser");
    methodOverride = require("method-override");
var mongoose = require("mongoose");
var TVShowCtrl = require("./controllers/tvshows");

// API routes
var tvshows = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

tvshows
  .route("/tvshows")
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);
  
  tvshows
  .route("/tvshows/:id")
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);


var router = express.Router();

router.get("/", function(req, res){
    res.send("Hellor World!");
});

app.use(router);
app.use("/api", tvshows);

mongoose.connect("mongodb://localhost/tvshows", function(err, res){
    console.log("entro a la base de datos");
    if (err) {
        console.log("ERROR: connectiong to Database." + err);
    }
    app.listen(3000, function(){
        console.log("Node server runnin on http://localhost:3000");
    })
});