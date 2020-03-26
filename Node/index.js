const MongoClient = require('mongodb');
const ObjectId = require('mongodb').ObjectID;

const uri = "mongodb+srv://readwrite:hack4Coronachan@bot-9hvoo.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true },
  function(err, client) {
    if(err) throw err;
    console.log('Connected');

    const collection = client.db("coronavirus_cases_db").collection("cases_by_country");

    //replace ObjectId with new data
    const data = collection.findOne({_id: new ObjectId("5e7cf75367b5549bf14745b4")}, function(err, result) {
      if (err) throw err;
      console.log(result.Countries[100]);
      client.close();
    });
});
