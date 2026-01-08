import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchGetCommand, DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
import { CompanyType } from "src/application/company/command/register-company.command";
import { Company } from "src/domain/company/model/company";
import { CoporateCompany } from "src/domain/company/model/coporate-company";
import { PymeCompany } from "src/domain/company/model/payme-company";
import { CompanyRepository } from "src/domain/company/port/repository/CompanyRepository";

export class DynamoCompanyRepository extends CompanyRepository {
    
    private readonly doc: DynamoDBDocumentClient;
    constructor(
        private readonly tableName: string,
        client?: DynamoDBClient
    ) {
        super();
        const dynamo = client ?? new DynamoDBClient({});
        this.doc = DynamoDBDocumentClient.from(dynamo);
    }

    async save(company: Company): Promise<void> {
        await this.doc.send(
            new PutCommand({
                TableName: this.tableName,
                Item: {
                    pk: `COMPANY#${company.getId()}`,
                    sk: `META#${company.getId()}`,
                    id: company.getId(),
                    name: company.getName(),
                    type: company.getType(),
                    date: company.getDate() ?? new Date().toISOString(),
                },
                ConditionExpression: 'attribute not_exists(pk)'
            })
        )
    }
    async findById(id: string): Promise<Company | null> {
        const res = await this.doc.send(
            new GetCommand({
                TableName: this.tableName,
                Key: {
                    pk: `COMPANY#${id}`,
                    sk: `META#${id}`,
                }
            })
        );
        if(!res.Item) return null;

        return res.Item as Company
    }
    async findByIds(ids: string[]): Promise<Company[]> {
        if (ids.length === 0) return [];

        const keys = ids.map(id => ({
            pk: `COMPANY#${id}`,
            sk: `META#${id}`,
        }));

        const response = await this.doc.send(
            new BatchGetCommand({
            RequestItems: {
                [this.tableName]: {
                Keys: keys,
                },
            },
            }),
        );

        const items = response.Responses?.[this.tableName] ?? [];

        // Aquí se mapea de Dynamo → Dominio
        return items.map(item => this.toDomain(item));
    }

    private toDomain(item: any): Company {
        const company = item.type === CompanyType.PYME 
              ? new PymeCompany(randomUUID(), item.name, new Date())
              : new CoporateCompany(randomUUID(), item.name, new Date());
        return company;
    }

}