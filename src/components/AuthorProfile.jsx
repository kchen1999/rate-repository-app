import { Image, View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    gap: 18,
    flexDirection: 'row',
  },
  profile: {
    paddingTop: 3,
    gap: 9.6,
    alignItems: 'flex-start'
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 6
  },
  description: {
    width: 320
  },
  languageTag: {
    backgroundColor: theme.colors.primary, 
    padding: 6,
    borderRadius: 6,
  }
})

const AuthorProfile = ({avatarUrl, description, fullName, language}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: avatarUrl}} style={styles.avatar}/>
      <View style={styles.profile}>
        <Text fontWeight="bold" fontSize="subheading">{fullName}</Text>
        <Text color="textSecondary" style={styles.description}>{description}</Text>
        <View style={styles.languageTag}>
          <Text style={{color: 'white'}}>{language}</Text>
        </View>
      </View>
    </View>
  )
}

export default AuthorProfile;