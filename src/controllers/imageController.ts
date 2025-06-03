import { Request, Response } from 'express';
import { uploadBufferToS3 } from '../services/imageService';
import path from 'path';
import BadRequestError from '../lib/errors/BadRequestError';
import { STATIC_PATH } from '../lib/constants';

const isProduction = process.env.NODE_ENV === 'production';

export default async function uploadImage(req: Request, res: Response): Promise<void> {
  if (!req.file) {
    res.status(400).json({ message: '파일이 없습니다.' });
    return;
  }

  let url: string;

  if (isProduction) {
    const { buffer, originalname, mimetype } = req.file;
    url = await uploadBufferToS3(buffer, originalname, mimetype);
  } else {
    // 로컬 업로드된 파일 URL 구성
    const host = req.get('host');
    if (!host) {
      throw new BadRequestError('Host is required');
    }
    if (!req.file) {
      throw new BadRequestError('File is required');
    }
    const filePath = path.join(host, STATIC_PATH, req.file.filename);
    url = `http://${filePath}`;
  }

  res.status(200).json({ url });
}
