import { createSwitchNavigator } from 'react-navigation';
import {
    LoginPage
} from '../components';
import DashboardNavigator from './DashboardNavigator';
import {
    NAVIGATION_LOGIN_PATH
} from './types';

const LoginNavigator = createSwitchNavigator({
    [NAVIGATION_LOGIN_PATH]: LoginPage,
    DashboardNavigator,
});

export default LoginNavigator;