import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTransferHandler } from '../../../application/transfer/command/create-transfer.handle';
import { TransferDto } from '../../../application/transfer/dto/transfer';
import { CreateTransferCommand } from '../../../application/transfer/command/create-transfer.command';

@ApiTags('transfer')
@Controller('transfer')
export class TransferController {
  constructor(
    private readonly _createTranferHandler: CreateTransferHandler,
  ) {}

  @ApiOperation({ summary: 'Create transfer' })
  @ApiCreatedResponse({
    description: 'Create transfer to persist on database',
    type: TransferDto,
  })
  @ApiBody({ type: CreateTransferCommand }) 
  @Post()
  async create(
    @Body()
    transfer: CreateTransferCommand,
  ): Promise<void> {
    await this._createTranferHandler.run(transfer);
  }
}
