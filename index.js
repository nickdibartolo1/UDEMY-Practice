let express = require('express');
let colorsRepo = require('./dataFunctions/colorsRepo');
let app = express();

let router = express.Router();

app.use(express.json());


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
    })
})






app.use('/colorsAPI/', router);

const server = app.listen(3001, () => {
    console.log('Server is running on port 3001')
})