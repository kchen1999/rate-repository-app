import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../queries';

import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from "@apollo/client";

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
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [loggedIn, setLoggedIn] = useState(false)
  const {data} = useQuery(GET_USER)
  useEffect(() => {
    if(data && data.me) {
      setLoggedIn(true)
    }
    else {
      setLoggedIn(false)
    }
  }, [data])

  return (
  <View style={styles.container}>
   <ScrollView horizontal contentContainerStyle={{flexGrow: 1, gap: 18}}>
      <AppBarTab />
      {loggedIn ? <Pressable onPress={() => {
        authStorage.removeAccessToken();
        apolloClient.resetStore();
        }}>
          <Text fontWeight="bold" fontSize="subheading" style={{color: 'white'}}>Sign out</Text>
        </Pressable> : <SignInTab/>}
   </ScrollView>
  </View> );
};

export default AppBar;