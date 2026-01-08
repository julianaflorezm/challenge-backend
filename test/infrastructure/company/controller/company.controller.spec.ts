import { Test, TestingModule } from '@nestjs/testing';
import { RegisterCompanyCommand } from '../../../../src/application/company/command/register-company.command';
import { RegisterCompanyHandler } from '../../../../src/application/company/command/register-company.hadler';
import { GetCompaniesHandler } from '../../../../src/application/company/query/get-companies.handler';
import { CompanyController } from '../../../../src/infrastructure/company/controller/company.controller';

describe('CompanyController', () => {
  let controller: CompanyController;

  // Mocks tipados y reutilizables
  const registerCompanyHandlerMock = {
    run: jest.fn(),
  };

  const getCompaniesHandlerMock = {
    run: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        { provide: RegisterCompanyHandler, useValue: registerCompanyHandlerMock },
        { provide: GetCompaniesHandler, useValue: getCompaniesHandlerMock },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call RegisterCompanyHandler.run with the command and return created id', async () => {
      // Arrange
      const command: RegisterCompanyCommand = {
        name: 'Test Company',
        type: 'PYME' as any, // ajusta si tu type es enum
      };

      const expectedResponse = { created: { id: 'uuid-123' } };

      registerCompanyHandlerMock.run.mockResolvedValue(expectedResponse);

      // Act
      const result = await controller.create(command);

      // Assert
      expect(registerCompanyHandlerMock.run).toHaveBeenCalledTimes(1);
      expect(registerCompanyHandlerMock.run).toHaveBeenCalledWith(command);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate errors thrown by RegisterCompanyHandler', async () => {
      const command: RegisterCompanyCommand = {
        name: 'Test Company',
        type: 'PYME' as any,
      };

      registerCompanyHandlerMock.run.mockRejectedValue(new Error('boom'));

      await expect(controller.create(command)).rejects.toThrow('boom');
      expect(registerCompanyHandlerMock.run).toHaveBeenCalledWith(command);
    });
  });

  describe('getAll', () => {
    it('should call GetCompaniesHandler.run and return the companies list', async () => {
      // Arrange
      const expected = [
        {
          id: 'c1',
          name: 'Company 1',
          type: 'PYME',
          transfersLastMonthCount: 2,
        },
        {
          id: 'c2',
          name: 'Company 2',
          type: 'CORPORATE',
          transfersLastMonthCount: 1,
        },
      ];

      getCompaniesHandlerMock.run.mockResolvedValue(expected);

      // Act
      const result = await controller.getAll();

      // Assert
      expect(getCompaniesHandlerMock.run).toHaveBeenCalledTimes(1);
      expect(getCompaniesHandlerMock.run).toHaveBeenCalledWith();
      expect(result).toEqual(expected);
    });

    it('should propagate errors thrown by GetCompaniesHandler', async () => {
      getCompaniesHandlerMock.run.mockRejectedValue(new Error('fail'));

      await expect(controller.getAll()).rejects.toThrow('fail');
      expect(getCompaniesHandlerMock.run).toHaveBeenCalledTimes(1);
    });
  });
});
