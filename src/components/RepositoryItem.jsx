import { View, StyleSheet } from 'react-native';
import Text from './Text';
import AuthorProfile from './AuthorProfile';
import CountBar from './CountBar';

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 18, 
    paddingLeft: 21,
    paddingRight: 21,
    paddingBottom: 21
  }
})

const RepositoryItem = ({item}) => {
  return (
  <View style={styles.flexContainer}>
    <AuthorProfile avatarUrl={item.ownerAvatarUrl} description={item.description} 
    fullName={item.fullName} language={item.language}/>
    <CountBar stars={item.stargazersCount} forks={item.forksCount}
    reviews={item.reviewCount} rating={item.ratingAverage}/>
  </View>
  );
};

export default RepositoryItem;