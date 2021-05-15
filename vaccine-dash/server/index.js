const fs = require('fs')
const express = require('express')
const app = express()

const port = 8080

app.get('/api/map/county', (req, res) => {
    fs.readFile('./county.geojson', (err, json) => {
        res.json(JSON.parse(json))
    })
})

app.listen(port, () => {
    console.log(`Server listening to http://localhost:${port}`)
})