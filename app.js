var app = require('./config/server');

var server = app.listen(8080, function(){
    console.log('Servidor Online: localhost:8080');
})

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket){
    console.log('Usuario conectou');

    socket.on('disconnect', function(){
        console.log('Usuario desconectou');
    });

    
    socket.on('msgParaServidor', function(data){
        
        /*dialogo*/
        socket.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        socket.broadcast.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        /*participantes*/
        socket.emit(
            'participantesParaCliente',
            {apelido: data.apelido}
        );

        socket.broadcast.emit(
            'participantesParaCliente',
            {apelido: data.apelido}
        );
    })
});