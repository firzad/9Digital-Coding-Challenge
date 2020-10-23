// server.js - 9 Digital Coding Challenge
// Firzad Ahammed

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((err, _req, res, next) => {
    // body-parser sets status to 400 for failed JSON Parsing
    if (err.status === 400)
        return res.status(err.status).json({
            "error": "Could not decode request: JSON parsing failed"
        });

    // if it's not a 400, default error handling.
    return next(err);
});

app.get('/', (req, res) => {
    res.send("Use URL/data for POSTing JSON data");
});

app.post('/data', (req, res) => {
    const dataSet = req.body.payload;
    if (!dataSet) {
        return res.status(400).json({
            "error": "Could not decode request: JSON parsing failed"
        });
    }
    const newData = {
        response: []
    };
    newData.response = dataSet.filter(x => x.drm && x.episodeCount > 0).map(x => {
        const item = {
            image: x.image.showImage,
            slug: x.slug,
            title: x.title
        }
        return item;
    });
    res.json(newData);
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    //
});
