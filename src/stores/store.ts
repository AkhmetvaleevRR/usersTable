import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User, UserLabel } from '@/types/user';

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);

  //localStorage
  const loadUsers = () => {
    const saved = localStorage.getItem('users');
    if (saved) {
      users.value = JSON.parse(saved);
    }
  };

  const saveUsers = () => {
    users.value.filter((user) => !user.login)
    console.log(users.value)
    localStorage.setItem('users', JSON.stringify(users.value));
  };

  // Users Array functions

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Number(Date.now())
    };
    users.value.push(newUser);
  };

  const updateUser = (id: number, userData: Partial<User>) => {
    const index = users.value.findIndex(user => user.id === id);
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...userData };
      saveUsers();
    }
  };

  const removeUser = (id: number) => {
    users.value = users.value.filter(user => user.id !== id);
    saveUsers();
  };
  
  // save Labels to array

  const parseLabels = (labelString: string): UserLabel[] => {
    if (!labelString.trim()) return [];
    return labelString.split(';')
      .map(label => label.trim())
      .filter(label => label.length > 0)
      .map(label => ({ text: label }));
  };

  const formatLabels = (labels: UserLabel[]): string => {
    return labels.map(label => label.text).join('; ');
  };

  loadUsers();

  return {
    users,
    addUser,
    updateUser,
    removeUser,
    parseLabels,
    formatLabels,
    loadUsers
  };
});