import { systemConfigTypes } from '../constants';
import { systemConfigServices } from '../../services/';

const getSystemConfig = () => dispatch =>
  dispatch({
    type: systemConfigTypes.GET_SYSTEM_CONFIG,
    payload: systemConfigServices.getSystemConfig()
  });

export { getSystemConfig as default, getSystemConfig };
