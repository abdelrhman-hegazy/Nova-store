// middleware/debugMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const debugFormData = (req: Request, res: Response, next: NextFunction) => {
  console.log('=== DEBUG FORM DATA ===');
  console.log('Request Method:', req.method);
  console.log('Request Headers:', {
    'content-type': req.headers['content-type'],
    'content-length': req.headers['content-length'],
    'user-agent': req.headers['user-agent']
  });
  console.log('Request Body Keys:', Object.keys(req.body));
  console.log('Request Files:', (req as any).files ? `Exists with ${(req as any).files.length} files` : 'No files');
  console.log('Request File:', (req as any).file ? 'Exists' : 'No file');
  console.log('=== END DEBUG ===');
  next();
};