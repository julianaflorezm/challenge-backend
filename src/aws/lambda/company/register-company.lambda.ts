import aws_sdk from "aws-lambda"
import { RegisterCompanyCommand } from "../../../../src/application/company/command/register-company.command";
import { makeRegisterCompanyHandler } from "../composition/register.company.composition";

export const handler = async (event: aws_sdk.APIGatewayProxyEvent): Promise<aws_sdk.APIGatewayProxyResultV2> => {
    try {
        const body = event.body ? JSON.parse(event.body) : null;

        if (!body?.name || !body?.type) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid body. Required: name, type' }),
            }
        }

        const command: RegisterCompanyCommand = {
          name: body.name,
          type: body.type,
        };

        const useCase = makeRegisterCompanyHandler();
        const result = await useCase.run(command);

        return {
        statusCode: 201,
        body: JSON.stringify(result),
        };
    } catch (err : any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error'})
        }
    }
}