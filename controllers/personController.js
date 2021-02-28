const mongoose = require("mongoose");
const Rol = mongoose.model("Rol");
const User = mongoose.model("User");
const Person = mongoose.model("Person");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.register = async (req, res) => {
  const { 
          firstname,
          lastname,
          industry,
          jobposition,
          phone,
          salary,
          latitude,
          longitude,
          photo,
          email, 
          password,
        } = req.body;


  const person = new Person({
    firstname,
    lastname,
    industry,
    jobposition,
    phone,
    salary,
    latitude,
    longitude,
    photo
  }); 
  
  const user = new User({
    person:person,
    email,
    password: sha256(password + process.env.SALT),
  });

  await person.save();
  await user.save();

  res.json({
    message: "User [" + firstname + "] registered successfully!",
  });
};

exports.profilephoto = async (req, res) => {
  const element = {};
  let workers = await User.find({_id : req.payload.id }).populate('person');
  element['photo'] = workers[0].person.photo;
  res.send(element);
};

exports.registercandidate = async (req, res) => {
  const { 
    firstname,
    lastname,
    industry,
    jobposition,
    phone,
    salary,
    email, 
    password,
  } = req.body;

  const person = new Person({
    firstname,
    lastname,
    industry,
    jobposition,
    phone,
    salary,
    latitude:((Math.random() * (19.517081 - 19.335118) + 19.335118).toFixed(6)),
    longitude:(-(Math.random() * (99.279289 - 99.019564) + 99.019564).toFixed(6)),
    photo:'https://i.postimg.cc/SjCXZ9wf/images-10.jpg'
  }); 

  const emailRegex = /@yahoo.com|@hotmail.com|@live.com|@gmail.com/;

  if (!emailRegex.test(email)) throw "Email is not supported from your domain.";
  if (password.length < 6) throw "Password must be atleast 6 characters long.";

  
  let userExists = null;
  try{
  userExists = await User.findOne({
    email,
  });
}catch(error){
  console.log(error.message);
}

  if (userExists) throw "User with same email already exits.";

  const user = new User({
    person:person,
    email,
    password: sha256(password + process.env.SALT),
  });

  await user.save();
  await person.save();

  const coach = await Rol.find({user1 : req.payload.id }).populate('user');
  const fieldmarketstall = coach[0].marketstall;
  /*let child = coach[0].user2;*/
  //console.log(child);
  
  if (fieldmarketstall.toString() === 'Director') throw "A director cannot add candidates";

  if (fieldmarketstall.toString() === 'Candidate') throw "You are in the hiring process";
 
  const random = Math.round(Math.random() * ((coach.length - 1)- 0)) + 0;
  const chosenrecruiter = coach[random].user2;
  
  const assignment = await Rol.findOne({user1 : chosenrecruiter }).populate('user');
  const userID = await User.findOne({
    email,
  });

  if(assignment.user2.toString()===assignment.user1.toString()){
    assignment.user2 = userID._id;
    await assignment.save();

    const rol = new Rol({
      user1: userID._id,
      user2: userID._id,
      marketstall: 'Candidate'
    });
  
    await rol.save();

  }else{
    
    const roldad = new Rol({
      user1: assignment.user1,
      user2: userID._id,
      marketstall: 'Recruiter'
    });
    await roldad.save();
    
    const rolchild = new Rol({
      user1: userID._id,
      user2: userID._id,
      marketstall: 'Candidate'
    });
    await rolchild.save();
  }
  
  res.json({
    message: "User [" + firstname + "] registered successfully!",
  });
};


