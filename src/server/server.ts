import { Server } from "socket.io"
import { createServer } from "node:http";

const hostname = "localhost";
const Servidorhttp = createServer();
const socketio = new Server(Servidorhttp, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});



let contador = 0;

socketio.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);
    console.log(`Total de clientes conectados: ${contador++}`);


    
});

socketio.of("/admin").on("connection", (socket) => {
    console.log(`Admin conectado: ${socket.id}`);
});


socketio.on("disconnect", (socket) => {
    console.log(`Cliente desconectado: ${socket.id}`);
    console.log(`Total de clientes conectados: ${--contador}`);
});

Servidorhttp.once("error", (err) => {
    console.error("Erro no servidor socket.io em porta 3001:\n Erro abaixo:\n", err);
    process.exit(1);
}).listen(3000, () => {
    console.log(`Bem vindo! Servidor Socket.IO está conectado diretamente com o NextJs na porta 3000!\n Pronto em http://${hostname}:3000`);
});



//TODO: implementar futuramente o Firebase Cloud Messaging para atuar como servidor potente para usuários mobiles poderem jogar sem drenar batéria.