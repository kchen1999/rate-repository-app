import { useFormik } from 'formik';
import Text from './Text';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';

const initialValues = {
  username: '',
  password: '',
}

const styles = StyleSheet.create({
  container: {
   backgroundColor: 'white',
   padding: 20,
   flexDirection: 'column',
   gap: 16,
  },
  inputContainer: {
    borderStyle: 'solid',
    color: theme.colors.mainBackground,
    borderWidth: 3,
    borderRadius: 6,
    height: 54,
    paddingLeft: 21,
    fontSize: theme.fontSizes.subheading,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textValid: {
    borderColor: theme.colors.mainBackground,
  }, 
  textInvalid: {
    borderColor: theme.colors.error,
  },
  submitContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    height: 54,
    justifyContent: 'center'
  }, 
  sign: {
    color: 'white',
    textAlign: 'center',
    
  }
})

const validationSchema = yup.object().shape(
  {
    username: yup
      .string()
      .min(2, 'Too short!')
      .required('Username is required'),
    password: yup
      .string()
      .min(2, 'Too short')
      .required('Password is required')
  }
)


const SignInForm = ({ onSubmit }) => {
  const formik  = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, formik.touched.username && formik.errors.username ? styles.textInvalid : styles.textValid] }>
        <TextInput
          placeholder='Username'
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
      </View>
      {formik.touched.username && formik.errors.username && (
        <Text style={{color: theme.colors.error}}>{formik.errors.username}</Text>
      )}
      <View style={[styles.inputContainer, formik.touched.password && formik.errors.password ? styles.textInvalid : styles.textValid] }>
        <TextInput
          placeholder='Password'
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          secureTextEntry={true}
        />
      </View>
      {formik.touched.password && formik.errors.password && (
        <Text style={{color: theme.colors.error}}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.submitContainer}>
        <Text style={styles.sign} fontWeight="bold" fontSize="subheading">Sign in</Text>
      </Pressable>

    </View>
  )
}

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return <SignInForm onSubmit={onSubmit}/>;
};

export default SignIn;