const rhelOptionsType = [
  { title: 'Core Hours', value: 'rhelVcpuTime' },
  { title: 'GB Memory Hours', value: 'rhelMemoryTime' },
  { title: 'Instance Hours', value: 'rhelRuntimeTime', active: true }
];

const rhocpOptionsType = [
  { title: 'Core Hours', value: 'openshiftVcpuTime', active: true },
  { title: 'GB Memory Hours', value: 'openshiftMemoryTime' },
  { title: 'Instance Hours', value: 'openshiftRuntimeTime' }
];

const accountGraphCardTypes = {
  rhelOptions: rhelOptionsType,
  rhocpOptions: rhocpOptionsType
};

export { accountGraphCardTypes as default, accountGraphCardTypes, rhelOptionsType, rhocpOptionsType };
