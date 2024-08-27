import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

/*const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});   */

const SignUpTab = () => {
  return (
   <Pressable onPress>
    <Link to="/signUp">
      <Text fontWeight="bold" fontSize="subheading" style={{color: 'white'}}>Sign up</Text>
    </Link>
   </Pressable> 
  );
};

export default SignUpTab;