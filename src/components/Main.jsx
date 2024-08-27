
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate, useParams } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import SignIn from './SignIn';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';
import SignUp from './SignUp';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />  
        <Route path="/repositories" element={<RepositoryList />} />  
        <Route path="/:id" element={<SingleRepository />} />  
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/createReview" element={<CreateReview />} />
        <Route path="/myReviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;