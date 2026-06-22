import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { supabase } from '../../lib/supabase.js';
import AddTaskModal from '@/components/AddTaskModal';
import TaskItem from '@/components/TaskItem';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  created_at?: string;
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // --- Data functions: talk to Supabase, report { error }, nothing else ---

  const loadTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (title: string) => {
    const { error } = await supabase
      .from('tasks')
      .insert({ title, completed: false });

    return { error };
  };

  const toggleTask = async (item: Task) => {
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !item.completed })
      .eq('id', item.id);

    return { error };
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    return { error };
  };

  // --- Handlers: decide what the UI does with that result ---

  const handleSubmitTask = async (title: string) => {
    if (title.trim() === '') return;

    const { error } = await addTask(title);

    if (error) {
      Toast.show({ type: 'error', text1: 'Could not add task', text2: error.message });
      return;
    }

    setModalVisible(false);
    loadTasks();
    Toast.show({ type: 'success', text1: 'Task added' });
  };

  const handleToggleTask = async (item: Task) => {
    const { error } = await toggleTask(item);

    if (error) {
      Toast.show({ type: 'error', text1: 'Could not update task', text2: error.message });
      return;
    }

    loadTasks();
  };

  const handleDeleteTask = async (id: string) => {
    const { error } = await deleteTask(id);

    if (error) {
      Toast.show({ type: 'error', text1: 'Could not delete task', text2: error.message });
      return;
    }

    loadTasks();
    Toast.show({ type: 'success', text1: 'Task deleted' });
  };

  return (
    <ThemedView style={styles.container} lightColor="#FFFFFF" darkColor="#FFFFFF">
      {/* Header */}
      <View style={headerStyles.wrapper}>
        <ThemedText style={headerStyles.title} lightColor="#1C1C1E" darkColor="#1C1C1E">
          TaskFlow
        </ThemedText>
      </View>

      {/* Add Task button */}
      <TouchableOpacity style={styles.addTaskButton} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="add" size={20} color="#FFFFFF" />
        <ThemedText style={styles.addTaskButtonText} lightColor="#FFFFFF" darkColor="#FFFFFF">
          Add Task
        </ThemedText>
      </TouchableOpacity>

      {/* Dynamic task list */}
      <FlatList
        style={styles.taskListContainer}
        contentContainerStyle={styles.taskList}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem item={item} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
        )}
      />

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmitTask}
      />
    </ThemedView>
  );
}

const headerStyles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A6CF7',
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: 8,
    gap: 8,
  },
  addTaskButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  taskListContainer: {
    flex: 1,
  },
  taskList: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
});