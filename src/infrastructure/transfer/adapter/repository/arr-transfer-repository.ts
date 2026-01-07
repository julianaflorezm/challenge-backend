import { Injectable, NotFoundException } from '@nestjs/common';
import { Transfer } from '../../../../domain/transfer/model/transfer';
import { TransferRepository } from 'src/domain/transfer/port/repository/TransferRepository';
import { CompanyRepository } from 'src/domain/company/port/repository/CompanyRepository';

@Injectable()
export class ArrTransferRepository implements TransferRepository {

  private tranfers: Transfer[] = [];

  async save(transfer: Transfer): Promise<void> {
    this.tranfers.push(transfer);
  }

  async findCompanyIdsWithTransfersLastMonth(date?: Date): Promise<string[]> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const ids = this.tranfers
    .filter(t => t.getDate() >= lastMonth)
    .map(t => t.getCompanyId());

    return [...new Set(ids)]
  }

  async countByCompanyIdsLastMonth(companyIds: string[], ref: Date = new Date()) {
  const lastMonth = new Date(ref);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const set = new Set(companyIds);
  const counts: Record<string, number> = {};

  for (const t of this.tranfers) {
    if (t.getDate() >= lastMonth && set.has(t.getCompanyId())) {
      const id = t.getCompanyId();
      counts[id] = (counts[id] ?? 0) + 1;
    }
  }

  return counts;
}

}
