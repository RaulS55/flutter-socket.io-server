const {io} = require("../index")

//Mensajes de Sockets
io.on('connection', client => {
    console.log("Cliente Conectado")
    //client.on('event', data => { /* … */ });
    client.on('disconnect', () => { console.log("Cliente desconectado")});

    //Escuchar el mensaje
    client.on("mensaje",(playload)=>{
      console.log("Mensaje: ",playload);
      
      //Emiitr un mensaje a todos los clientes conectados
      io.emit("mensaje",{admin: "Nuevo mensaje"})
    })
  });