const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method 

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>My First Page</title></head>')
        res.write('<body><form action="/message" method="POST"><input name="message" type="text"/><button type="submit">Submit</button></form></body>')
        res.write('</html>')
        return res.end()
    }

    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            // console.log(parsedBody)
            fs.writeFileSync('message.txt', message)
        })
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
    }

    
    // console.log('------------------')
    // console.log(req.url)
    // console.log('------------------')
    // console.log(req.method)
    // console.log('------------------')
    // console.log(req.headers)

    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Information form the node server</h1></body>')
    res.write('</html>')
    res.end()
    // process.exit()
}

module.exports = requestHandler
