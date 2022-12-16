const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8000;
const cors = require('cors');

dotenv.config();
app.use(cors());

const authentificationRoutes = require('./routes/authentification.routes');
const mangaRoutes = require('./routes/manga.routes');
const userRoutes = require('./routes/user.routes');


app.use(authentificationRoutes);
app.use(mangaRoutes);
app.use(userRoutes);
app.use("/images", express.static('chapters'));

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});