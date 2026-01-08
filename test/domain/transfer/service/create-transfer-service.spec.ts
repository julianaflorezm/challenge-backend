import { CreateTransferCommand } from "../../../../src/application/transfer/command/create-transfer.command";
import { CompanyRepository } from "../../../../src/domain/company/port/repository/CompanyRepository";
import { Transfer } from "../../../../src/domain/transfer/model/transfer";
import { TransferRepository } from "../../../../src/domain/transfer/port/repository/TransferRepository";
import { CreateTransferService } from "../../../../src/domain/transfer/service/create-transfer-service";


describe('CreateTransferService', () => {
  const companyRepositoryMock: jest.Mocked<CompanyRepository> = {
    findById: jest.fn(),
  } as any;

  const transferRepositoryMock: jest.Mocked<TransferRepository> = {
    save: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create and save a transfer when company exists', async () => {
    // Arrange
    const service = new CreateTransferService(companyRepositoryMock, transferRepositoryMock);

    const dto: CreateTransferCommand = {
      amount: 50000,
      company_id: 'company-1',
    };

    // Simulamos que la company existe
    companyRepositoryMock.findById.mockResolvedValue({ getId: () => 'company-1' } as any);

    const findSpy = jest.spyOn(companyRepositoryMock, 'findById');
    const saveSpy = jest.spyOn(transferRepositoryMock, 'save');

    // Act
    await service.run(dto);

    // Assert
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith('company-1');

    expect(saveSpy).toHaveBeenCalledTimes(1);

    // Inspeccionamos el objeto transfer guardado
    const savedTransfer = saveSpy.mock.calls[0][0];

    expect(savedTransfer).toBeInstanceOf(Transfer);
    expect(savedTransfer.getCompanyId?.() ?? savedTransfer['companyId']).toBeDefined(); // por si no tienes getter
  });

  it('should throw error when company does not exist', async () => {
    // Arrange
    const service = new CreateTransferService(companyRepositoryMock, transferRepositoryMock);

    const dto: CreateTransferCommand = {
      amount: 50000,
      company_id: 'missing-company',
    };

    companyRepositoryMock.findById.mockResolvedValue(null);

    const saveSpy = jest.spyOn(transferRepositoryMock, 'save');

    // Act + Assert
    await expect(service.run(dto)).rejects.toThrow('Company not found');

    expect(companyRepositoryMock.findById).toHaveBeenCalledWith('missing-company');

    // Asegura que no se guardó nada
    expect(saveSpy).not.toHaveBeenCalled();
  });
});
