import { NextFunction, Request, Response } from 'express';
import IMoto from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const car: IMoto = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
      status: this.req.body.status ? this.req.body.status : false,
    };

    try {
      const newMoto = await this.service.create(car);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;
