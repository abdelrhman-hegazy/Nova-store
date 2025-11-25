"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugFormData = void 0;
const debugFormData = (req, res, next) => {
    console.log('=== DEBUG FORM DATA ===');
    console.log('Request Method:', req.method);
    console.log('Request Headers:', {
        'content-type': req.headers['content-type'],
        'content-length': req.headers['content-length'],
        'user-agent': req.headers['user-agent']
    });
    console.log('Request Body Keys:', Object.keys(req.body));
    console.log('Request Files:', req.files ? `Exists with ${req.files.length} files` : 'No files');
    console.log('Request File:', req.file ? 'Exists' : 'No file');
    console.log('=== END DEBUG ===');
    next();
};
exports.debugFormData = debugFormData;
