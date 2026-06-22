import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Study React Native', completed: false },
    { id: '2', title: 'Finish Assignment', completed: false },
  ]);

  const handleAddTask = () => {
    if (task.trim() === '') return;

    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), title: task, completed: false },
    ]);
    setTask('');
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
      <View style={styles.addRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          placeholderTextColor="#9AA0A6"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <MaterialIcons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Dynamic task list */}
      <View style={styles.taskList}>
        {tasks.map((item) => (
          <View key={item.id} style={styles.taskRow}>
            <MaterialIcons
              name="check-box-outline-blank"
              size={22}
              color="#4A4A4A"
              style={styles.checkboxIcon}
            />
            <ThemedText style={styles.taskText} lightColor="#1C1C1E" darkColor="#1C1C1E">
              {item.title}
            </ThemedText>
          </View>
        ))}
      </View>
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
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1C1C1E',
    marginRight: 12,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#4A6CF7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4A6CF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  taskList: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9FB',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  checkboxIcon: {
    marginRight: 12,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
  },
});