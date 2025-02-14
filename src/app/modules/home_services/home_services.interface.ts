// home_services.interface.ts - home_services module
// Define TypeScript Interface
import { Request } from 'express';



export interface IServices {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image?: string;
}



export interface IServiceRequestWithFile extends Request {
    body: IServices;
    file?: Express.Multer.File;
}