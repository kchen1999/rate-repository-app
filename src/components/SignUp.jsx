import { useFormik } from 'formik';
import Text from './Text';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import { useSignIn } from '../hooks/useSignIn';
import { useSignUp } from '../hooks/useSignUp';
import { useNavigate } from 'react-router-native';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
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
      .min(5, 'Too short!')
      .max(30, 'Too long!')
      .required('Username is required'),
    password: yup
      .string()
      .min(5, 'Too short!')
      .max(50, 'Too long!')
      .required('Password is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), 'Passwords do not match'])
      .required('Password confirmation is required')
  }
)


const SignUpForm = ({ onSubmit }) => {
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
          style={{color: theme.colors.textPlaceHolder}}
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
          style={{color: theme.colors.textPlaceHolder}}
        />
      </View>
      {formik.touched.password && formik.errors.password && (
        <Text style={{color: theme.colors.error}}>{formik.errors.password}</Text>
      )}
       <View style={[styles.inputContainer, formik.touched.passwordConfirm && formik.errors.passwordConfirm ? styles.textInvalid : styles.textValid] }>
        <TextInput
          placeholder='Password confirmation'
          value={formik.values.passwordConfirm}
          onChangeText={formik.handleChange('passwordConfirm')}
          secureTextEntry={true}
          style={{color: theme.colors.textPlaceHolder}}
        />
      </View>
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={{color: theme.colors.error}}>{formik.errors.passwordConfirm}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.submitContainer}>
        <Text style={styles.sign} fontWeight="bold" fontSize="subheading">Sign up</Text>
      </Pressable>

    </View>
  )
}

export const SignUpContainer = ({ onSubmit }) => {
  return <SignUpForm onSubmit={onSubmit}/>;
}

const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);
    const {username, password} = values;

    try {
      await signUp({username, password})
      const { data } = await signIn({username, password});
      console.log(data);
      navigate("/")

    } catch (e) {
      console.log(e)
    };
  };

  return <SignUpContainer onSubmit={onSubmit}/>
};

export default SignUp;