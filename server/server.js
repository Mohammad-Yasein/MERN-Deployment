const express = require('express');
const cors = require('cors');
const MongooseConfig = require('./config/mongoose.config');
// ====
const PollRoutes = require('./routes/poll.routes');
// ====

const app = express();
const port = 8000;
// ====
const database = 'polls';
// ====

app.use(express.json(), express.urlencoded({ extended: true }), cors());
MongooseConfig(database);
// ====
PollRoutes(app);
// ====
app.listen(port, () => console.log('THE SERVER IS ALL FIRED UP ON PORT ' + port + ' ...'));
