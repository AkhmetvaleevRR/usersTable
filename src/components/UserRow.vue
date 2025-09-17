<template>
  <el-table-column label="Метка" min-width="200">
    <template #default="scope">
      <el-input
        v-model="scope.row.label"
        placeholder="Введите метки через ;"
        :maxlength="50"
        @blur="handleLabelBlur(scope.row)"
      />
    </template>
  </el-table-column>

  <el-table-column label="Тип записи" min-width="150">
    <template #default="scope">
      <el-select
        v-model="scope.row.type"
        placeholder="Выберите тип"
        @change="handleTypeChange(scope.row)"
      >
        <el-option label="LDAP" value="LDAP" />
        <el-option label="Локальная" value="Локальная" />
      </el-select>
    </template>
  </el-table-column>

  <el-table-column label="Логин" min-width="200">
    <template #default="scope">
      <el-input
        v-model="scope.row.login"
        placeholder="Введите логин"
        :maxlength="100"
        :class="{ 'is-error': scope.row.errors.login }"
        @blur="validateAndSave(scope.row)"
      >
      </el-input>
      
        <span v-if="scope.row.errors.login" class="error-text">Обязательное поле</span>
    </template>
  </el-table-column>

  <el-table-column label="Пароль" min-width="200">
    <template #default="scope">
      <el-input
        v-if="scope.row.type === 'Локальная'"
        v-model="scope.row.password"
        type="password"
        placeholder="Введите пароль"    
        show-password
        :maxlength="100"
        :class="{ 'is-error': scope.row.errors.password }"
        @blur="validateAndSave(scope.row)"
      />      
      <span v-if="scope.row.errors.password" class="error-text">Обязательное поле</span>
    </template>
  </el-table-column>

  <el-table-column label="Действия" min-width="100">
    <template #default="scope">
      <el-button
        type="danger"
        icon="Delete"
        @click="handleDelete(scope.row.id)"
      />
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/store';

const usersStore = useUsersStore();

const validate = (row: any): boolean => {
  const newErrors = {
    login: row.login?!row.login.trim():!row.login,
    password: row.type === 'Локальная' && (row.password?!row.password.trim():!row.password)
  };

  row.errors = newErrors;
  return !newErrors.login && !newErrors.password;
};

const save = (row: any) => {
  if (!validate(row)) return;

  const userData = {
    label: usersStore.parseLabels(row.label),
    type: row.type,
    login: row.login.trim(),
    password: row.type === 'Локальная' ? row.password : null
  };

  if (row.id) {
    usersStore.updateUser(row.id, userData);
  } else {
    usersStore.addUser(userData);
  }
};

const handleLabelBlur = (row: any) => {
  save(row);
};

const handleTypeChange = (row: any) => {
  validate(row);
  save(row);
};

const validateAndSave = (row: any) => {
  if (validate(row)) {
    save(row);
  }
};

const handleDelete = (id: number) => {
  usersStore.removeUser(id);
};
</script>

<style scoped>

.error-text {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 4px;
}

.is-error {
  --el-input-border-color: var(--el-color-danger);
}
</style>