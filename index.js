const fs = require("fs");

const splitCaps = (str) => {
    return str.trim()
    .replace(/([a-z])([A-Z]+)/g, (m, s1, s2) => s1 + ' ' + s2)
    .replace(/([A-Z])([A-Z]+)([^a-zA-Z0-9]*)$/, (m, s1, s2, s3) => s1 + s2.toLowerCase() + s3)
    .replace(/([A-Z]+)([A-Z][a-z])/g, (m, s1, s2) => s1.toLowerCase() + ' ' + s2);
}

const toUpperSnakeCase = (str) => {
    return splitCaps(str)
    .replace(/\W+/g, " ")
    .trim()
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toUpperCase())
    .join('_');
}

const jsonToEnv = (json, parent = null) => {
    for (let key in json) {
        if (json[key] instanceof Object) {
            jsonToEnv(json[key], `${parent ? parent + "_" : ""}${key}`);
        } else if (json[key] instanceof Array) {
            for (let item in json[key]) {
                jsonToEnv(json[key], `${parent ? parent + "_" : ""}${item}`);
            }
        }
        else {
            let name = toUpperSnakeCase(`${parent ? parent + "_" : ""}${key}`);
            process.env[name] = json[key];
        }
    }
}

const config = (json = "./env.json") => {
    if(json instanceof Object){
        jsonToEnv(json);
    }else if(fs.existsSync(json)){
        jsonToEnv(require(json));
    }else{
        throw new Error("No config data found!");
    }
}

module.exports = {config};