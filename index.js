let express = require('express');
let colorsRepo = require('./dataFunctions/colorsRepo');
let app = express();

let router = express.Router();

app.use(express.json());

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
            })
        } else {
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
    });
})

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




app.use('/colorsAPI/', router);

const server = app.listen(3001, () => {
    console.log('Server is running on port 3001')
})