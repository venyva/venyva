import { Navigation } from 'react-native-navigation';
import { pushWelcomeScreen } from 'AppNavigator';

Navigation.events().registerAppLaunchedListener(() => pushWelcomeScreen());
