import { Image, View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 28,
    paddingRight: 28, 
    paddingTop: 9.6
  },
  count: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6.4
  }
})

const CountBar = ({stars, forks, reviews, rating}) => {
  const starCount = Math.round(stars/100)/10;
  const forkCount = Math.round(forks/100)/10;
  return (
    <View style={styles.container}>
      <View style={styles.count}>
        <Text fontWeight="bold">{starCount}k</Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.count}>  
        <Text fontWeight="bold">{forkCount}k</Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.count}>
        <Text fontWeight="bold">{reviews}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.count}>
        <Text fontWeight="bold">{rating}</Text>
        <Text>Rating</Text>
      </View>
      

    </View>
  )
}

export default CountBar