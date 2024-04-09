var express = require('express');
var cors = require('cors');
require('dotenv').config();
const bodyParser = require ('body-parser');
const multer = require ('multer');
const upload = multer({dest: 'uploads/'});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {

  try {
    const file = req.file;

    if( !file ) {
      res.json({
        error: 'No file found'
      });
      return;
    }

    res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    });

  } catch (err) {
    res.json({
      error: err
    });
  }
});


const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
