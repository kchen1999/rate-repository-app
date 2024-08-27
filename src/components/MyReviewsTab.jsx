import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

/*const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});   */

const MyReviewsTab = () => {
  return (
   <Pressable onPress>
    <Link to="/myReviews">
      <Text fontWeight="bold" fontSize="subheading" style={{color: 'white'}}>My reviews</Text>
    </Link>
   </Pressable> 
  );
};

export default MyReviewsTab;