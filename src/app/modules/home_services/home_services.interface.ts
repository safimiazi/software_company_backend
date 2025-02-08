// home_services.interface.ts - home_services module
// Define TypeScript Interface
import { Request } from 'express';

interface IService {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface IServices {
  title: string;
  description: string;
  heading: string;
  ctaText: string;
  ctaLink: string;
  services: IService[];
}



export interface IServiceRequestWithFile extends Request {
    body: IServices;
    file?: Express.Multer.File;
}