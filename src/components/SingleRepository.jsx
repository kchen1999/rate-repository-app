import { StyleSheet, Pressable, View, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import useGetRepository from '../hooks/useGetRepository';
import AuthorProfile from './AuthorProfile';
import CountBar from './CountBar';
import theme from '../theme';
import Text from './Text';
import * as Linking from 'expo-linking';
import format from 'date-fns/format'


const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 18, 
    paddingLeft: 21,
    paddingRight: 21,
    paddingBottom: 21,
    gap: 21,
    marginBottom: 12, 
  },
  githubButton: {
    backgroundColor: theme.colors.primary, 
    paddingTop: 21,
    paddingBottom: 21,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 6,
    color: 'white'
  },
  separator: {
    height: 12,
  },
  description: {
    width: 270
  },
  container: {
    flexDirection: 'row',
    gap: 21,
    backgroundColor: 'white',
    paddingTop: 18, 
    paddingLeft: 21,
    paddingRight: 21,
    paddingBottom: 21,
  },
  ratingContainer: {
    borderRadius: 32,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    borderWidth: 3,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewContent: {
    flexDirection: 'column',
    gap: 12,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.flexContainer}>
      <AuthorProfile avatarUrl={repository.ownerAvatarUrl} description={repository.description} 
      fullName={repository.fullName} language={repository.language}/>
      <CountBar style={styles.countBar} stars={repository.stargazersCount} forks={repository.forksCount}
      reviews={repository.reviewCount} rating={repository.ratingAverage}/>
      <Pressable style={styles.githubButton} onPress={() => Linking.openURL(repository.url)}>
        <Text fontWeight="bold" fontSize="subheading" style={{color: 'white'}}>Open in Github</Text>
      </Pressable>
    </View>
  )
}

export const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={{color: theme.colors.primary, fontSize: 19}}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
        <Text color="textSecondary">{format(new Date (review.createdAt.substring(0, 10)), "dd-MM-yyyy")}</Text>
        <Text style={styles.description}>{review.text}</Text>
      </View>
    </View>
  )
}

const SingleRepository = () => {
  const id = useParams().id;
  const {repository, fetchMore, loading} = useGetRepository({first: 3, id});

  const onEndReach = () => {
    fetchMore()
  }

  if(!loading && repository) {
    return (
    <FlatList 
      data={repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      ListHeaderComponent={() => <RepositoryInfo repository={repository}/>}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
    );
  } 


  
};

export default SingleRepository;