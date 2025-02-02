const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors()); // This allows all origins, you can configure it for specific domains if needed.

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

const sequelize = require('./util/database');
// const Info = require('./models/info');
const infoRouter = require('./router/infoRouter');

app.use(infoRouter);

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});


sequelize
    .sync()
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.log(err));
