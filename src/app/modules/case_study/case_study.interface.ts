// case_study.interface.ts - case_study module
// Interface for TypeScript
export  interface ITestimonial {
    quote: string;
    author: string;
    position: string;
  }
  
  export interface IProject {
    title: string;
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
  