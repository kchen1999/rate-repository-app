import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

import AppBarTab from './AppBarTab';
import SignInTab from './SignInTab';


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 28,
    backgroundColor: theme.backgroundColors.appBar,
  },
 
});

const AppBar = () => {
  return (
  <View style={styles.container}>
   <ScrollView horizontal contentContainerStyle={{flexGrow: 1, gap: 18}}>
      <AppBarTab />
      <SignInTab />
   </ScrollView>
  </View> );
};

export default AppBar;