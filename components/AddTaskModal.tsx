import React, { useState } from 'react';
import { Modal, Pressable, View, TextInput, Text, StyleSheet } from 'react-native';

type AddTaskModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
};

export default function AddTaskModal({ visible, onClose, onSubmit }: AddTaskModalProps) {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    onSubmit(title);
    setTitle('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.title}>New Task</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Task"
            placeholderTextColor="#9AA0A6"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />

          <View style={styles.buttonRow}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addText}>Add</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  input: {
    height: 48,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1C1C1E',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#4A6CF7',
  },
  addText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});