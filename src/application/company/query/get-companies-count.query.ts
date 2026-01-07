import { ApiProperty } from '@nestjs/swagger';

export class GetCompanyByTransferQuery {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ example: 'PYME' })
  type: string;

  @ApiProperty({ example: 3 })
  transfersLastMonthCount: number;
}
