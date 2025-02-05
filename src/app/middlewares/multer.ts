/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";

import { NextFunction, Request, Response } from "express";

interface getMulterProps {
  upload_file_destination_path: any;
  regex: any;
  images: any;
}

export const getMuler = ({
  upload_file_destination_path,
  regex,
  images,
}: getMulterProps) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync(upload_file_destination_path)) {
        fs.mkdirSync(upload_file_destination_path, { recursive: true });
      }
      cb(null, upload_file_destination_path);
    },
    filename: function (req, file, cb) {
      const extention = path.extname(file.originalname);
      const file_name =
        file.originalname
          .replace(extention, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, file_name + extention);
    },
  });

  // File filter function
  const fileFilter = (
    regex: any,
    images: any,
    file: Express.Multer.File,
    cb: any
  ) => {
    const extName = regex.test(path.extname(file.originalname).toLowerCase());
    const mimeType = regex.test(file.mimetype);

    if (mimeType && extName) {
      return cb(null, true); // Accept the file
    } else {
      return cb(
        new Error(`You can only upload images of type: ${images}.`),
        false
      ); // Reject the file
    }
  };

  return multer({
    storage: storage,
    limits: {
      fileSize: 10000000 * 3,
    },
    fileFilter: (req, file, cb) => fileFilter(regex, images, file, cb),
  });
};

// Middleware for compressing files after upload
export const compressFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return next();
    }

    const filePath = req.file.path;
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    if ([".jpg", ".jpeg", ".png", ".webp"].includes(fileExt)) {
      // Compress images using sharp
      const compressedPath = filePath.replace(fileExt, "-compressed.webp");
      await sharp(filePath)
        // .resize(800) // Resize to 800px width (optional)
        .webp({ quality: 70 }) // Convert to WebP with 70% quality
        .toFile(compressedPath);
      // Ensure sharp has released the file before deleting
    await  fs.promises.unlink(filePath); // Delete original file

      req.file.path = compressedPath; // Update file path in request
      req.file.filename = path.basename(compressedPath);
    }

    next();
  } catch (error) {
    console.error("Compression Error:", error);
    next(error);
  }
};

// else if (fileExt === ".pdf") {
//     // ✅ Compress PDF using Ghostscript
//     const compressedPath = filePath.replace(".pdf", "-compressed.pdf");

//     await gs.execute([
//       "-sDEVICE=pdfwrite",
//       "-dCompatibilityLevel=1.4",
//       "-dPDFSETTINGS=/screen", // Options: /screen (smallest), /ebook, /printer, /prepress
//       "-dNOPAUSE",
//       "-dQUIET",
//       "-dBATCH",
//       `-sOutputFile=${compressedPath}`,
//       filePath,
//     ]);

//     fs.unlinkSync(filePath); // Delete original file
//     req.file.path = compressedPath;
//     req.file.filename = path.basename(compressedPath);
//   }
