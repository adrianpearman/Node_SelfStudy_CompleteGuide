const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method
    
    if(url === '/'){
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Users</title></head>')
        res.write('<body><h1>Add a new user</h1><form action="/create-user" method="POST"><input name="username" /><button>Send</button></form></body>')
        res.write('</html>')
        return res.end()
    }

    if(url === '/users'){
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Users</title></head>')
        res.write('<body><ul><li>User 1</li></ul></body>')
        res.write('</html>')
        return res.end()
    }

    if(url === '/create-user' && method === 'POST'){
        const body = []
        req.on('data', (chunk) => {
            // console.log(chunk)
            // Taking in the incoming information and chunking into the body variable
            body.push(chunk)
        })
        
        req.on('end', () => {
            // Parsing the body variable
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            console.log(message)
        })
        // Redirect status code
        res.statusCode = 302
        // Sending the client back to '/' route
        res.setHeader('Location', '/')
        return res.end()
    }
}

module.exports = requestHandler