<template>
  <el-table-column
    label="Метка"
    min-width="200"
  >
    <template #default="scope">
      <el-input
        v-model="scope.row.label"
        placeholder="Введите метки через ;"
        :maxlength="50"
        @blur="handleLabelBlur(scope.row)"
      />
    </template>
  </el-table-column>

  <el-table-column
    label="Тип записи"
    min-width="150"
  >
    <template #default="scope">
      <el-select
        v-model="scope.row.type"
        placeholder="Выберите тип"
        @change="handleTypeChange(scope.row)"
      >
        <el-option
          label="LDAP"
          value="LDAP"
        />
        <el-option
          label="Локальная"
          value="Локальная"
        />
      </el-select>
    </template>
  </el-table-column>

  <el-table-column
    label="Логин"
    min-width="200"
  >
    <template #default="scope">
      <el-tooltip
        :visible="scope.row.errors.login"
        content="Обязательное поле"
        placement="bottom"
        effect="customized"
      >
        <el-input
          v-model="scope.row.login"
          placeholder="Введите логин"
          :maxlength="100"
          :class="{ 'is-error': scope.row.errors.login }"
          @blur="validateAndSave(scope.row)"
        />
      </el-tooltip>
    </template>
  </el-table-column>

  <el-table-column
    label="Пароль"
    min-width="200"
  >
    <template #default="scope">      
      <el-tooltip
        :visible="scope.row.errors.password"
        content="Обязательное поле"
        placement="bottom"
        effect="customized"
      >
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
      </el-tooltip>
    </template>
  </el-table-column>

  <el-table-column
    min-width="100"
    align="center"
  >
    <template #default="scope">
      <el-popconfirm
        confirm-button-text="Да"
        cancel-button-text="Нет"
        title="Подтвердите действие"
        width="200"
        @confirm="handleDelete(scope.row.id)"
      >
        <template #reference>
          <el-button
            type="danger"
            icon="Delete"
          />
        </template>
      </el-popconfirm>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/store';
import type { UserRow } from '@/types/user';

const usersStore = useUsersStore();

const validate = (row: UserRow): boolean => {
  const isLoginEmpty = !row.login || !row.login.trim();
  const isPasswordEmpty = !row.password || !row.password.trim();
  const isPasswordRequired = row.type === 'Локальная';

  const newErrors = {
    login: isLoginEmpty,
    password: isPasswordRequired && isPasswordEmpty
  };

  row.errors = newErrors;
  return !newErrors.login && !newErrors.password;
};

const save = (row: UserRow) => {
  if (!validate(row)) return;

  const userData = {
    label: usersStore.parseLabels(row.label),
    type: row.type,
    login: row.login!.trim(),
    password: row.type === 'Локальная' ? row.password : null
  };

  if (row.id) {
    usersStore.updateUser(row.id, userData);
  } else {
    usersStore.addUser(userData);
  }
};

const handleLabelBlur = (row: UserRow) => {
  save(row);
};

const handleTypeChange = (row: UserRow) => {
  validate(row);
  save(row);
};

const validateAndSave = (row: UserRow) => {
  if (validate(row)) {
    save(row);
  }
};

const handleDelete = (id: number) => {
  usersStore.removeUser(id);
};
</script>

<style scoped>
.input-with-error {
  position: relative;
  display: flex;
  flex-direction: column;
}

.is-error {
  --el-input-border-color: var(--el-color-danger);
}
</style>

<style>
.el-popper.is-customized {
  padding: 6px 12px;
  background-color: #f56c6c;
  color: #fff;
}

.el-popper.is-customized .el-popper__arrow::before {
  background-color: #f56c6c;
  right: 0;
}
</style>