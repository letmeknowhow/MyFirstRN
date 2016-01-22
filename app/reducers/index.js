/**
 * Created by gaoletian on 15/11/25.
 */
import { reducer as router } from '../libs/react-native-router-redux/index';
import auth from './auth/authReducer';
import wealthMessage from './wealthMessage/wealthMessageReducer';

export {
  router,
  auth,
  wealthMessage
};
