let io;

module.exports = {
    init: (ServerSocket,serverHttp) => {
        io = new ServerSocket(serverHttp,{
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET","POST","PUT","DELETE"]
            }
        })
        return io;
    },
    getIO:()=>{
        if(!io){
            throw new Error('Socket.io not initialized');
        }
        return io;
    }
}