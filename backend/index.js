const express = require('express')
const app = express()
const port = 8008


app.get('/', (req, res) => {
    res.send('<h1>Hi World</h1>')
})

app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})



// React Docs

// const express = require('express');
// const path = require('path');
// const app = express();

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.listen(9000);