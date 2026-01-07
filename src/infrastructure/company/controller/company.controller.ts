import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterCompanyHandler } from '../../../application/company/command/register-company.hadler';
import { GetCompaniesHandler } from '../../../application/company/query/get-companies.handler';
import { RegisterCompanyCommand } from '../../../application/company/command/register-company.command';
import { CompanyDto } from '../../../application/company/dto/company.dto';
import { GetCompanyByTransferQuery } from '../../../application/company/query/get-companies-count.query';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(
    private readonly _registerCompanyHandler: RegisterCompanyHandler,
    private readonly _getCompaniesHandler: GetCompaniesHandler,
  ) {}

  @ApiOperation({ summary: 'Register company' })
  @ApiCreatedResponse({
    description: 'Company persisted on database',
    type: CompanyDto,
  })
  @ApiBody({ type: RegisterCompanyCommand }) 
  @Post()
  async create(
    @Body()
    company: RegisterCompanyCommand,
  ): Promise<{ created: { id: string }}> {
    return await this._registerCompanyHandler.run(company);
  }

  @Get()
  @ApiOperation({ summary: 'Find all companies that have had transfers in the last month' })
  @ApiResponse({
    status: 200,
    description: 'Find companies persisted on database',
    type: GetCompanyByTransferQuery, 
    isArray: true,
  })
  async getAll(): Promise<GetCompanyByTransferQuery[]> {
    return await this._getCompaniesHandler.run();
  }


}
