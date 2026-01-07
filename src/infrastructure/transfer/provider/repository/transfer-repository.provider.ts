import { TransferRepository } from 'src/domain/transfer/port/repository/TransferRepository';
import { ArrTransferRepository } from '../../adapter/repository/arr-transfer-repository';

export const transferRepositoryProvider = {
  provide: TransferRepository,
  useClass: ArrTransferRepository,
};
