import { GetCompaniesService } from '../../../../src/domain/company/service/get-companies-service';
import { GetCompaniesHandler } from 'src/application/company/query/get-companies.handler';
import { GetCompanyByTransferQuery } from 'src/application/company/query/get-companies-count.query';

describe('GetCompaniesHandler', () => {
  const getCompaniesServiceMock: jest.Mocked<GetCompaniesService> = {
    run: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call GetCompaniesService.run and return its result', async () => {
    // Arrange
    const handler = new GetCompaniesHandler(getCompaniesServiceMock);

    const expected: GetCompanyByTransferQuery[] = [
      {
        id: 'c1',
        name: 'Company 1',
        type: 'PYME',
        transfersLastMonthCount: 2,
      },
    ];

    getCompaniesServiceMock.run.mockResolvedValue(expected);

    // Act
    const result = await handler.run();

    // Assert
    expect(getCompaniesServiceMock.run).toHaveBeenCalledTimes(1);
    expect(getCompaniesServiceMock.run).toHaveBeenCalledWith();
    expect(result).toEqual(expected);
  });

  it('should propagate errors thrown by GetCompaniesService', async () => {
    const handler = new GetCompaniesHandler(getCompaniesServiceMock);

    getCompaniesServiceMock.run.mockRejectedValue(new Error('boom'));

    await expect(handler.run()).rejects.toThrow('boom');
    expect(getCompaniesServiceMock.run).toHaveBeenCalledTimes(1);
  });
});
