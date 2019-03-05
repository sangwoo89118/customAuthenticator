import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from '../screens/Home';
import Friends from '../screens/Friends';
import Authentication from '../screens/Authentication';

const AppNavigator = createStackNavigator({
    Authentication: {
        screen: Authentication
    },
    Home: {
        screen: Home
    },
    Friends: {
        screen: Friends
    },
});

export default createAppContainer(AppNavigator);