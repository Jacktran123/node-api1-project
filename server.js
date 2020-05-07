const express=require('express');
const Port= 5000;
const cors= require('cors');
const server= express();

server.use(express.json());
server.use(cors());

const user=[
    {
        
            id: Date.now(),
            name: "Jane Doe",
            bio: "Not Tarzan's Wife, another Jane"
          
    }

];


server.listen(Port, ()=>{
    console.log(`Server listening on ${Port}`)
});

server.get("/", ()=>{
    console.log('The App is working');
});

// CRUD
server.post("/api/users", (req,res)=>{

    if(!req.body.name || !req.body.bio){
        res.status(400).send({error: 'Please provide name and bio'});
    } else {
        const newUser= req.body;
        newUser.id= Date.now();

        user.push(newUser);
        res.status(201).send(newUser);
    }
})

server.get("/api/users", (req,res)=>{
    res.status(200).send(user);   
})

server.get("/api/users/:id", (req,res)=>{
    const {id}= req.params;

    const userWithId= user.find(people=> people.id === id);
    if( userWithId){
        res.status(201).send(userWithId)
    } else{
        res.status(404).send({message: "The user with the specified id is not defined"})
    }
});

server.delete("/api/users/:id", (req,res)=>{
    const {id}= req.params;

    const deleteUser= user.filter(people=> people.id !== id);
    if( deleteUser){
        res.status(201).send(deleteUser);
    } else {
        res.status(404).send({message: "The user with the specified id is not defined"})
    }

});

server.put("/api/users/:id", (req,res)=>{
    const {id}= req.params;

    if(id){
        const userId= user.find(people=> people.id === id);
        if(!req.body.bio || !req.body.name){
            res.status(400).send({errorMessage : "Please send us the bio or name"})
        } else{
            userId.bio = req.body.bio;
            userId.name=req.body.name;
            res.status(200).send(userId);
        } 

    } else {
        res.status(400).send({errormessage: "Please send the correct id"})
    }

})

