import firestore from '@react-native-firebase/firestore';

// Pass UID of current user
export const addTask = async (uid, taskData) => {
  try {
    await firestore()
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .add(taskData);
    console.log('Task added successfully!');
  } catch (error) {
    console.error('Error adding task: ', error);
  }
};

export const getTasks = async (uid) => {
  try {
    const snapshot = await firestore()
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .orderBy('dueDate', 'asc') // Sort by due date
      .get();

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      dueDate: doc.data().dueDate.toDate(), // convert Firestore timestamp to JS Date
    }));

    return tasks;
  } catch (error) {
    console.error('Error fetching tasks: ', error);
    return [];
  }
};

export const updateTask = async (uid, taskId, updatedData) => {
  try {
    await firestore()
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .update(updatedData);
    console.log('Task updated successfully!');
  } catch (error) {
    console.error('Error updating task: ', error);
  }
};

export const deleteTask = async (uid, taskId) => {
  try {
    await firestore()
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(taskId)
      .delete();
    console.log('Task deleted successfully!');
  } catch (error) {
    console.error('Error deleting task: ', error);
  }
};
