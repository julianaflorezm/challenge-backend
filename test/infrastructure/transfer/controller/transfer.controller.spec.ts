import { Test, TestingModule } from '@nestjs/testing';
import { TransferController } from '../../../../src/infrastructure/transfer/controller/transfer.controller';
import { CreateTransferHandler } from '../../../../src/application/transfer/command/create-transfer.handle';
import { CreateTransferCommand } from '../../../../src/application/transfer/command/create-transfer.command';


describe('TransferController', () => {
  let controller: TransferController;

  const createTransferHandlerMock = {
    run: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferController],
      providers: [
        { provide: CreateTransferHandler, useValue: createTransferHandlerMock },
      ],
    }).compile();

    controller = module.get<TransferController>(TransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call CreateTransferHandler.run with the command', async () => {
      // Arrange
      const command: CreateTransferCommand = {
        amount: 50000,
        company_id: '36e440a2-446e-4c0c-97a3-a2b497d5fb6b',
      };

      createTransferHandlerMock.run.mockResolvedValue(undefined);

      // Act
      const result = await controller.create(command);

      // Assert
      expect(createTransferHandlerMock.run).toHaveBeenCalledTimes(1);
      expect(createTransferHandlerMock.run).toHaveBeenCalledWith(command);
      expect(result).toBeUndefined(); // tu controller retorna void
    });

    it('should propagate errors thrown by CreateTransferHandler', async () => {
      const command: CreateTransferCommand = {
        amount: 50000,
        company_id: 'missing',
      };

      createTransferHandlerMock.run.mockRejectedValue(new Error('boom'));

      await expect(controller.create(command)).rejects.toThrow('boom');
      expect(createTransferHandlerMock.run).toHaveBeenCalledWith(command);
    });
  });
});
