const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");

let url = "mongodb+srv://Adrien:Bambibeary.12@cluster0.bs6tn.mongodb.net/StockTickerApp?retryWrites=true&w=majority";


csvtojson()
  .fromFile("companies.csv")
  .then(csvData => {
    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, dbInfo) => {
        if (err) throw err;

        dbInfo
          .db("StockTickerApp")
          .collection("companies")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            dbInfo.close();
          });
      }
    );
  });



