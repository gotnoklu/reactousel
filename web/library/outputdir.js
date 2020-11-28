var fs = require('fs')
var directory = './dist'
if (!fs.existsSync(directory)) {
	fs.mkdirSync(directory)
}
