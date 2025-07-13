import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTask } from '../../database/FirestoreCRUD';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');

    // new piece of state for the date picker:
    const [dueDate, setDueDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const navigation = useNavigation();

    const handleSubmit = async () => {
        const currentUser = auth().currentUser;
        if (!currentUser) {
            Alert.alert('Error', 'You must be logged in to add tasks.');
            return;
        }

        if (!title.trim() || !description.trim()) {
            Alert.alert('Validation', 'Title and description are required.');
            return;
        }

        const uid = currentUser.uid;
        const taskData = {
            title,
            description,
            dueDate,       // <- use the selected date
            priority,
            completed: false,
        };

        try {
            await addTask(uid, taskData);
            Alert.alert('Submitted!', `Task scheduled for ${dueDate.toDateString()}`);
            // navigation.goBack(); 
        } catch (error) {
            console.error('Submit error:', error.message);
            Alert.alert('Error', 'Something went wrong while adding the task.');
        }
    };

    const onChangeDate = (event, selectedDate) => {
        setShowPicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDueDate(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholder="Enter title"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                placeholder="Enter description"
            />

            <Text style={styles.label}>Due Date</Text>
            <TouchableOpacity
                style={styles.dateBox}
                onPress={() => setShowPicker(true)}
            >
                <Text>{dueDate.toDateString()}</Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={dueDate}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}

            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityRow}>
                {['Low', 'Medium', 'High'].map(level => (
                    <TouchableOpacity
                        key={level}
                        onPress={() => setPriority(level)}
                        style={[
                            styles.priorityBtn,
                            priority === level && styles.prioritySelected,
                        ]}
                    >
                        <Text>{level}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitText}>Add Task</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TaskForm;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
    },
    dateBox: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10,
        padding: 12,
        marginTop: 5,
    },
    priorityRow: {
        flexDirection: 'row',
        marginTop: 10,
    },
    priorityBtn: {
        borderWidth: 1,
        borderColor: '#aaa',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 10,
    },
    prioritySelected: {
        backgroundColor: '#D6D6FF',
    },
    submitBtn: {
        backgroundColor: '#5D5FEF',
        padding: 15,
        marginTop: 30,
        borderRadius: 12,
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
