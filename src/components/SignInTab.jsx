import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

/*const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});   */

const SignInTab = () => {
  return (
   <Pressable>
    <Link to="/signIn">
      <Text fontWeight="bold" fontSize="subheading" style={{color: 'white'}}>Sign in</Text>
    </Link>
   </Pressable> 
  );
};

export default SignInTab;