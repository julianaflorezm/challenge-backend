import { Module } from '@nestjs/common';
import { CompanyRepository } from '../../../domain/company/port/repository/CompanyRepository';
import { RegisterCompanyService } from '../../../domain/company/service/register-company-service';
import { registerCompanyServiceProvider } from './service/register-company';
import { RegisterCompanyHandler } from '../../../application/company/command/register-company.hadler';
import { GetCompaniesHandler } from '../../../application/company/query/get-companies.handler';
import { companyRepositoryProvider } from './repository/company-repository.provider';
import { GetCompaniesService } from '../../../domain/company/service/get-companies-service';
import { getCompaniesServiceProvider } from './service/get-companies-service.provider';
import { TransferRepository } from '../../../domain/transfer/port/repository/TransferRepository';
import { transferRepositoryProvider } from 'src/infrastructure/transfer/provider/repository/transfer-repository.provider';

@Module({
  imports: [],
  providers: [
    {
      provide: GetCompaniesService,
      inject: [CompanyRepository, TransferRepository],
      useFactory: getCompaniesServiceProvider,
    },
    {
      provide: RegisterCompanyService,
      inject: [CompanyRepository],
      useFactory: registerCompanyServiceProvider,
    },
    RegisterCompanyHandler,
    GetCompaniesHandler,
    companyRepositoryProvider,
    transferRepositoryProvider
  ],
  exports: [
    RegisterCompanyService,
    GetCompaniesService,
    CompanyRepository,
    TransferRepository,
    RegisterCompanyHandler,
    GetCompaniesHandler,
    companyRepositoryProvider
  ],
})
export class CompanyProviderModule {}
