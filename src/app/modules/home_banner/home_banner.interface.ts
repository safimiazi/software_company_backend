import { Request } from "express";

export interface IHomeBanner {
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  filename?: string | null;
}

export interface IHomeBannerRequestWithFile extends Request {
  body: IHomeBanner;
  file?: Express.Multer.File;
}
