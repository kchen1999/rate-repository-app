import { useFormik } from 'formik';
import Text from './Text';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import { useCreateReview } from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
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
    ownerName: yup
      .string()
      .min(2, 'Too short!')
      .required('Repository owner name is required'),
    repositoryName: yup
      .string()
      .min(2, 'Too short')
      .required('Repository name is required'),
    rating: yup 
      .number()
      .min(0, 'Minimum rating is 0')
      .max(100, 'Maximum rating is 100')
      .required('Rating is required'),
    text: yup 
      .string()
      .max(2000, 'Too long!')
  }
)


const ReviewForm = ({ onSubmit }) => {
  const formik  = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, formik.touched.ownerName && formik.errors.ownerName ? styles.textInvalid : styles.textValid] }>
        <TextInput
          placeholder='Repository owner name'
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
          style={{color: theme.colors.textPlaceHolder}}
        />
      </View>
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{color: theme.colors.error}}>{formik.errors.ownerName}</Text>
      )}
      <View style={[styles.inputContainer, formik.touched.repositoryName && formik.errors.repositoryName ? styles.textInvalid : styles.textValid] }>
        <TextInput
          placeholder='Repository name'
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
          style={{color: theme.colors.textPlaceHolder}}
        />
      </View>
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{color: theme.colors.error}}>{formik.errors.repositoryName}</Text>
      )}
      <View style={[styles.inputContainer, formik.touched.rating && formik.errors.rating ? styles.textInvalid : styles.textValid] }>
        <TextInput
          placeholder='Rating between 0 and 100'
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
          style={{color: theme.colors.textPlaceHolder}}
        />
      </View>
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{color: theme.colors.error}}>{formik.errors.rating}</Text>
      )}
      <View style={[styles.inputContainer, formik.touched.text && formik.errors.text ? styles.textInvalid : styles.textValid] }>
        <TextInput
          placeholder='Review'
          value={formik.values.text}
          onChangeText={formik.handleChange('text')}
          multiline={true}
          style={{color: theme.colors.textPlaceHolder}}
        />
      </View>
      {formik.touched.text && formik.errors.text && (
        <Text style={{color: theme.colors.error}}>{formik.errors.text}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.submitContainer}>
        <Text style={styles.sign} fontWeight="bold" fontSize="subheading">Create a review</Text>
      </Pressable>

    </View>
  )
}

export const ReviewContainer = ({ onSubmit }) => {
  return <ReviewForm onSubmit={onSubmit}/>;
}

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const {repositoryName, ownerName, rating, text} = values;
    const parsedRating = parseInt(rating)  

    try {
      const { data } = await createReview({repositoryName, ownerName, rating: parsedRating, text});
      navigate(`/${data.createReview.repositoryId}`)

    } catch (e) {
      console.log(e)
    };
  };

  return <ReviewContainer onSubmit={onSubmit}/>
};

export default CreateReview;