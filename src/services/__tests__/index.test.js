import * as services from '..';

describe('Services', () => {
  it('should export a specific number of methods and classes', () => {
    expect(Object.keys(services)).toHaveLength(5);
  });

  it('should have specific methods and classes', () => {
    expect(services.serviceConfig).toBeDefined();
    expect(services.accountServices).toBeDefined();
    expect(services.reportServices).toBeDefined();
    expect(services.systemConfigServices).toBeDefined();
    expect(services.userServices).toBeDefined();
  });
});
