
const SocketIO = require('socket.io');

module.exports = (server, app) => {
    const io = SocketIO(server, { path: '/socket.io' });
    app.set('io', io);
    const room = io.of('/room');
    const chat = io.of('/chat');

    room.on('connection', (socket) => {
        console.log('room 네임스페이스에 접속');
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection', (socket) => {
        console.log('chat 네임스페이스에 접속');
        const req = socket.request;
        const { headers: { referer } } = req;
        const roomId = referer
            .split('/')[referer.split('/').length - 1]
            .replace(/\?.+/, '');
        socket.join(roomId);

        socket.on('disconnect', () => {
            console.log('chat 네임스페이스 접속 해제');
            socket.leave(roomId);
        });
    });
};
// const SocketIo = require("socket.io");

// module.exports = (server, app) => {
//     const io = SocketIo(server, { path: '/socket.io' });

//     app.set('io', io);
//     const room = io.of('./room');
//     const chat = io.of('./chat');

//     room.on('connenction', (socket) => {
//         console.log('room 네임스페이스에 접속');
//         socket.on('disconnect', () => {
//             console.log('room 네임스페이스 접속 해제.')
//         })
//     })

//     chat.on('connenction', (socket) => {
//         console.log('chat 네임스페이스에 접속');

//         const req = socket.request;
//         const { headers: { referer } } = req;
//         const roomId = referer.split('/')[referer.split('/').length - 1].replace(/\?.+/, '');
//         socket.join(roomId);

//         socket.on('disconnect', () => {
//             console.log('chat 네임스페이스 접속 해제.');
//             socket.leave(roomId);
//         })
//     })


//     io.on('connection', (socket) => {
//         //웹 소켓에 연결되었을 때

//         const req = socket.request;
//         const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//         console.log("새로운 클라이언트 접속", ip, socket.id, req.ip);

//         socket.on('disconnect', () => {
//             console.log('클라이언트 접속 해제', ip, socket.id);
//             clearInterval(socket.interval);
//         })
//         socket.on('error', (error) => {
//             console.log(error);
//         });

//         socket.on('reply', (data) => {
//             console.log(data);
//             //클라이언트로부터 메시지를 받을 때!
//         })
//         socket.interval = setInterval(() => {
//             socket.emit('news', 'Hello Socket.IO');
//         }, 3000);
//     })
// }



// const req = require('express/lib/request');
// const WebSocket = require('ws');

// module.exports = (server) => {
//     const wss = new WebSocket.Server({ server });

//     wss.on('connection', (ws, req) => {
//         //웹 소켓 연결시
//         const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

//         console.log('새로운 클라이언트 접속', ip);

//         /*
//         on은 해당 이벤트에 대한 리스너를 등록하는 과정이다. 
//         */
//         ws.on('message', (message) => {
//             console.log(message);
//         });
//         ws.on('error', (error) => {
//             console.log(error);
//         });
//         ws.on('close', () => {
//             console.log('클라이언트 접속 해제', ip);
//             clearInterval(ws.interval);
//         });
//         ws.interval = setInterval(() => {
//             if (ws.readyState === ws.OPEN) {
//                 ws.send('서버에서 클라이언트로 메시지를 보냅니다. ');
//             }
//         }, 3000);
//     })
// }


