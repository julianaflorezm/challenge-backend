import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './infrastructure/company/company.module';
import { TransferModule } from './infrastructure/transfer/transfer.module';
import { CompanyProviderModule } from './infrastructure/company/provider/company-provider.module';

@Module({
  imports: [
    CompanyProviderModule,
    TransferModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'env/.env',
    }),
    CompanyModule,
    TransferModule
  ],
})
export class AppModule {}
