const csv = require('csvtojson')
const fs = require('fs')
const path = require('path')

const convertFile = (csvFilePath='customer-data.csv') => {
	console.log(`Starting to convert file: ${csvFilePath}`)
	json = ""
	count = 0
	csv().fromFile(csvFilePath)
		.on('data', (data) => {
			json += data+","
			count++
		})
		.on('done', (error) => {
			console.log("Number of rows converted: "+count)
			json = json.slice(0, -1);
			json = "["+json+"]"
			let newFileName = path.basename(csvFilePath, path.extname(csvFilePath))+'.json'
			fs.writeFileSync(path.join(__dirname, newFileName) , json)
			console.log("File is converted as: "+newFileName)
		})
}

convertFile(process.argv[2])
