"use client";
import { useRouter, useParams } from "next/navigation";
import { Server } from "socket.io";
import { useEffect, useState } from "react";
import next from "next";
import { createServer } from "http";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";

const app = next({ dev, hostname, port: 3000 });
const handler = app.getRequestHandler();
const router = useRouter();
const params = useParams();


const partidaId = params.id;


app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer);

    io.on("error", (err) => { console.error("Socket.IO error:", err); });
    io.on("partida_error", (err) => { console.error("Partida error:", err); router.push("/jogo"); });

    io.on("connection", (socket) => {
        console.log("Novo cliente conectado:", socket.id);
        io.emit("entrar_partida", { partidaId })
    });






    httpServer.once("error", (err) => { console.error("Error starting server:", err); })
        .listen(3000, () => { console.log(`> Server listening at http://${hostname}:3000`); });

});


{/* ! Não é necessário analisar o código HTML e CSS abaixo, pois ele é apenas um protótipo visual para testes e não faz parte da estrutura final do projeto. Ele serve apenas para visualizar a interface do jogo durante o desenvolvimento.
    */}