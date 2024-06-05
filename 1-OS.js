const os = require('node:os')

console.log('Operative System information:')

console.log('-------------------------------')

console.log('OS name: ', os.platform())
console.log('OS version: ', os.release())
console.log('Architecture: ', os.arch())
console.log('Total memory: ',Math.round(os.totalmem() / 1024 / 1024 / 1024))
console.log('User info', os.userInfo())