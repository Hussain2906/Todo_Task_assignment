import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Ensure Firestore is imported
import { Alert } from 'react-native';

// Function to handle user signup
export const signup = async (email, password, userData={}) => {
  try {
    console.log('Received userData:', userData); // Debugging step to see the userData

    // Create the user with email and password
    const userCredentials = await auth().createUserWithEmailAndPassword(email, password);
    
    // Send email verification link to the user
    await userCredentials.user.sendEmailVerification();
  
    // Store user data in Firestore
    const { uid } = userCredentials.user;
  
    // Enhanced validation for userData
    if (typeof userData === 'object') {
      await firestore().collection('users').doc(uid).set({
        email,
        ...userData, // Spread additional user data like name, phone, etc.
        createdAt: firestore.FieldValue.serverTimestamp(),
        emailVerified: false,
      });

      console.log('User data stored in Firestore successfully');
    } else {
      console.error('Invalid userData:', userData); // Log invalid userData for debugging
      throw new Error('User data is invalid or missing');
    }

    return userCredentials;
  } catch (error) {
    console.error('Error during signup:', error); // Log error for debugging
    
    let errorMessage;

    // Handle Firebase authentication error codes
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email';
          break;
        case 'auth/weak-password':
          errorMessage = 'Weak password';
          break;
        default:
          errorMessage = 'Authentication error occurred';
          break;
      }
    } else {
      // Handle general errors (non-Firebase errors)
      errorMessage = error.message || 'Something went wrong';
    }

    // Show error message
    Alert.alert('Signup Error', errorMessage);
    throw new Error(errorMessage);
  }
};

// Function to handle user login
export const login = async (email, password) => {
  try {
    const userCredentials = await auth().signInWithEmailAndPassword(email, password);
    const user = userCredentials.user;
    return { user, emailVerified: user.emailVerified };
  } catch (error) {
    let errorMessage;
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'User not found.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password.';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Invalid credentials. Try again.';
        break;
      default:
        errorMessage = error.message;
        console.log('Unhandled Firebase Auth error:', error);
        break;
    }

    Alert.alert('Login Error', errorMessage);
    throw new Error(errorMessage);
  }
};

// Function to handle password reset
export const sendPasswordResetEmail = async email => {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (error) {
    let errorMessage;
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email';
        break;
      case 'auth/user-not-found':
        errorMessage = 'User not found';
        break;
      default:
        errorMessage = 'Something went wrong';
        break;
    }
    // Show error message
    Alert.alert('Password Reset Error', errorMessage);
    throw new Error(errorMessage);
  }
};
