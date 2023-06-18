let express = require('express');
let colorsRepo = require('./dataFunctions/colorsRepo');
let app = express();

let router = express.Router();

app.use(express.jspn());


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
    }
    )
})




app.use('/colorsAPI/', router);

const server = app.listen(3001, () => {
    console.log('Server is running on port 3001')
})