const path = require('node:path')

// Show the separation bar according to OS
console.log(path.sep)

// Concat the files path with the appropriate separator bar
const filePath = path.join('workSpace' , 'NODE' , 'NODE-COURSE' )
console.log(filePath)

// This give us the current file name
const fileName = path.basename('/workSpace/NODE/NODE-COURSE/text-example.txt')
console.log(fileName)

// Using the same property than above, we can remove the extension (.txt)
const fileNameNoExt = path.basename('/workSpace/NODE/NODE-COURSE/text-example.txt', '.txt')
console.log(fileNameNoExt)

// Get the correct extansion for any file
const getExt = path.extname('image.little.cat.png')
console.log(getExt)