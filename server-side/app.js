const express = require("express");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const translationRoute = require('./routes/translationRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ROUTES
app.use('/api', translationRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})