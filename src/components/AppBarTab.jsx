import { StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';
 
const AppBarTab = () => {
  return (
   <Pressable>
    <Link to="/">
      <Text fontWeight="bold" fontSize="subheading" style={{color: 'white'}}>Repositories</Text>
    </Link>
   </Pressable> 
   
  );
};

export default AppBarTab;