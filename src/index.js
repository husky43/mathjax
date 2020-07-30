const mjAPI = require('../lib/main.js');
const express = require('express');
const app = express();

mjAPI.config({
    MathJax: {
        SVG: {
            font: 'TeX',
        },
    },
});
mjAPI.start();

app.get('/equation', function (req, res) {
    const tex = req.query.tex;
    try {
        mjAPI.typeset(
            {
                math: tex,
                format: 'TeX', // (argv.inline ? "inline-TeX" : "TeX"),
                svg: true,
                speakText: false, // argv.speech,
                ex: 6, // argv.ex,
                width: 100, // argv.width,
                cjkCharWidth: 16,
            },
            function (data) {
                res.header('Content-Type', 'image/svg+xml');
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
                res.header(
                    'Access-Control-Allow-Headers',
                    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
                );
                res.send(data.svg);
            }
        );
    } catch (e) {
        res.send('error');
    }
});

const server = app.listen(8000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
