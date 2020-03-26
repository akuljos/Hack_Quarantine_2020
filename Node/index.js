const MongoClient = require('mongodb');

const uri = "mongodb+srv://readwrite:hack4Coronachan@bot-9hvoo.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  if(err) throw err;
  console.log('Connected');
  const collection = client.db("coronavirus_cases_db").collection("cases_by_country").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    client.close();
  });
});
