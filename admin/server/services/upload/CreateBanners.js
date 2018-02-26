import fs from 'fs.extra';

export default class CreateBanners {

    async exec(options) {
        this.bannerFolder = options.bannerFolder;
        this.bannersPath = options.bannersPath;
        this.fileName = options.fileName;

        const copyFile = new Promise((resolve, reject) => {
            fs.copy(this.bannersPath + this.fileName, this.bannerFolder, { replace: true }, error => {
                if (error && error.code !== 'ENOENT') {
                    reject(new Error('File system error'));
                } else {
                    resolve();
                }
            });
        });

        return copyFile
            .then(this.__deleteFile.bind(this))

    }

    __deleteFile() {
        let promises = [];

        const promise = new Promise((resolve, reject) => {
            fs.unlink(this.bannersPath + this.fileName, error => {
                if (error && error.code !== 'ENOENT') {
                    reject(new Error('File system error'));
                } else {
                    resolve();
                }
            });
        });

        promises = [...promises, promise];

        return Promise.all(promises);
    }
}
