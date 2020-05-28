const functions = require('firebase-functions');
const firebase = require('firebase-admin');

const firebaseApp  = firebase.initializeApp(
    functions.config().firebase
)

const express =require('express')
const app = express();
const cors = require("cors")
app.use(cors({ origin: true }))

exports.app = functions.https.onRequest(app);

const server = require('http').Server(app)
const path = require("path")
const io = require('socket.io')(server)
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'public')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'))
})

users = []
var connections = {}
connections['vikram'] = {name:"v",email:"a@a",photoURL:"asdfsdg.com"}

function search(nameKey, myArray){
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i].email === nameKey) {
          return true
      }   
  }
  return false;
}

//chat code
io.on('connection', (socket) => {
  //  console.log('Connected.Authenticating....',socket.id);

    socket.on('new-user',(user)=>{
     // console.log(user);
      connections[socket]=user;
      if(!search(user.email,users)){      users.push(user);  }
      io.sockets.emit('new-user',users);
      io.sockets.emit('new-message',{sender:user.name,type:"joined"})
    })

    socket.emit("userdata",{username:socket.id , desc:"go f yourself"})
    
    socket.on('disconnect', function(){
     // console.log('user disconnected');
      //connections.splice(connections.indexOf(socket) , 1);
     // console.log(connections[socket]);

        if(connections[socket]!=null){
            if(search(connections[socket].email,users))
            {
              io.sockets.emit('new-message',{sender:connections[socket].name,type:"left"})
              users.splice(users.indexOf(connections[socket]),1);
              io.sockets.emit('new-user',users);
            }
          }
      delete connections[socket];
    });
    
    socket.on('new-message', (message) => {
      //console.log(message);
      io.sockets.emit('new-message', message);    
    }); 


    socket.on('user-left',(data)=>{
      io.sockets.emit('new-message',{sender:data.name,type:"left"})
      users.splice(users.indexOf(data),1);
      io.sockets.emit('new-user',users);
    })
  });


server.listen(process.env.PORT || 3000,()=>{
   // console.log('listening to 3ooo');
})




// socket.emit('message', "this is a test"); //sending to sender-client only
// socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
// socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
// socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
// socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
// io.emit('message', "this is a test"); //sending to all clients, include sender
// io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
// io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
// socket.emit(); //send to all connected clients
// socket.broadcast.emit(); //send to all connected clients except the one that sent the message
// socket.on(); //event listener, can be called on client to execute on server
// io.sockets.socket(); //for emiting to specific clients
// io.sockets.emit(); //send to all connected clients (same as socket.emit)
// io.sockets.on() ; //initial connection from a client.