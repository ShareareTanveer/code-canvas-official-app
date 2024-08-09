import { Request, Response, NextFunction } from 'express';

export function stringParser() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.keyPoints === 'string') {
      req.body.keyPoints = JSON.parse(req.body.keyPoints);
    }

    if (typeof req.body.faqs === 'string') {
      req.body.faqs = JSON.parse(req.body.faqs);
    }

    if (typeof req.body.deleteImages === 'string') {
      req.body.deleteImages = JSON.parse(req.body.deleteImages);
    }

    console.log(req.body.deleteImages)

    if (typeof req.body.addFaqs === 'string') {
      req.body.addFaqs = JSON.parse(req.body.addFaqs);
    }
    
    if (typeof req.body.deleteFaqs === 'string') {
      req.body.deleteFaqs = JSON.parse(req.body.deleteFaqs);
    }

    if (typeof req.body.company === 'string') {
      req.body.company = JSON.parse(req.body.company);
    }

    if (typeof req.body.contactPerson === 'string') {
      req.body.contactPerson = JSON.parse(req.body.contactPerson);
    }

    if (typeof req.body.price === 'string') {
      req.body.price = parseFloat(req.body.price);
    }
    if (typeof req.body.category === 'string') {
      req.body.category = parseInt(req.body.category);
    }
    next();
  };
}
