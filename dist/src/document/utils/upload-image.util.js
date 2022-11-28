"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const FormData = require("form-data");
const rxjs_1 = require("rxjs");
async function uploadImage() {
    const pdf2base64 = require('pdf-to-base64');
    const formData = new FormData();
    const file = await pdf2base64('src/document/test_assets/exported_file.pdf').then((response) => {
        return response;
    });
    formData.append('file', 'data:application/pdf;base64,' + file);
    formData.append('upload_preset', 'my-uploads');
    const responseData = await (0, rxjs_1.firstValueFrom)(this.httpService
        .post('https://api.cloudinary.com/v1_1/simply-sites1/image/upload', formData, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    })
        .pipe((0, rxjs_1.map)((response) => [response.data, response.status])));
    return responseData[0].secure_url;
}
exports.uploadImage = uploadImage;
//# sourceMappingURL=upload-image.util.js.map