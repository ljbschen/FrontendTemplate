const express = require('express');
const api = require('./controllers/api.js');
const bodyParser = require('body-parser')
const app = express();

app.set('port', (process.env.PORT || 9001));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.get('/api/ping', api.ping);
app.get('/api/folders', api.getFolderList);

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
