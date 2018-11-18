const http = require('http') 
const PORT = process.env.PORT || 3000 
const routes = require('./routes')

const server = http.createServer(routes)

server.listen(PORT, (error) => {
    if(!error){
        console.log(`Listening on PORT: ${PORT}`)
    }else{
        console.error(error)
    }
})