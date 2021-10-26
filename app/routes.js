import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useSelector} from 'react-redux';
import TabBottomIcon from './components/bottomTab/TabBarIcon';
import {darkMode} from './components/darkModeStyles';
import Friend from './components/header/Friend';
import Logo from './components/header/Logo';
import ModeChanger from './components/header/ModeChanger';
import Quit from './components/header/Quit';
import RoomTitle from './components/header/RoomTitle';
import Setting from './components/header/Setting';
import BarScreen from './screens/friend/bar';
import FriendsListScreen from './screens/friend/list';
import DesireScreen from './screens/main/desire';
import MyScreen from './screens/main/my';
import RoomScreen from './screens/main/room';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  const list = useSelector(state => state.friend.list);
  const myId = useSelector(state => state.my.myId);
  const mode = useSelector(state => state.my.mode);
  let unReads = 0;
  list.forEach(v => {
    v.Chats.forEach(c => {
      if (c.isReaded === 0 && c.UserId !== myId) {
        unReads += 1;
      }
    });
  });
  return (
    <Tab.Navigator
      initialRouteName="desire"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => TabBottomIcon(focused, route.name),
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.44,
          shadowRadius: 10.32,
          elevation: 16,
          backgroundColor:
            mode === 'dark'
              ? darkMode.impactBackground.backgroundColor
              : 'white',
        },
      })}>
      <Tab.Screen name="desire" component={DesireScreen} />
      <Tab.Screen
        name="list"
        component={FriendsListScreen}
        options={
          unReads === 0
            ? null
            : {
                tabBarBadge: unReads,
                tabBarBadgeStyle: {
                  fontWeight: 'bold',
                  backgroundColor: '#DD484C',
                  borderWidth: 1,
                  borderColor: '#ffffff',
                  fontSize: 13,
                },
              }
        }
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const AppRoutes = ({appSocket}) => {
  const {myMbti, myGender, myCharacter, myName, mode} = useSelector(
    state => state.my,
  );
  return (
    <Stack.Navigator
      initialRouteName={
        myMbti && myGender && myCharacter && myName ? 'main' : 'my'
      }
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: () => <Logo />,
        headerBackVisible: false,
        headerStyle: {
          backgroundColor:
            mode === 'dark'
              ? darkMode.impactBackground.backgroundColor
              : 'white',
        },
      }}>
      <Stack.Screen
        name="my"
        component={MyScreen}
        options={{headerBackVisible: false}}
      />
      <Stack.Screen
        name="main"
        component={TabRoutes}
        options={{
          headerLeft: () => <Setting />,
          headerRight: () => <ModeChanger />,
        }}
      />
      <Stack.Screen
        name="room"
        component={RoomScreen}
        options={{
          headerLeft: () => <Quit />,
          headerTitle: () => <RoomTitle />,
          headerRight: () => <Friend />,
        }}
      />
      <Stack.Screen
        name="bar"
        options={({route}) => ({
          headerLeft: () => <Quit />,
          title: route.params.info.Users[0].name,
          headerTintColor: mode === 'dark' ? darkMode.font.color : 'black',
        })}>
        {props => <BarScreen {...props} appSocket={appSocket} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppRoutes;
