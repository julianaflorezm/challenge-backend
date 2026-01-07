export class Transfer {
    constructor(
        private readonly id: string,
        private readonly companyId: string,
        private readonly amount: number,
        private readonly date: Date,
    ){}

  getId(): string {
      return this.id;
  }

  getCompanyId(): string {
    return this.companyId;
  }

  getAmount(): number {
    return this.amount;
  }

  getDate(): Date {
    return this.date;
  }
}