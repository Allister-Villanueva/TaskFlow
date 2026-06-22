import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  created_at?: string;
};

type TaskItemProps = {
  item: Task;
  onToggle: (item: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ item, onToggle, onDelete }: TaskItemProps) {
  return (
    <TouchableOpacity
      style={styles.taskRow}
      onPress={() => onToggle(item)}
      onLongPress={() => onDelete(item.id)}
    >
      <MaterialIcons
        name={item.completed ? 'check-box' : 'check-box-outline-blank'}
        size={22}
        color="#4A4A4A"
        style={styles.checkboxIcon}
      />
      <ThemedText style={styles.taskText} lightColor="#1C1C1E" darkColor="#1C1C1E">
        {item.title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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