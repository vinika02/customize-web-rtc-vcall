let express = require( 'express' );
let app = express();
let server = require( 'http' ).Server( app );
let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );

app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
});


io.on('connection', function(socket) {   
    socket.on("call_to_user", function (data){
        io.emit('dialling', data);
        console.log(data);
    });
    socket.on("decline_call", function (data){
        io.emit('decline_call', data);
        console.log("decline_call");
    });

});


io.of( '/stream' ).on( 'connection', stream );

io.of( '/stream' ).on('connection', client => {    
    client.on('disconnect', () => {
        io.emit('calller_disconnected', "1");
     });
  });

const port = process.env.PORT || 3000;

  
var listener = server.listen(port, '52.205.56.111', function(){
    console.log('Listening on ' + listener.address().address, + listener.address().port); //Listening on port 8080
});
