import { Module } from '@nestjs/common';
import { CompanyRepository } from '../../../domain/company/port/repository/CompanyRepository';
import { TransferRepository } from '../../../domain/transfer/port/repository/TransferRepository';
import { transferRepositoryProvider } from 'src/infrastructure/transfer/provider/repository/transfer-repository.provider';
import { CreateTransferService } from 'src/domain/transfer/service/create-transfer-service';
import { createTranfersServiceProvider } from './service/create-transfer-service.provider';
import { CreateTransferHandler } from 'src/application/transfer/command/create-transfer.handle';
import { companyRepositoryProvider } from 'src/infrastructure/company/provider/repository/company-repository.provider';

@Module({
  imports: [],
  providers: [
    {
      provide: CreateTransferService,
      inject: [CompanyRepository, TransferRepository],
      useFactory: createTranfersServiceProvider,
    },
    CreateTransferHandler,
    companyRepositoryProvider,
    transferRepositoryProvider
  ],
  exports: [
    CreateTransferService,
    CompanyRepository,
    TransferRepository,
    CreateTransferHandler,
  ],
})
export class TransferProviderModule {}
