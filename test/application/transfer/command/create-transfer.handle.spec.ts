import { CreateTransferHandler } from "src/application/transfer/command/create-transfer.handle";
import { CreateTransferCommand } from "../../../../src/application/transfer/command/create-transfer.command";
import { CreateTransferService } from "../../../../src/domain/transfer/service/create-transfer-service";


describe('CreateTransferHandler', () => {
 const createTransferServiceMock: jest.Mocked<CreateTransferService> = {
    run: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if amount is less than or equal to 0', async () => {
    // Arrange
    const handler = new CreateTransferHandler(createTransferServiceMock);

    const dto: CreateTransferCommand = {
      amount: 0,
      company_id: 'company-1',
    };

    // Act + Assert
    await expect(handler.run(dto)).rejects.toThrow(
      'Amount must be greater than 0',
    );

    // Service NO debe ser llamado
    expect(createTransferServiceMock.run).not.toHaveBeenCalled();
  });

  it('should call CreateTransferService.run when amount is valid', async () => {
    // Arrange
    const handler = new CreateTransferHandler(createTransferServiceMock);

    const dto: CreateTransferCommand = {
      amount: 50000,
      company_id: 'company-1',
    };

    createTransferServiceMock.run.mockResolvedValue(undefined);

    // Act
    await handler.run(dto);

    // Assert
    expect(createTransferServiceMock.run).toHaveBeenCalledTimes(1);
    expect(createTransferServiceMock.run).toHaveBeenCalledWith(dto);
  });

  it('should propagate errors thrown by CreateTransferService', async () => {
    // Arrange
    const handler = new CreateTransferHandler(createTransferServiceMock);

    const dto: CreateTransferCommand = {
      amount: 100,
      company_id: 'company-1',
    };

    createTransferServiceMock.run.mockRejectedValue(new Error('boom'));

    // Act + Assert
    await expect(handler.run(dto)).rejects.toThrow('boom');
    expect(createTransferServiceMock.run).toHaveBeenCalledWith(dto);
  });
});
