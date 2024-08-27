import { StyleSheet, FlatList, View, Pressable, Alert } from 'react-native';
import { useQuery } from "@apollo/client";
import { GET_USER } from "../queries";
import Text from './Text';
import theme from '../theme';
import format from 'date-fns/format';
import { useNavigate } from 'react-router-native';
import { useDeleteReview } from '../hooks/useDeleteReview';

const MyReviews = () => {
  const {data, loading} = useQuery(GET_USER, {
    variables:  {includeReviews: true},
  }) 

  const styles = StyleSheet.create({
    flexContainer: {
      flexDirection: 'column'
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
    },
    reviewButtons: {
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
      gap: 11,
    },
    sign: {
      color: 'white',
      textAlign: 'center', 
    },
    viewRepoButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 25,
      paddingRight: 25,
      height: 54,
      justifyContent: 'center',
    }, 
    deleteRepoButton: {
      borderRadius: 5,
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 25,
      paddingRight: 25,
      height: 54,
      justifyContent: 'center',
      backgroundColor: theme.colors.deleteReview,
    },
  });

  const ItemSeparator = () => <View style={styles.separator} />;

  const ReviewItem = ({ review }) => {
    const navigate = useNavigate();
    const [deleteReview] = useDeleteReview();
    const reviewIdSplit = review.id.split('.')
    const repoId = reviewIdSplit.slice(1).join('.')
    
    return (
      <View style={styles.flexContainer}>
        <View style={styles.container}>
          <View style={styles.ratingContainer}>
            <Text style={{color: theme.colors.primary, fontSize: 19}}>{review.rating}</Text>
          </View>
          <View style={styles.reviewContent}>
            <Text fontWeight="bold" fontSize="subheading">{repoId}</Text>
            <Text color="textSecondary">{format(new Date (review.createdAt.substring(0, 10)), "dd-MM-yyyy")}</Text>
            <Text style={styles.description}>{review.text}</Text>
          </View>
        </View>
        <View style={styles.reviewButtons}>
          <Pressable style={styles.viewRepoButton} onPress={() => navigate(`/${repoId}`)}>
            <Text style={styles.sign} fontWeight="bold" fontSize="subheading">View Repository</Text>
          </Pressable>
          <Pressable style={styles.deleteRepoButton} onPress={
            () => {
              Alert.alert(
                'Delete review',
                'Are you sure you want to delete this review?', 
                [
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  },
                  {
                    text: 'Delete',
                    onPress: async () => {
                      console.log('will delete')
                      await deleteReview({id: review.id})
                    },
                    style: 'cancel'
                  },

                ]
              )
            }
          }>
            <Text style={styles.sign} fontWeight="bold" fontSize="subheading">Delete review</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  if(!loading && data.me) {
    return (
    <FlatList 
      data={data.me.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      ItemSeparatorComponent={ItemSeparator}
    />
    );
  } 
  
};

export default MyReviews;