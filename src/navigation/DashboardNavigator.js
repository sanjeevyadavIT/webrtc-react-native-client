import { createStackNavigator } from 'react-navigation';
import {
    DashboardPage,
    VideoChatPage,
} from '../components';
import {
    NAVIGATION_DASHBOARD_PATH,
    NAVIGATION_VIDEOCHAT_PATH,
} from './types';

const DashboardNavigator = createStackNavigator({
    [NAVIGATION_DASHBOARD_PATH]: DashboardPage,
    [NAVIGATION_VIDEOCHAT_PATH]: VideoChatPage,
});

export default DashboardNavigator;