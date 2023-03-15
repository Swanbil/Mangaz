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

const mangaRoutes = require('./routes/manga.routes');
const userRoutes = require('./routes/user.routes');
const reportingRoutes = require('./routes/reporting.routes');
<<<<<<< HEAD
const paymentRoutes = require('./routes/payment.routes');
=======
const web3Routes = require('./routes/web3.routes');
>>>>>>> 8445147853f68511ef19d6c7362e36aca7eb0a45


app.use(mangaRoutes);
app.use(userRoutes);
app.use(reportingRoutes);
<<<<<<< HEAD
app.use(paymentRoutes)
=======
app.use(web3Routes);
>>>>>>> 8445147853f68511ef19d6c7362e36aca7eb0a45

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});