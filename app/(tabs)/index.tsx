import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { supabase } from '../../lib/supabase.js';
import TaskForm from '@/components/TaskForm';
import TaskItem from '@/components/TaskItem';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  created_at?: string;
};

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const addTask = async () => {
    console.log('addTask fired, task =', JSON.stringify(task));
    if (task.trim() === '') return;

    const { error } = await supabase
      .from('tasks')
      .insert({ title: task, completed: false });

    if (error) {
      console.log(error);
      return;
    }

    setTask('');
    loadTasks();
  };

  const toggleTask = async (item: Task) => {
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !item.completed })
      .eq('id', item.id);

    if (error) {
      console.log(error);
      return;
    }

    loadTasks();
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.log(error);
      return;
    }

    loadTasks();
  };

  return (
    <ThemedView style={styles.container} lightColor="#FFFFFF" darkColor="#FFFFFF">
      {/* Header */}
      <View style={headerStyles.wrapper}>
        <ThemedText style={headerStyles.title} lightColor="#1C1C1E" darkColor="#1C1C1E">
          TaskFlow
        </ThemedText>
      </View>

      {/* Add task row */}
      <TaskForm task={task} setTask={setTask} onAdd={addTask} />

      {/* Dynamic task list */}
      <FlatList
        style={styles.taskListContainer}
        contentContainerStyle={styles.taskList}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem item={item} onToggle={toggleTask} onDelete={deleteTask} />
        )}
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
  taskListContainer: {
    flex: 1,
  },
  taskList: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
});