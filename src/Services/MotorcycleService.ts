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

  public async getAll() {
    const motoODM = new MotorcycleODM();
    const motos = await motoODM.getAll();
    return motos.map((moto) => ({ id: moto._id,
      model: moto.model,
      year: moto.year,
      color: moto.color,
      status: moto.status,
      buyValue: moto.buyValue,
      engineCapacity: moto.engineCapacity,
      category: moto.category }));
  }

  public async getById(id: string) {
    const motoODM = new MotorcycleODM();
    const moto = await motoODM.getById(id);
    if (!moto) return null;
    return {
      id: moto._id,
      model: moto.model,
      year: moto.year,
      color: moto.color,
      status: moto.status,
      buyValue: moto.buyValue,
      engineCapacity: moto.engineCapacity,
      category: moto.category };
  }

  public async update(id: string, newMoto: IMoto) {
    const motoODM = new MotorcycleODM();
    const moto = await motoODM.update(id, newMoto);
    if (!moto) return null;
    return { ...newMoto, id };
  }
}

export default MotorcycleService;