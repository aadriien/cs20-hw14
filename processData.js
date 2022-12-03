const mongodb = require("mongodb").MongoClient;

let url = "mongodb+srv://Adrien:Bambibeary.12@cluster0.bs6tn.mongodb.net/StockTickerApp?retryWrites=true&w=majority";


express = require("express");
bodyParser = require("body-parser");
app = express();

app.use(bodyParser.urlencoded({ extended: true })); 

app.post("/process", (req, res) => {
    res.send(`Input is: ${req.body.ticker} ${req.body.company}.`);
    
    
    mongodb.connect(
        url, 
        { useUnifiedTopology: true }, 
        function(err, dbInfo) {
            if (err) {
                console.log("Connection error: " + err); 
                return; 
      	     }
      
             var db = dbInfo.db("StockTickerApp");
             var collection = db.collection("companies");
          
             collection.find({}).toArray(function(err, info) {
                 if (err) {
                     console.log("Connection error: " + err); 
          	     }
                 else {
                     var found = "false"; 
                    
                     info.forEach(function(result) {
                          
                         if (req.body.company == result.Company) {
                             console.log(result.Company + ", " + result.Ticker);
                             found = "true";
                         }
                         else if (req.body.ticker == result.Ticker) {
                             console.log(result.Company + ", " + result.Ticker);
                             found = "true";
                         }
                         
                     }) 
                     if (found == "false") {
                         console.log("Sorry, no match was found.");
                     }
                 }
             });

          //db.close();
    }); 
});

port = 8080;
app.listen(port, () => {
  console.log(`Server running on port${port}`);
});




