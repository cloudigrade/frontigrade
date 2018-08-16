import { serviceConfig, accountServices, reportServices, systemConfigServices, userServices } from '..';

describe('Services', () => {
  it('should have named methods and classes', () => {
    expect(serviceConfig).toBeDefined();
    expect(accountServices).toBeDefined();
    expect(reportServices).toBeDefined();
    expect(systemConfigServices).toBeDefined();
    expect(userServices).toBeDefined();
  });
});
