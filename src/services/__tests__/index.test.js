import cookies from 'js-cookie';
import * as services from '../';

describe('Services', () => {
  it('should export a default services config', () => {
    expect(services.serviceConfig).toBeDefined();

    cookies.set(process.env.REACT_APP_AUTH_TOKEN, 'spoof');

    const configObject = services.serviceConfig(
      {
        method: 'post',
        timeout: 3
      },
      true
    );

    expect(configObject.method).toEqual('post');
    expect(configObject.timeout).toEqual(3);
    expect(configObject.headers[process.env.REACT_APP_AUTH_HEADER]).toContain('spoof');
  });

  it('should export a default services config without authorization', () => {
    const configObject = services.serviceConfig({}, false);

    expect(configObject.headers[process.env.REACT_APP_AUTH_HEADER]).toBeUndefined();
  });

  it('should have specific classes', () => {
    expect(services.accountServices).toBeDefined();
    expect(services.reportServices).toBeDefined();
    expect(services.userServices).toBeDefined();
  });
});
