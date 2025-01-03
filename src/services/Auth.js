import auth from '@react-native-firebase/auth';

export const signup = async (email, password) => {
try {
    const userCredentials = await auth().createUserWithEmailAndPassword(email, password);
    await userCredentials.user.sendEmailVerification();
    return userCredentials;
} catch (error) {
    let errorMessage;
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
            errorMessage = 'Something went wrong';
            break;
    }
    throw new Error(errorMessage);
}
}

export const login = async (email, password) => {
    try {
        const userCredentials = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredentials.user;
        return { user, emailVerified: user.emailVerified };
    } catch (error) {
        let errorMessage;
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = 'Invalid email';
                break;
            case 'auth/user-not-found':
                errorMessage = 'User not found';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Wrong password';
                break;
            default:
                errorMessage = 'Something went wrong';
                break;
        }
        throw new Error(errorMessage);
    }
}

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
        throw new Error(errorMessage);
    }
}