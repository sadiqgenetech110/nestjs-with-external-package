import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

export function createFileInterceptor(
  FIELD: string,
  UPLOAD_DIRECTORY: string,
  DIRECTORY: string,
  isMultiple = false,
) {
  const storage = diskStorage({
    destination: async (req, file, cb) => {
      try {
        const currentYear = new Date().getFullYear().toString();
        const currentMonth = (new Date().getMonth() + 1)
          .toString()
          .padStart(2, '0');
        const randomNumber = Math.floor(Math.random() * 10) + 1; // Replace this with user ID in future
        const uploadPath = path.join(
          process.cwd(),
          UPLOAD_DIRECTORY,
          DIRECTORY,
          currentYear,
          currentMonth,
          randomNumber.toString(),
        );

        // Asynchronously create the directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
          await fs.promises.mkdir(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
      } catch (err: any) {
        console.error('Error:', err);
        cb(
          new HttpException(
            'Could not create upload directory',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
          "",
        );
      }
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now().toString();
      const sanitizedFilename = path.basename(file.originalname);
      const fileExtension = path.extname(sanitizedFilename);
      const filename = `${timestamp}${fileExtension}`;
      cb(null, filename);
    },
  });

  const IMAGE_MIME_TYPE = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  const MEDIA_FILED = "media";

  const fileFilter = (req, file, cb) => {
    if (IMAGE_MIME_TYPE.includes(file.mimetype)) {
      cb(null, true);
    } else if (FIELD === MEDIA_FILED) {
      cb(null, true);
    } else if (FIELD === 'file') {
      cb(null, true);
    } else {
      cb(
        new HttpException('Invalid file format', HttpStatus.BAD_REQUEST),
        false,
      );
    }
  };

  const limits = {
    fileSize: 8000000,
    files: 10,
  };

  return isMultiple
    ? FilesInterceptor(FIELD, 10, { storage, fileFilter, limits })
    : FileInterceptor(FIELD, { storage, fileFilter, limits });
}