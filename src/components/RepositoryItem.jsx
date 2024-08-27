import { StyleSheet, Pressable, View } from 'react-native';
import { useNavigate } from 'react-router-native';
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
  const navigate = useNavigate();
  return (
  <View>
    <Pressable style={styles.flexContainer} testID='repositoryItem' onPress={() => { 
      navigate(`/${item.id}`)
      }}>
      <AuthorProfile avatarUrl={item.ownerAvatarUrl} description={item.description} 
      fullName={item.fullName} language={item.language}/>
      <CountBar stars={item.stargazersCount} forks={item.forksCount}
      reviews={item.reviewCount} rating={item.ratingAverage}/>
    </Pressable> 
  </View>
  );
};

export default RepositoryItem;