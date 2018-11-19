// Creating a utility function to simplify the routing to the html files which will work agnostically on different operating systems
const path = require('path')

// dirname returns the directory name of a path
// mainModule refers to main file that runs the application

module.exports = path.dirname(process.mainModule.filename)