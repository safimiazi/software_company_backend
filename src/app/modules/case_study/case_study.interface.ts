// case_study.interface.ts - case_study module

import { Request } from "express";

// Interface for TypeScript
export  interface ITestimonial {
    quote: string;
    author: string;
    position: string;
  }
  
  export interface ICaseStudy {
    title: string;
    sectionHeader: string;
    client: string;
    category: string;
    duration: string;
    image: string;
    challenge: string;
    solution: string;
    results: string[];
    technologies: string[];
    testimonial: ITestimonial;
  }
  
  export interface ICaseStudyRequestWithFile extends Request {
    body: ICaseStudy;
    file?: Express.Multer.File;
  }