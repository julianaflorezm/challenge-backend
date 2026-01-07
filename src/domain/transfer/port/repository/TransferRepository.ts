import { Transfer } from "../../model/transfer";

export abstract class TransferRepository {
    abstract save(transfer: Transfer): Promise<void>;
    abstract findCompanyIdsWithTransfersLastMonth(date?: Date): Promise<string[]>;
    abstract countByCompanyIdsLastMonth(companyIds: string[], ref?: Date): Promise<Record<string, number>>;
}