// src/Views/HomeTabs/TaskList.js

import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    SectionList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import { getTasks, deleteTask, updateTask } from '../../database/FirestoreCRUD'; 
// Helpers (unchanged)
const isToday = (date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

const isTomorrow = (date) => {
    const tom = new Date();
    tom.setDate(tom.getDate() + 1);
    return (
        date.getDate() === tom.getDate() &&
        date.getMonth() === tom.getMonth() &&
        date.getFullYear() === tom.getFullYear()
    );
};

const groupTasks = (tasks = []) => {
    const today = tasks.filter((t) => isToday(t.dueDate));
    const tomorrow = tasks.filter((t) => isTomorrow(t.dueDate));
    const week = tasks.filter(
        (t) =>
            !isToday(t.dueDate) &&
            !isTomorrow(t.dueDate) &&
            t.dueDate.getTime() < new Date().getTime() + 7 * 86400000
    );
    return [
        { title: 'Today', data: today },
        { title: 'Tomorrow', data: tomorrow },
        { title: 'This Week', data: week },
    ];
};

const getPriorityStyle = (priority) => {
    switch (priority) {
        case 'High':
            return { backgroundColor: '#FF6B6B' };
        case 'Medium':
            return { backgroundColor: '#FFD166' };
        case 'Low':
            return { backgroundColor: '#6BCB77' };
        default:
            return {};
    }
};

const TaskCard = ({ task, onDelete, onToggle }) => (
    <View style={styles.taskCard}>
        <View style={{ flex: 1 }}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskDesc}>{task.description}</Text>
            <Text style={styles.taskDate}>
                Due: {task.dueDate.toLocaleDateString()}
            </Text>
        </View>
        <View style={styles.right}>
            <View style={[styles.priority, getPriorityStyle(task.priority)]}>
                <Text style={styles.priorityText}>{task.priority}</Text>
            </View>
            <TouchableOpacity onPress={() => onToggle(task.id, !task.completed)}>
                <Icon
                    name={task.completed ? 'check' : 'circle'}
                    size={24}
                    color={task.completed ? '#4CAF50' : 'gray'}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(task.id)} style={{ marginLeft: 12 }}>
                <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
        </View>
    </View>
);

const TaskList = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch tasks for given uid
    const fetchTasks = useCallback(async (uid) => {
        try {
            const data = await getTasks(uid);
            setTasks(data);
        } catch (err) {
            console.error('Fetch error:', err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // onAuthStateChanged
    useEffect(() => {
        const unsub = auth().onAuthStateChanged((user) => {
            if (user) {
                fetchTasks(user.uid);
            } else {
                navigation.replace('Login');
                setLoading(false);
            }
        });
        return unsub;
    }, [fetchTasks, navigation]);

    const handleDelete = async (taskId) => {
        const uid = auth().currentUser.uid;
        await deleteTask(uid, taskId);
        fetchTasks(uid);
    };

    const handleToggle = async (taskId, newStatus) => {
        const uid = auth().currentUser.uid;
        await updateTask(uid, taskId, { completed: newStatus });
        fetchTasks(uid);
    };

    // Pull-to-refresh handler
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const user = auth().currentUser;
        if (user) await fetchTasks(user.uid);
        setRefreshing(false);
    }, [fetchTasks]);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const sections = groupTasks(tasks);

    return (
        <View style={{ flex: 1 }}>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskCard task={item} onDelete={handleDelete} onToggle={handleToggle} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.section}>{title}</Text>
                )}
                ListEmptyComponent={<Text style={styles.empty}>No tasks found</Text>}
                contentContainerStyle={styles.content}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
};

export default TaskList;

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        padding: 16,
        paddingBottom: 80,
    },
    section: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
    taskCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        flexDirection: 'row',
        elevation: 2,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
    },
    taskDesc: {
        fontSize: 13,
        color: '#444',
        marginTop: 2,
    },
    taskDate: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginLeft: 10,
    },
    priority: {
        borderRadius: 10,
        paddingHorizontal: 13,
        paddingVertical: 4,
        margin: 10,
    },
    priorityText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    empty: {
        textAlign: 'center',
        marginTop: 50,
        color: 'gray',
        fontSize: 14,
    },
});
