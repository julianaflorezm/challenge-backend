import { CompanyRepository } from "src/domain/company/port/repository/CompanyRepository";
import { TransferRepository } from '../../../../domain/transfer/port/repository/TransferRepository';
import { CreateTransferService } from "../../../../domain/transfer/service/create-transfer-service";

export function createTranfersServiceProvider(companyRepostory: CompanyRepository, transferRepository: TransferRepository) {
  return new CreateTransferService(companyRepostory, transferRepository);
}
