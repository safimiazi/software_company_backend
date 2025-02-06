// home_about.interface.ts - home_about module
import { Request } from "express";

export interface IHomeAbout {
  title: string;
  heading: string;
  description: string;
  filename: string | null;
  image?: string ;
}

export interface IHomeAboutRequestWithFile extends Request {
  body: IHomeAbout;
  file: Express.Multer.File;
}
