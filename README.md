# jsonvironment
Creates environment variables from json file or js object.
Converts all keys to snakecase (uppercase).

## Installation
```bash
npm install jsonvironment
```
## Usage

### Json Object
index.js
```js
require("jsonvironment").config({
    hello: "world"
});
console.log(process.env.HELLO);
```

### env.json File
env.json
```json
{
    "foo": "bar"
}
```

index.js
```js
require("jsonvironment").config();
console.log(process.env.FOO);
```