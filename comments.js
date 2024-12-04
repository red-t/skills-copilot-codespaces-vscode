// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a port
var port = 3000;

// Create a path for comments
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.send(data);
        }
    });
});

// Create a path to post comments
app.post('/comments', (req, res) => {
    fs.readFile('comments.json', (error, data) => {
        if (error) {
            console.log(error);
        } else {
            comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (error) => {
                if (error) {
                    console.log(error);
                } else {
                    res.send('Comment added');
                }
            });
        }
    });
});

// Create a path to delete comments
app.delete('/comments', (req, res) => {
    fs.readFile('comments.json', (error, data) => {
        if (error) {
            console.log(error);
        } else {
            comments = JSON.parse(data);
            comments.splice(req.body, 1);
            fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (error) => {
                if (error) {
                    console.log(error);
                } else {
                    res.send('Comment deleted');
                }
            });
        }
    });
});

// Create a path to update comments
app.put('/comments', (req, res) => {
    fs.readFile('comments.json', (error, data) => {
        if (error) {
            console.log(error);
        } else {
            comments = JSON.parse(data);
            comments[req.body.id] = req.body;
            fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (error) => {
                if (error) {
                    console.log(error);
                } else {
                    res.send('Comment updated');
                }
            });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});