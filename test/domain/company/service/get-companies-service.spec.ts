import { CompanyRepository } from '../../../../src/domain/company/port/repository/CompanyRepository';
import { TransferRepository } from '../../../../src/domain/transfer/port/repository/TransferRepository';
import { GetCompaniesService } from '../../../../src/domain/company/service/get-companies-service';

describe('GetCompaniesService', () => {
  const companyRepositoryMock: jest.Mocked<CompanyRepository> = {
    // ajusta si tu interfaz tiene más métodos
    findByIds: jest.fn(),
  } as any;

  const transferRepositoryMock: jest.Mocked<TransferRepository> = {
    // ajusta si tu interfaz tiene más métodos
    findCompanyIdsWithTransfersLastMonth: jest.fn(),
    countByCompanyIdsLastMonth: jest.fn(),
  } as any;

  const makeCompany = (id: string, name: string, type: string) => ({
    getId: () => id,
    getName: () => name,
    getType: () => type,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return companies with transfersLastMonthCount', async () => {
    // Arrange
    const companyIds = ['c1', 'c2'];

    transferRepositoryMock.findCompanyIdsWithTransfersLastMonth.mockResolvedValue(companyIds);

    const companies = [
      makeCompany('c1', 'Company 1', 'PYME'),
      makeCompany('c2', 'Company 2', 'COPORATE'),
    ];

    companyRepositoryMock.findByIds.mockResolvedValue(companies as any);

    transferRepositoryMock.countByCompanyIdsLastMonth.mockResolvedValue({
      c1: 2,
      c2: 1,
    });

    const service = new GetCompaniesService(companyRepositoryMock, transferRepositoryMock);

    // Act
    const result = await service.run();

    // Assert
    expect(transferRepositoryMock.findCompanyIdsWithTransfersLastMonth).toHaveBeenCalledTimes(1);
    expect(companyRepositoryMock.findByIds).toHaveBeenCalledTimes(1);
    expect(companyRepositoryMock.findByIds).toHaveBeenCalledWith(companyIds);

    expect(transferRepositoryMock.countByCompanyIdsLastMonth).toHaveBeenCalledTimes(1);
    expect(transferRepositoryMock.countByCompanyIdsLastMonth).toHaveBeenCalledWith(['c1', 'c2']);
  });

  it('should default transfersLastMonthCount to 0 if not present in counts', async () => {
    // Arrange
    const companyIds = ['c1'];

    transferRepositoryMock.findCompanyIdsWithTransfersLastMonth.mockResolvedValue(companyIds);

    const companies = [makeCompany('c1', 'Company 1', 'PYME')];
    companyRepositoryMock.findByIds.mockResolvedValue(companies as any);

    // counts no trae c1
    transferRepositoryMock.countByCompanyIdsLastMonth.mockResolvedValue({});

    const service = new GetCompaniesService(companyRepositoryMock, transferRepositoryMock);

    // Act
    const result = await service.run();

    // Assert
    expect(result).toEqual([
      {
        id: 'c1',
        name: 'Company 1',
        type: 'PYME',
        transfersLastMonthCount: 0,
      },
    ]);
  });
});
