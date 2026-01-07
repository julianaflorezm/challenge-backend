import { Module } from '@nestjs/common';
import { CompanyController } from './controller/company.controller';
import { CompanyProviderModule } from './provider/company-provider.module';

@Module({
  imports: [CompanyProviderModule],
  controllers: [CompanyController],
})
export class CompanyModule {}
