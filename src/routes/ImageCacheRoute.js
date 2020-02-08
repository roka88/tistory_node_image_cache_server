const Router = require('koa-router');
const router = new Router();
const API = require('../utils/API');


const NodeCache = require("node-cache");
const imageCacheStore = new NodeCache();

module.exports = router;

router.get('/images/:name', async (ctx, next) => {

    const {url, params} = ctx;
    const {name} = params;

    const etag = Buffer.from(url).toString('base64').replace(/=/gi,"");

    ctx.set('etag', etag);
    ctx.set("Cache-Control", "public, max-age=60");
    ctx.set("Content-Type", "image/jpg");

    ctx.status = 200;

    if (ctx.fresh) {
        console.log("Not Modified");
        ctx.status = 304;
        return;
    }

    const cacheImage = imageCacheStore.get(etag);

    if (!cacheImage) {
        console.log("캐시 Miss!");

        const response = await API.async({"Content-Type": "image/jpg"}, `http://localhost:4000${url}`);
        const success = imageCacheStore.set(etag, response.data, 60 * 20);

        if (!success) {
            console.log("이미지 다운로드 실패");
            ctx.status = 400;
        }

        ctx.body = response.data;

    } else {
        console.log("캐시 Hit!");
        ctx.body = cacheImage;
    }

});
