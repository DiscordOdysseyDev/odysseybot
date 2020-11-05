const fsp = require('fs').promises;

async function writeJSON(path, key, subKey, value) {
    try {
        let data = await fsp.readFile(path);
        let obj = JSON.parse(data);

        obj[key][subKey] = value;

        await fsp.writeFile(path, JSON.stringify(obj, null, 2));
        console.log('data written');
     } catch(error) {
        console.log(error);
        console.log('error sending message');
        throw error;
     }
}

module.exports = {
  writeToConfig: function(key, subkey, value) {
    writeJSON('./config.json', key, subkey, value);
  }
}

//This does nothing, make it do something
