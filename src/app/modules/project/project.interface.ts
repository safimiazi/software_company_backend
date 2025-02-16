import { Request } from "express";

export interface IProject {
    title: string;
    description: string;
    image?: string;
    technologies: string[];
    stars: number;
    demoUrl?: string;  
    githubUrl?: string;  
    features: string[];
    overview: string;
    challenges: string[];
    impact: string[];
  }
  
  export interface IProjectRequestWithFile extends Request {
    body: IProject;
    file?: Express.Multer.File;
  }



  