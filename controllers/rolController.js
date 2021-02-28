const mongoose = require("mongoose");
const Rol = mongoose.model("Rol");
const User = mongoose.model("User");
const Person = mongoose.model("Person");
const jwt = require("jwt-then");

const keep_relationship = async (father, child, name) => {
  let rol = new Rol({
    user1: father,
    user2: child,
    marketstall: name
  });
  
  await rol.save();
};

exports.relation = async (req, res) => {
    const director1 = await User.findOne({"email" : {$regex : ".*director1.*"}});
    const director2 = await User.findOne({"email" : {$regex : ".*director2.*"}});

    const coach1 = await User.findOne({"email" : {$regex : ".*coach1.*"}});
    const coach2 = await User.findOne({"email" : {$regex : ".*coach2.*"}});

    const recruiter1 = await User.findOne({"email" : {$regex : ".*recruiter1.*"}});
    const recruiter2 = await User.findOne({"email" : {$regex : ".*recruiter2.*"}});
    const recruiter3 = await User.findOne({"email" : {$regex : ".*recruiter3.*"}});
    const recruiter4 = await User.findOne({"email" : {$regex : ".*recruiter4.*"}});
    
    keep_relationship(director1, coach1, "Director");

    keep_relationship(director2, coach2, "Director");

    keep_relationship(coach1, recruiter1, "Coach");
    keep_relationship(coach1, recruiter2, "Coach");

    keep_relationship(coach2, recruiter3, "Coach");
    keep_relationship(coach2, recruiter4, "Coach");

    keep_relationship(recruiter1, recruiter1, "Recruiter");
    keep_relationship(recruiter2, recruiter2, "Recruiter");

    keep_relationship(recruiter3, recruiter3, "Recruiter");
    keep_relationship(recruiter4, recruiter4, "Recruiter");
  
    res.json({
      message: "Relations successfully!",
    });
  };

  exports.hierarchy = async (req, res) => {
    let employee = await Rol.find({user1 : req.payload.id }).populate('user');
    let fieldUser1 = employee[0].user1;
    let visited = {};
    let queue = [];

    visited[fieldUser1] = true;
    queue.push(fieldUser1);
    let dfs = [];
    let children = []; 
    
  while(queue.length !== 0){
      let getQueueElement = queue.pop();
      
      dfs.push(getQueueElement);


      let query = await Rol.find({user1 : getQueueElement }).populate('user');
      for(let i in query){
        let neigh = query[i].user2.toString();
        if (!visited[neigh]) { 
          visited[neigh] = true;
          queue.push(query[i].user2); 
        }
      }
      
    }
    ///console.log(visited);
    const subordinates = []; 
    for(let i in dfs){
      const element = {};
      let workers = await User.find({_id : dfs[i] }).populate('person');
      element['firstname']=workers[0].person.firstname;
      element['lastname']=workers[0].person.lastname;
      element['industry']=workers[0].person.industry;
      element['jobposition']=workers[0].person.jobposition;
      element['phone']=workers[0].person.phone;
      element['salary']=workers[0].person.salary;
      element['photo']=workers[0].person.photo;

      let position = await Rol.find({user1 : dfs[i] });
      element['marketstall']=position[0].marketstall;
      subordinates.push(element);
    }
    
    res.send(subordinates);
  };


  exports.locationmap = async (req, res) => {
    let employee = await Rol.find({user1 : req.payload.id }).populate('user');
    let fieldUser1 = employee[0].user1;
    let visited = {};
    let queue = [];

    visited[fieldUser1] = true;
    queue.push(fieldUser1);
    let dfs = [];
    let children = []; 
    
  while(queue.length !== 0){
      let getQueueElement = queue.pop();
      
      dfs.push(getQueueElement);


      let query = await Rol.find({user1 : getQueueElement }).populate('user');
      for(let i in query){
        let neigh = query[i].user2.toString();
        if (!visited[neigh]) { 
          visited[neigh] = true;
          queue.push(query[i].user2); 
        }
      }
      
    }
    
    const subordinates = []; 
    for(let i in dfs){
      const element = {};
      let workers = await User.find({_id : dfs[i] }).populate('person');
      element['photo']=workers[0].person.photo;
      element['latitude']=workers[0].person.latitude;
      element['longitude']=workers[0].person.longitude;

      subordinates.push(element);
    }
    
    res.send(subordinates);
  };