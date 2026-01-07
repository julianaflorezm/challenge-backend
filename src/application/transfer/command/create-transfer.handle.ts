import { Injectable } from '@nestjs/common';
import { CreateTransferCommand } from './create-transfer.command';
import { CreateTransferService } from '../../../domain/transfer/service/create-transfer-service';

@Injectable()
export class CreateTransferHandler {
  constructor(private _createTransferService: CreateTransferService) {}

  async run(dto: CreateTransferCommand): Promise<void> {    
    if (dto.amount <= 0) throw new Error('Amount must be greater than 0');
    await this._createTransferService.run(dto);
  }
}
