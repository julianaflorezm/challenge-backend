import { RegisterCompanyService } from "../../../../src/domain/company/service/register-company-service";
import { CompanyType, RegisterCompanyCommand } from "../../../../src/application/company/command/register-company.command";
import { RegisterCompanyHandler } from "../../../../src/application/company/command/register-company.hadler";


describe('RegisterCompanyHandler', () => {
  const registerCompanyServiceMock: jest.Mocked<RegisterCompanyService> = {
    run: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call RegisterCompanyService.run and return its result', async () => {
    // Arrange
    const handler = new RegisterCompanyHandler(registerCompanyServiceMock);

    const dto: RegisterCompanyCommand = {
      name: 'Test Company',
      type: CompanyType.PYME,
    };

    const expected = { created: { id: 'uuid-123' } };

    registerCompanyServiceMock.run.mockResolvedValue(expected);

    // Act
    const result = await handler.run(dto);

    // Assert
    expect(registerCompanyServiceMock.run).toHaveBeenCalledTimes(1);
    expect(registerCompanyServiceMock.run).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expected);
  });

  it('should propagate errors thrown by RegisterCompanyService', async () => {
    const handler = new RegisterCompanyHandler(registerCompanyServiceMock);

    const dto: RegisterCompanyCommand = {
      name: 'Test Company',
      type: CompanyType.PYME,
    };

    registerCompanyServiceMock.run.mockRejectedValue(new Error('boom'));

    await expect(handler.run(dto)).rejects.toThrow('boom');
    expect(registerCompanyServiceMock.run).toHaveBeenCalledWith(dto);
  });
});
