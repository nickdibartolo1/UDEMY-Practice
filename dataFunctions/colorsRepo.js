const { FILE } = require('dns');
let fs = require('fs');
const { resolve } = require('path');
const NEEDED_FILE = './assets/colors.json';

let colorsRepo = {
    get: function (resolve, reject) {
        fs.readFile(NEEDED_FILE, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data))
            }
        })
    },

    getByID: (id, resolve, reject) => {
        fs.readFile(NEEDED_FILE, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let city = JSON.parse(data).find(p => p.id == id);
                resolve(city)
            }
        });
    }
}

module.exports = colorsRepo;
