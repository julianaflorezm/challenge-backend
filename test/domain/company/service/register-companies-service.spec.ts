import { RegisterCompanyService } from "../../../../src/domain/company/service/register-company-service";
import { CompanyRepository } from "../../../../src/domain/company/port/repository/CompanyRepository";
import { CompanyType, RegisterCompanyCommand } from "../../../../src/application/company/command/register-company.command";
import { PymeCompany } from "../../../../src/domain/company/model/payme-company";
import { CoporateCompany } from "../../../../src/domain/company/model/coporate-company";


describe('RegisterCompanyService', () => {
  const companyRepositoryMock: jest.Mocked<CompanyRepository> = {
    save: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create and save a PYME company', async () => {
    // Arrange
    const service = new RegisterCompanyService(companyRepositoryMock);

    const dto: RegisterCompanyCommand = {
      name: 'Test Pyme',
      type: CompanyType.PYME,
    };

    const saveSpy = jest.spyOn(companyRepositoryMock, 'save');

    // Act
    const result = await service.run(dto);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);

    const savedCompany = saveSpy.mock.calls[0][0];

    expect(savedCompany).toBeInstanceOf(PymeCompany);
    expect(savedCompany.getName()).toBe('Test Pyme');
    expect(result.created.id).toBeDefined();
    expect(typeof result.created.id).toBe('string');
  });

  it('should create and save a CORPORATE company', async () => {
    // Arrange
    const service = new RegisterCompanyService(companyRepositoryMock);

    const dto: RegisterCompanyCommand = {
      name: 'Test Corporate',
      type: CompanyType.COPORATE,
    };

    const saveSpy = jest.spyOn(companyRepositoryMock, 'save');

    // Act
    const result = await service.run(dto);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);

    const savedCompany = saveSpy.mock.calls[0][0];

    expect(savedCompany).toBeInstanceOf(CoporateCompany);
    expect(savedCompany.getName()).toBe('Test Corporate');
    expect(result.created.id).toBeDefined();
    expect(typeof result.created.id).toBe('string');
  });

  it('should return the created company id', async () => {
    // Arrange
    const service = new RegisterCompanyService(companyRepositoryMock);

    const dto: RegisterCompanyCommand = {
      name: 'Any Company',
      type: CompanyType.PYME,
    };

    // Act
    const result = await service.run(dto);

    // Assert
    expect(result).toHaveProperty('created.id');
    expect(typeof result.created.id).toBe('string');
  });
});
