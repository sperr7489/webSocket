const req = require('express/lib/request');
const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        //웹 소켓 연결시
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        console.log('새로운 클라이언트 접속', ip);

        /*
        on은 해당 이벤트에 대한 리스너를 등록하는 과정이다. 
        */
        ws.on('message', (message) => {
            console.log(message);
        });
        ws.on('error', (error) => {
            console.log(error);
        });
        ws.on('close', () => {
            console.log('클라이언트 접속 해제', ip);
            clearInterval(ws.interval);
        });
        ws.interval = setInterval(() => {
            if (ws.readyState === ws.OPEN) {
                ws.send('서버에서 클라이언트로 메시지를 보냅니다. ');
            }
        }, 3000);
    })
}

