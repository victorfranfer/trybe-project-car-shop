import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Verifica a rota de carros', function () {
  describe('Cria um carro', function () {
    it('com SUCESSOO', async function () {
      const carInput: ICar = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };
      const carOutput = {
        id: 1234,
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };
      sinon.stub(Model, 'create').resolves(carOutput);
  
      const service = new CarService();
      const result = await service.create(carInput);
  
      expect(result).to.be.deep.equal(carOutput);
    });
  });

  describe('Lista todos os carros', function () {
    it('com SUCESSSO', async function () {
      const modelOutput = [
        {
          _id: '634852326b35b59438fbea2f',
          model: 'Marea',
          year: 2002,
          color: 'Black',
          status: true,
          buyValue: 15.99,
          doorsQty: 4,
          seatsQty: 5,
        },
        {
          _id: '634852326b35b59438fbea31',
          model: 'Tempra',
          year: 1995,
          color: 'Black',
          status: false,
          buyValue: 39,
          doorsQty: 2,
          seatsQty: 5,
        },
      ];
      const serviceOutput = [
        {
          id: '634852326b35b59438fbea2f',
          model: 'Marea',
          year: 2002,
          color: 'Black',
          status: true,
          buyValue: 15.99,
          doorsQty: 4,
          seatsQty: 5,
        },
        {
          id: '634852326b35b59438fbea31',
          model: 'Tempra',
          year: 1995,
          color: 'Black',
          status: false,
          buyValue: 39,
          doorsQty: 2,
          seatsQty: 5,
        },
      ];
      sinon.stub(Model, 'find').resolves(modelOutput);
  
      const service = new CarService();
      const result = await service.getAll();
  
      expect(result).to.be.deep.equal(serviceOutput);
    });
  });
  describe('Lista um carro por id', function () {
    it('com SUUCESSO', async function () {
      const modelOutput = {
        _id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      };
      const serviceOutput = {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      };
  
      sinon.stub(Model, 'findById').resolves(modelOutput);
  
      const service = new CarService();
      const result = await service.getById('634852326b35b59438fbea2f');
  
      expect(result).to.be.deep.equal(serviceOutput);
    });
    it('com id inexistente', async function () {  
      sinon.stub(Model, 'findById').resolves([]);
  
      const service = new CarService();
      const result = await service.getById('12345634852326b35b59438f');
  
      expect(result?.id).to.be.deep.equal(undefined);
    });
  });

  describe('Atualizar um carro', function () {
    it('com SUCESSO', async function () {
      const input = {
        model: 'Maria',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      };
 
      sinon.stub(Model, 'updateOne').resolves();
  
      const service = new CarService();
      const result = await service.update('634852326b35b59438fbea2f', input);
  
      expect(result).to.be.deep.equal(null);
    });
  });
  describe('Excluir um carro', function () {
    it('com SUCESSO', async function () {
      sinon.stub(Model, 'deleteOne').resolves();
  
      const service = new CarService();
      const result = await service.delete('634852326b35b59438fbea2f');
  
      expect(result).to.be.deep.equal(null);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
