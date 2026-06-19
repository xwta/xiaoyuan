<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>商品管理</span>
        <el-button type="primary" size="small" @click="openCreate">新增商品</el-button>
      </div>
    </template>

    <el-table :data="products" stripe>
      <el-table-column prop="id" label="ID" width="90" />
      <el-table-column prop="name" label="商品名称" min-width="160" />
      <el-table-column prop="price" label="价格" width="100">
        <template #default="scope">¥{{ Number(scope.row.price || 0).toFixed(2) }}</template>
      </el-table-column>
      <el-table-column prop="count" label="数量" width="100" />
      <el-table-column prop="categoryId" label="分类ID" width="100" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'off' ? 'info' : 'success'">
            {{ scope.row.status === 'off' ? '下架' : '上架' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="openEdit(scope.row)">编辑</el-button>
          <el-button size="small" @click="toggleStatus(scope.row)">{{ scope.row.status === 'off' ? '上架' : '下架' }}</el-button>
          <el-button size="small" type="danger" @click="removeItem(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="visible" :title="editingId ? '编辑商品' : '新增商品'" width="420px">
      <el-form label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="例如：可乐 500ml" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" placeholder="例如：3.00" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.count" placeholder="例如：100" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { createProduct, deleteProduct, updateProduct } from '../api';

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(['refresh']);

const visible = ref(false);
const editingId = ref(null);
const form = reactive({ name: '', price: '', count: '' });

function openCreate() {
  editingId.value = null;
  form.name = '';
  form.price = '';
  form.count = '';
  visible.value = true;
}

function openEdit(row) {
  editingId.value = row.id;
  form.name = row.name;
  form.price = row.price;
  form.count = row.count;
  visible.value = true;
}

async function submit() {
  if (!form.name) return;
  if (editingId.value) {
    await updateProduct(editingId.value, { ...form, categoryId: 1 });
  } else {
    await createProduct({ ...form, categoryId: 1 });
  }
  visible.value = false;
  emit('refresh');
}

async function toggleStatus(row) {
  await updateProduct(row.id, { status: row.status === 'off' ? 'on' : 'off' });
  emit('refresh');
}

async function removeItem(row) {
  await deleteProduct(row.id);
  emit('refresh');
}
</script>
