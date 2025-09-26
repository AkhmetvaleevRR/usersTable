<template>
  <div class="user-table-container">
    <h1>Управление учетными записями</h1>
    
    <el-text class="help-text" type="info">
      <el-icon><QuestionFilled /></el-icon>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </el-text>

    <el-table
      :data="tableData"
      style="width: 100%"
      empty-text="Нет пользователей"
      cell-class-name="table-cell"
    >
      <UserRow />
      
    </el-table>

    <div class="actions">
      <el-button
        type="primary"
        icon="Plus"
        @click="addNewRow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUsersStore } from '@/stores/store';
import UserRow from './UserRow.vue';

const usersStore = useUsersStore();

const tableData = computed(() => {
  return usersStore.users.map(user => ({
    ...user,
    label: usersStore.formatLabels(user.label),
    errors: { login: false, password: false }
  }));
});

const addNewRow = () => {
  usersStore.addUser({
    label: [],
    type: 'Локальная',
    login: null,
    password: null
  });
};

</script>

<style scoped>
.user-table-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #303133;
  margin-bottom: 20px;
  text-align: center;
}

.help-text {
  background-color: #f4f4f5;
  line-height: 30px;
  border-radius: 4px;
  color: #606266;
  font-size: 14px;
}

.actions {
  text-align: center;
  padding: 20px 0;
}

.error-text {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 4px;
}
</style>