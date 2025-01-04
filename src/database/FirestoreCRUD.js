import firestore from '@react-native-firebase/firestore';

export const addUserData = async (userData) => {
    try {
        await firestore().collection('users').add(userData);
        console.log('User added successfully!');
    } catch (error) {
        console.error('Error adding user: ', error);
    }
}
export const getUser = async () => {
    try {
        const userSnapshot = await firestore().collection('users').get();
        const users = userSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        console.log('User fetched successfully!', users);
        return users;
    } catch (error) {
        console.error('Error fetching user data: ', error);
    }
}
export const updateUser = async ( id, updatedData ) => {
    try {
        await firestore().collection('users').doc(id).update(updatedData);
        console.log('User updated successfully!');
    } catch (error) {
        console.error('Error updating user data: ', error);
    }
}
export const deleteUser = async ( id ) => {
    try {
        await firestore().collection('users').doc(id).delete()
        console.log('User Deleted successfully!');
    } catch (error) {
        console.error('Error Deleting user data: ', error);
    }
}