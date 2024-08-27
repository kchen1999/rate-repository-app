import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

/*const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});   */

const CreateReviewTab = () => {
  return (
   <Pressable onPress>
    <Link to="/createReview">
      <Text fontWeight="bold" fontSize="subheading" style={{color: 'white'}}>Create a review</Text>
    </Link>
   </Pressable> 
  );
};

export default CreateReviewTab;