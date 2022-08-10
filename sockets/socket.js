const {io} = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Bon Jobi"));
bands.addBand(new Band("RHCP"));
bands.addBand(new Band("Metallica"));
console.log(bands);

//Mensajes de Sockets
io.on('connection', client => {
  console.log("Cliente Conectado");
  
  client.emit("active-bands",bands.getBands());


    
    client.on('disconnect', () => { console.log("Cliente desconectado")});

    //Escuchar el mensaje
    client.on("mensaje",(playload)=>{
      console.log("Mensaje: ",playload);
      
      //Emiitr un mensaje a todos los clientes conectados
      io.emit("mensaje",{admin: "Nuevo mensaje"})
    })

    //Emite a todos
    //client.on("emitir-mensaje",(payload)=> io.emit("nuevo-mensaje",payload))
    //Emite a todos menos al emisor
    /*client.on("emitir-mensaje",(payload)=>{
      //console.log(payload);
      client.broadcast.emit("nuevo-mensaje",payload);
    })*/

    //BANDAS
    client.on("vote-band",(payload)=>{
      bands.voteBand(payload.id);
      io.emit("active-bands",bands.getBands());
    })

    client.on("add-band",(payload)=>{
      bands.addBand(new Band(payload.name));
      io.emit("active-bands",bands.getBands());
    })
    "delete-band"
    client.on("delete-band",(payload)=>{
      bands.deleteBand(payload.id);
      io.emit("active-bands",bands.getBands());
    })
    
  });