const fsp = require('fs').promises;

async function writeJSON(path, key, value) {
    try {
        let data = await fsp.readFile(path);
        let obj = JSON.parse(data);

        // set whatever property or properties in the object that you are trying to change
        obj[key] = value;

        await fsp.writeFile(path, JSON.stringify(obj, null, 2));
        console.log('data written');
     } catch(e) {
        // error handling here
        console.log(e);
        console.log('error sending message');
        throw e;      // make sure caller can see the message
     }
}

module.exports = {
  writeToConfig: function(key, value) {
    writeJSON('./config.json', key, value);
  }
}

//This does nothing, make it do something
