const generateId = prefix => `${prefix || 'generatedid'}-${Math.ceil(1e5 * Math.random())}`;

const noop = Function.prototype;

const setStateProp = (prop, data, options) => {
  const { state = {}, initialState = {}, reset = true } = options;
  let obj = { ...state };

  if (prop && !state[prop]) {
    console.error(`Error: Property ${prop} does not exist within the passed state.`, state);
  }

  if (reset && prop && !initialState[prop]) {
    console.warn(`Warning: Property ${prop} does not exist within the passed initialState.`, initialState);
  }

  if (reset && prop) {
    obj[prop] = {
      ...state[prop],
      ...initialState[prop],
      ...data
    };
  } else if (reset && !prop) {
    obj = {
      ...state,
      ...initialState,
      ...data
    };
  } else if (prop) {
    obj[prop] = {
      ...state[prop],
      ...data
    };
  } else {
    obj = {
      ...state,
      ...data
    };
  }

  return obj;
};

const prettyPrintJson = json => JSON.stringify(json, null, 2);

const DEV_MODE = process.env.REACT_APP_ENV === 'development';

const OC_MODE = process.env.REACT_APP_ENV === 'oc';

const FULFILLED_ACTION = base => `${base}_FULFILLED`;

const PENDING_ACTION = base => `${base}_PENDING`;

const REJECTED_ACTION = base => `${base}_REJECTED`;

const helpers = {
  generateId,
  noop,
  setStateProp,
  prettyPrintJson,
  DEV_MODE,
  OC_MODE,
  FULFILLED_ACTION,
  PENDING_ACTION,
  REJECTED_ACTION
};

export { helpers as default, helpers };
