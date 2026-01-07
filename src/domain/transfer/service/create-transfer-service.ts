import { randomUUID } from 'crypto';
import { CreateTransferCommand } from '../../../application/transfer/command/create-transfer.command';
import { Transfer } from '../model/transfer';
import { TransferRepository } from '../port/repository/TransferRepository';
import { CompanyRepository } from '../../../domain/company/port/repository/CompanyRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTransferService {
  constructor(
    private readonly _companyRepository: CompanyRepository,
    private readonly _transferRepository: TransferRepository,
  ) {}

  async run(dto: CreateTransferCommand): Promise<void> {    
    const company = await this._companyRepository.findById(dto.company_id);
    if(!company) throw new Error('Company not found');
    
    const transfer = new Transfer(randomUUID(), dto.company_id, dto.amount, new Date());
    this._transferRepository.save(transfer);
  }
}
