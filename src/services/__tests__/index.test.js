import * as services from '../';

describe('test', () => {
  it('Should export a default services config', () => {
    expect(services.serviceConfig).toBeDefined();

    const configObject = services.serviceConfig(
      {
        method: 'post',
        timeout: 3
      },
      true
    );

    expect(configObject.method).toEqual('post');
    expect(configObject.timeout).toEqual(3);

    expect(configObject.headers).toBeDefined();
  });

  it('Should have specific classes', () => {
    expect(services.accountServices).toBeDefined();
    expect(services.reportServices).toBeDefined();
    expect(services.userServices).toBeDefined();
  });
});
