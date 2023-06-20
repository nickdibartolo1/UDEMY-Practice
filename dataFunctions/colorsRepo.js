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

    // function for locating a color ("data") by its ID
    getByID: (id, resolve, reject) => {
        fs.readFile(NEEDED_FILE, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                let color = JSON.parse(data).find(c => c.id == id);
                resolve(color);
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
                }
                resolve(colors);
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

    },
    //function for updating existing JSON data through locating its ID
    update: (newData, id, resolve, reject) => {
        fs.readFile(NEEDED_FILE, (err, data) => {
            if (err) {
                reject(err);
            } else {
                let colors = JSON.parse(data);
                let clr = colors.find(c => c.id == id);
                if (clr) {
                    Object.assign(clr, newData);
                    fs.writeFile(NEEDED_FILE, JSON.stringify(colors), (err) => {
                        if (err) {
                            reject(err)
                        }
                        else {
                            resolve(newData)
                        }
                    });
                }
            }
        });
    },

    //function for deleting data
    delete: (id, resolve, reject) => {
        fs.readFile(NEEDED_FILE, (err, data) => {
            if (err) {
                reject(err)
            } else {
                let colors = JSON.parse(data);
                let colorIndex = colors.findIndex(c => c.id == id);
                if (colorIndex != -1) {
                    colors.splice(colorIndex, 1);
                    fs.writeFile(NEEDED_FILE, JSON.stringify(colors), (err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(colorIndex)
                        }
                    });

                }
            }
        });
    }


}



module.exports = colorsRepo;
