# tesseract-sharder
Sharding module for Tesseract.js

Create one:

```js
const TesseractSharder = require("tesseract-sharder");
const shard = new TesseractSharder()
```
Methods
```js
(async () => {
const image = await shard.recognize("image.png");
})
```

```js
(async () => {
const images = await shard.recognizeDir("./images/");
})
```
