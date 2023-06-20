let express = require('express');
let colorsRepo = require('./dataFunctions/colorsRepo');
let app = express();
let CORS = require('cors')


let router = express.Router();

app.use(express.json());

app.use(CORS());

//router for getting the color.json data to be seen in Postman
router.get('/', (req, res, next) => {
    colorsRepo.get((data) => {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All colors retrieved",
            "data": data
        });
    }, (err) => {
        next(err)
    })
})

//router for SEARCHING for data by its name or ID through a get request
//search?id=n&name=str
router.get('/search', (req, res, next) => {
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };

    colorsRepo.search(searchObject, (data) => {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "Search retrieved",
            "data": data
        })
    }), (err) => {
        next(err)
    }
})


//router for getting a specific piece of data by its ID
router.get('/:id', (req, res, next) => {
    colorsRepo.getByID(req.params.id, (data) => {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Color retrieved",
                "data": data
            });
        }
        else {
            res.status(404).send({
                "status": 404,
                "statusText": "Not Found",
                "message": "The color with the id '" + req.params.id + "' could not be found :(",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The color with the id '" + req.params.id + "' could not be found :("
                }
            })
        }
    }, (err) => {
        next(err);
    })
})

//router for inserting new data into the JSON file
router.post("/", (req, res, next) => {
    colorsRepo.insert(req.body, (data) => {
        res.status(201).send({
            "status": 201,
            "statusText": "Created",
            "message": "new color added",
            "data": data
        });
        (err) => {
            next(err)
        }
    })
})


//router for updating current data with new data inputs by looking for
// an ID
router.put('/:id', (req, res, next) => {
    colorsRepo.getByID(req.params.id, (data) => {
        if (data) {
            //if we find a color we attempt to update data here
            colorsRepo.update(req.body, req.params.id, (data) => {
                res.status(201).send({
                    "status": 201,
                    "statusText": "OK",
                    "message": "color '" + req.params.id + "' updated",
                    "data": data
                })
            })
        }
        else {
            res.status(404).send({
                "status": 404,
                "statusText": "Not Found",
                "message": "The color with the id '" + req.params.id + "' could not be found :(",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The color with the id '" + req.params.id + "' could not be found :("
                }
            })
        }
    })
})


//router for deleting data
router.delete('/:id', (req, res, next) => {
    colorsRepo.getByID(req.params.id, (data) => {
        if (data) {
            //attempt to delete this item
            colorsRepo.delete(req.params.id, (data) => {
                res.status(200).json({
                    "status": 201,
                    "statusText": "OK",
                    "message": "The color '" + req.params.id + "' has been deleted",
                    "data": "The color '" + req.params.id + "' has been deleted"
                })
            })
        } else {
            res.status(404).send({
                "status": 404,
                "statusText": "Not Found",
                "message": "The color with the id '" + req.params.id + "' could not be found :(",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The ccolor with the id '" + req.params.id + "' could not be found :("
                }
            })
        }
    }, (err) => {
        next(err)
    })
})




app.use('/colorsAPI/', router);

const server = app.listen(3001, () => {
    console.log('Server is running on port 3001')
})