import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMoto from '../../../src/Interfaces/IMotorcycle';
import MotoService from '../../../src/Services/MotorcycleService';

describe('Verifica a rota de motos', function () {
  describe('Cria uma moto', function () {
    it('com SUCESSOO', async function () {
      const motoInput: IMoto = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        category: 'Street',
        engineCapacity: 600,
      };
      const motoOutput = {
        id: 1234,
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        category: 'Street',
        engineCapacity: 600,
      };
      sinon.stub(Model, 'create').resolves(motoOutput);
  
      const service = new MotoService();
      const result = await service.create(motoInput);
  
      expect(result).to.be.deep.equal(motoOutput);
    });
  });

  describe('Lista todos as motos', function () {
    it('com SUCESSSO', async function () {
      const modelOutput = [
        {
          _id: '634852326b35b59438fbea2f',
          model: 'Honda Cb 600f Hornet',
          year: 2005,
          color: 'Yellow',
          status: true,
          buyValue: 30.000,
          category: 'Street',
          engineCapacity: 600,
        },
        {
          _id: '634852326b35b59438fbea31',
          model: 'Honda Cbr 1000rr',
          year: 2011,
          color: 'Orange',
          status: true,
          buyValue: 59.900,
          category: 'Street',
          engineCapacity: 1000,
        },
      ];
      const serviceOutput = [
        {
          id: '634852326b35b59438fbea2f',
          model: 'Honda Cb 600f Hornet',
          year: 2005,
          color: 'Yellow',
          status: true,
          buyValue: 30.000,
          category: 'Street',
          engineCapacity: 600,
        },
        {
          id: '634852326b35b59438fbea31',
          model: 'Honda Cbr 1000rr',
          year: 2011,
          color: 'Orange',
          status: true,
          buyValue: 59.900,
          category: 'Street',
          engineCapacity: 1000,
        },
      ];
      sinon.stub(Model, 'find').resolves(modelOutput);
  
      const service = new MotoService();
      const result = await service.getAll();
  
      expect(result).to.be.deep.equal(serviceOutput);
    });
  });
  describe('Lista uma moto por id', function () {
    it('com SUCESSO', async function () {
      const modelOutput = {
        _id: '634852326b35b59438fbea31',
        model: 'HB20',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      };
      const serviceOutput = {
        id: '634852326b35b59438fbea31',
        model: 'HB20',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      };
  
      sinon.stub(Model, 'findById').resolves(modelOutput);
  
      const service = new MotoService();
      const result = await service.getById('634852326b35b59438fbea31');
  
      expect(result).to.be.deep.equal(serviceOutput);
    });
    it('com id inexistente', async function () {  
      sinon.stub(Model, 'findById').resolves([]);
  
      const service = new MotoService();
      const result = await service.getById('12345634852326b35b59438f');
  
      expect(result?.id).to.be.deep.equal(undefined);
    });
  });

  describe('Atualizar uma moto', function () {
    it('com SUCESSO', async function () {
      const input = {
        model: 'HB20',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      };

      sinon.stub(Model, 'updateOne').resolves();
  
      const service = new MotoService();
      const result = await service.update('634852326b35b59438fbea31', input);
  
      expect(result).to.be.deep.equal(null);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});