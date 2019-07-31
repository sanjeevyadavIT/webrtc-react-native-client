import { createAppContainer } from 'react-navigation';
import LoginNavigator from './LoginNavigator';

const Navigator = createAppContainer(LoginNavigator);

export default Navigator;