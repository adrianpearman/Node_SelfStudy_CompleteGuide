// An example of a simple server using thr bult in dependancies that come with Node.  
const http = require('http')
const PORT = process.env.PORT || 5000
const routes = require('./routes')

const server = http.createServer(routes)

server.listen(PORT, (error) => {
    if(!error){
        console.log(`Listening on PORT: ${PORT}`)
    } else {
        console.lerror(error)
    }
})