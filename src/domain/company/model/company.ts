import { randomUUID } from "crypto";
import { Transfer } from "src/domain/transfer/model/transfer";

export abstract class Company {
  constructor(
    protected readonly id: string,
    protected readonly name: string,
    protected readonly date: Date
  ) {}

  getId(): string {
      return this.id;
  }

  getName(): string {
      return this.name;
  }

  getDate(): Date {
      return this.date;
  }

  abstract getType(): string;
}