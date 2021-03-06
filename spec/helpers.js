const path = require( "path" )
    , fs   = require( "fs" )
    , irc  = require( path.join( __dirname, "..", "lib", "irc" ) )
    , fxtp = path.join( __dirname, "fixtures" )
    , srv  = require( "./server" )

const readFixture = function( fileName, fp ) {
  return JSON.parse( fs.readFileSync( path.join( fp || fxtp, fileName ), "utf8" ) )
}

const conf = path.join( __dirname, "lib", "config.json" )
    , jonf = JSON.parse( fs.readFileSync( conf, "utf8" ) )

const server = srv.server

server.listen( jonf.server.port, jonf.server.address, function() {
  console.info( "LISTENING" )
})

const bot = new irc.IRC( conf ).connect()

// Convenience wrapper around `it`, with added bottage/servage
const bit = function( desc, f ) {
  server.removeAllListeners( "message" )
  if ( ! f )
    return it( desc )
  it( desc, f.bind( bot ) )
}

exports.bit         = bit
exports.conf        = jonf
exports.readFixture = readFixture
