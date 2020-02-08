const Koa = require('koa');
require("./utils/Prototype");

const app = new Koa();
const ImageCacheRoute = require('./routes/ImageCacheRoute');


app.use(ImageCacheRoute.routes()).use(ImageCacheRoute.allowedMethods());

app.listen(5000, ()=> {
  console.log("Listening to port 5000...");
});

