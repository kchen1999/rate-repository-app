import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../queries';

import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from "@apollo/client";
import { useNavigate } from 'react-router-native';

import AppBarTab from './AppBarTab';
import SignInTab from './SignInTab';
import CreateReviewTab from './CreateReviewTab';
import SignUpTab from './SignUpTab';
import MyReviewsTab from './MyReviewsTab';


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
  const navigate = useNavigate();
  useEffect(() => {
    if(data && data.me) {
      setLoggedIn(true)
    }
    else {
      setLoggedIn(false)
      navigate("/")
    }
  }, [data])

  return (
  <View style={styles.container}>
   <ScrollView horizontal contentContainerStyle={{flexGrow: 1, gap: 18}}>
      <AppBarTab />
      {loggedIn ? 
      <View style={{flexDirection: 'row', gap: 18}}> 
        <CreateReviewTab/>
        <MyReviewsTab/>
        <Pressable onPress={() => {
          authStorage.removeAccessToken();
          apolloClient.resetStore();
          }}>
          <Text fontWeight="bold" fontSize="subheading" style={{color: 'white'}}>Sign out</Text>
        </Pressable> 
      </View>
    :  <View style={{flexDirection: 'row', gap: 18}}> 
         <SignInTab/>
         <SignUpTab/>
        </View>
    }
   </ScrollView>
  </View> );
};

export default AppBar;