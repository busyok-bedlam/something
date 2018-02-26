import multer from 'koa-multer';
import path from 'path';

let fileName;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.resolve(__dirname, '../../admin/public/static/uploads/');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        fileName = file.originalname;
        cb(null, fileName);
    }
});

const storageForItems = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.resolve(__dirname, '../../public/static/uploads/');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        fileName = file.originalname;
        cb(null, fileName);
    }
});

const fileFilter = function (req, file, cb) {
    if (file.mimetype.substring(0, 5) !== 'image') {
        cb(new Error('No image'));
    } else {
        cb(null, true);
    }
}

const upload = multer({storage, fileFilter}).any();

const uploadForItems = multer({storage: storageForItems, fileFilter}).any();


export default async (ctx, next) => {
    if (ctx.url == '/api/file/upload-file') {
        await upload(ctx)
            .then(() => {
                ctx.state.newFile = fileName;
                ctx.request.body = ctx.req.body;
            });
        await next();

    } else if (ctx.url == '/api/marketplace/user/items/shop-non-steam') {
        await uploadForItems(ctx)
            .then(() => {
                ctx.state.fileName = fileName;
                ctx.request.body = ctx.req.body;
            });
        await next();

    } else {
        await next();
    }
}
