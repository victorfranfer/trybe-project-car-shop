import Motorcycle from '../Domains/Motorcycle';
import IMoto from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  public async create(car: IMoto) {
    const carODM = new MotorcycleODM();
    const newMoto = await carODM.create(car);
    return new Motorcycle({
      id: newMoto.id,
      model: newMoto.model,
      year: newMoto.year,
      color: newMoto.color,
      status: newMoto.status,
      buyValue: newMoto.buyValue,
      engineCapacity: newMoto.engineCapacity,
      category: newMoto.category,
    });
  }
}

export default MotorcycleService;