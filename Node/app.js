const MongoClient = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const { CommentStream } = require("snoostorm");

const uri = "mongodb+srv://readwrite:hack4Coronachan@bot-9hvoo.mongodb.net/test?retryWrites=true&w=majority";

require('dotenv').config();
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

const r = new Snoowrap({
	userAgent: 'some-description',
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	username: process.env.REDDIT_USER,
	password: process.env.REDDIT_PASS
});

const stream = new CommentStream(r, { subreddit: "testingground4bots", results: 25 });

stream.on("item", comment => {
	if (comment.body.includes('u/covid19bot')) {
		let countryNumber = comment.body.substring(13);
		console.log(countryNumber);

		MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true },
		  function(err, client) {
		    if(err) throw err;
		    console.log('Connected');

		    const collection = client.db("coronavirus_cases_db").collection("cases_by_country");

		    //replace ObjectId with new data
		    const data = collection.findOne({_id: new ObjectId("5e7cf75367b5549bf14745b4")}, function(err, result) {
		      if (err) throw err;
		      comment.reply(JSON.stringify(result.Countries[countryNumber]));
		      client.close();
					console.log('Disconnected');
		    });
		});
	}
})
