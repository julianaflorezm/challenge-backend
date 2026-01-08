import { RegisterCompanyHandler } from "../../../../src/application/company/command/register-company.hadler";
import { DynamoCompanyRepository } from "../../../../src/infrastructure/company/adapter/dynamo/dynamo-company.repository";

export function makeRegisterCompanyHandler() {
  const tableName = process.env.COMPANY_TABLE_NAME!;
  const repo = new DynamoCompanyRepository(tableName);
  return new RegisterCompanyHandler(repo as any);
}
