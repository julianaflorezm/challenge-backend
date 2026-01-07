import { Module } from '@nestjs/common';
import { TransferController } from './controller/transfer.controller';
import { CompanyProviderModule } from '../company/provider/company-provider.module';
import { CreateTransferService } from 'src/domain/transfer/service/create-transfer-service';
import { CreateTransferHandler } from 'src/application/transfer/command/create-transfer.handle';

@Module({
  imports: [CompanyProviderModule],
  providers: [CreateTransferService, CreateTransferHandler],
  controllers: [TransferController],
})
export class TransferModule {}
