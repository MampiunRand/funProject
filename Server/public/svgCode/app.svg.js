import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
// const userRoutes = require('./src/routes/userRoutes');
// const errorHandler = require('./middleware/errorHandler');

// Initialisation de l'application Express
const app = express();
const httpServer = createServer(app);

// Configuration des middlewares
app.use(express.json());

// Configuration des routes
app.use(express.static('public'));


// app.use('/api/users', userRoutes);

// Gestion des erreurs
// app.use(errorHandler);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
// const server= app.listen(PORT, () => {
//   console.log(`Serveur en cours d'écoute sur le port ${PORT}`);
// });
// initialize all the voting candidates
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});
const candidates = {
    "0":{votes:0, label:'Javascript',color:'#1D1BAB'},
    "1":{votes:0, label:'C#', color:'#28B463'},
    "2":{votes:0, label:'PHP',color:'#D35400'},
    "3":{votes:0, label:'Python',color:'#7F8C8D'},
    "4":{votes:0, label:'Go',color:'#B9770E'}
}

function randomRGB(){
    const r = ()=>Math.random()*256 >> 0;
    return `rgb(${r()},${r()},${r()},${r()})`;
}

io.on('connection', (socket) => {
  console.log('Connection established');
  
  //emit votes for the candidate

  io.emit('update', candidates);

  //someone votes for the candidate
 
  socket.on('vote', (index) => {
    console.log(`the index: ${index}`);

      if(candidates[index]){
        candidates[index].votes=candidates[index].votes + 1;
      }
      //let users know if somoene has voted
      io.emit("update",candidates)
  });
});

httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});

