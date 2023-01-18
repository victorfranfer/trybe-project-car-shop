import {
  Model,
  Schema,
  model,
  models,
  // UpdateQuery,
  // isValidObjectId,
} from 'mongoose';
import IMoto from '../Interfaces/IMotorcycle';

class MotorcycleODM {
  private schema: Schema;
  private model: Model<IMoto>;

  constructor() {
    this.schema = new Schema<IMoto>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
  }

  public async create(car: IMoto): Promise<IMoto> {
    return this.model.create({ ...car });
  }
}

export default MotorcycleODM;