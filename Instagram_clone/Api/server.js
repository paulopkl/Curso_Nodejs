const express = require('express'), 
    bodyParser = require('body-parser'),
    multiParty = require('connect-multiparty'),
    mongodb = require('mongodb'),
    fs = require('fs'),
    app = express(),
    ObjectId = mongodb.ObjectId;


// Data in format 'x-www-form-urlencoded'
app.use(bodyParser.urlencoded({ extended: true }));
// Data in format 'json'
app.use(bodyParser.json());
// Data in format 'multipart/form-data'
app.use(multiParty());

app.use((req, res, next) => {

    // Allow requests from differents domains
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Preconfigures the methods supported
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Origin rewrite the content-type
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    // Allow requests from differents domains
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

const db = new mongodb.Db(
    'instagram',
    new mongodb.Server('localhost', 27017, {}),
    {}
);

app.get('/', (req, res) => {
    res.json({ message: 'hello' });
});


// GET /api
app.get('/api', (req, res) => {
    db.open((err, mongoClient) => {
        mongoClient.collection('posts', (err, collection) => {
            collection.find().toArray((err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(result);
                }
                mongoClient.close();
            });
        })
    });
});

// GET /api/id
app.get('/api/:id', (req, res) => {
    const id = req.params.id;
    db.open((err, mongoClient) => {
        mongoClient.collection('posts', (err, collection) => {
            collection.find({ _id: ObjectId(id) }).toArray((err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.status(200).json(result);
                }

                mongoClient.close();
            });
        })
    });
});

// POST /api
app.post('/api', (req, res) => {
    const date = new Date();
    const timeStamp = date.getTime();

    const urlImage = `${timeStamp}_${req.files.file.originalFilename}`;

    const originPath = req.files.file.path;
    // C:\\Users\\Paulo\\AppData\\Local\\Temp\\z2KNdABAYfkPYHOlhi1BIaNQ.jpg
    
    const destinationPath = `./uploads/${urlImage}`;
    // 229473296-elven-forest-wallpaper.jpg


    fs.rename(originPath, destinationPath, (err) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }

        const data = {
            urlImage, // req.files.file.originalFilename
            title: req.body.title
        }
        
        db.open((err, mongoClient) => {
            mongoClient.collection('posts', (err, collection) => {
                collection.insert(data, (err, records) => {
                    if (err) {
                        res.json({ status: 'Error' });
                    } else {
                        res.json({ status: 'Operation performed successfully!!' });
                    }

                    mongoClient.close();
                });
            })
        });
    });

});

// PUT /api
app.put('/api/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    db.open((err, mongoClient) => {
        mongoClient.collection('posts', (err, collection) => {
            collection.update(
                { _id: ObjectId(id) }, 
                { 
                    $push: { 
                        comments: { 
                            id_comment: new ObjectId(),
                            comment: data.feedback
                        } 
                    } 
                }, 
                {}, 
                (err, records) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(records);
                    }
                    
                    mongoClient.close();
                }
            );
        })
    });
});

// DELETE /api
app.delete('/api/:id', (req, res) => {
    const id = req.params.id;
    db.open((err, mongoClient) => {
        mongoClient.collection('posts', (err, collection) => {
            collection.remove({ _id: ObjectId(id) }, (err, records) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(records);
                }

                mongoClient.close();
            });
        })
    });
});

app.get('/uploads/:url_image', (req, res) => {
    const url_image = req.params.url_image;

    fs.readFile(`./uploads/${url_image}`, (err, content) => {
        if (err) {
            res.status(400).json({ error: err });
            return;
        } 

        res.writeHead(200, { 'content-type': 'image/jpg' });

        res.end(content);
    });
});

// DELETE /comment
app.delete('/comment/:id', (req, res) => {
    const id = req.params.id;
    res.send(id);
    db.open((err, mongoClient) => {
        mongoClient.collection('posts', (err, collection) => {
            collection.update(
                { },
                {   
                    $pull: {
                        comments: {
                            id_comment: ObjectId(id)
                        }
                    } 
                },
                { multi: true },
                (err, records) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(records);
                }

                mongoClient.close();
            });
        })
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server in running on port: ${port}`);
})