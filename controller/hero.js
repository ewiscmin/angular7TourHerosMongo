//Require the express package and use express.Router()
var Hero = require('../model/Hero');

exports.test = function (req, res) {
    res.send('Greetings from My Hero controller!');
};


exports.create = function (req, res, next) {
    console.log("In heros create in controller");
    console.log(req.body)
    console.log(req.params)

    var hero = new Hero(
        {
            name: req.body.name,
            id: 1
        }
    );

    Hero.countDocuments(function (err, count) {
        hero.id = ++count;
        hero.save(function (err) {
            if (err) {
                return next(err);
            }
            console.log("Hero _Id: " + hero._id)
            console.log("Hero id: " + hero.id)
            console.log("Hero name: " + hero.name)
            res.send(hero);
        })
    });
}


exports.read = function (req, res, next) {
    console.log("read in controller: " + req.params.id)
    Hero.findOne({id:req.params.id}, function (err, hero) {
        if (err) return next(err);
        res.json(hero);
    })
};
exports.heroes = (req, res) => {
    console.log("In heros in controller");
    Hero.find({}, (err, docs) => {
        if (err) { return console.error(err); }
        console.log("In heros in controller " + docs[0]);
        res.json(docs);
    });
}


exports.update = function (req, res, next) {
    console.log("In update in controller " + req.body.id);
    Hero.findOneAndUpdate({id:req.body.id}, { $set: req.body }, function (err, hero) {
        if (err) return next(err);
        res.json('Hero udpated.');
    });
};

exports.delete = function (req, res, next) {
    console.log("Id provided: " + req.params.id)
    //Here, we want to delete by id, not _id
    Hero.deleteOne({id:req.params.id}, function (err) {
        if (err) return next(err);
        res.json("Hero Deleted");
    });
};