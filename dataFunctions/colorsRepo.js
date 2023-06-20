const { FILE } = require('dns');
let fs = require('fs');
const { resolve } = require('path');
const NEEDED_FILE = './assets/colors.json';


let colorsRepo = {
    //function for getting colors.json file and all its color data
    get: function (resolve, reject) {
        fs.readFile(NEEDED_FILE, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data))
            }
        })
    },

    //function for locating a color ("data") by its ID
    getByID: (id, resolve, reject) => {
        fs.readFile(NEEDED_FILE, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let city = JSON.parse(data).find(p => p.id == id);
                resolve(city)
            }
        });
    },

    //search function pulling the JSON file and seeing if there is data exisitng that is being requested
    //if so, it is then sent through to the client
    search: (searchObject, resolve, reject) => {
        fs.readFile(NEEDED_FILE, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let colors = JSON.parse(data);

                if (searchObject) {
                    colors = colors.filter(
                        c => (searchObject.id ? c.id == searchObject.id : true) &&
                            (searchObject.name ? c.name.toLowerCase().indexOf(searchObject.name) >= 0 : true))
                    resolve(colors)
                }
            }
        });
    },


    //insert function for inserting new data in to the JSON file
    insert: (newData, resolve, reject) => {
        fs.readFile(NEEDED_FILE, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let colors = JSON.parse(data);
                colors.push(newData);
                fs.writeFile(NEEDED_FILE, JSON.stringify(colors), (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(newData)
                    }
                });
            }
        });

    }


}



module.exports = colorsRepo;
