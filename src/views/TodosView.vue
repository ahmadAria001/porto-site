<script setup lang="ts">
import { cn } from '@/lib/utils';
import { PROGRESS, useTodoStore, Filters } from '@/stores/todo';
import { storeToRefs } from 'pinia';
import { reactive, ref, } from 'vue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Button from '@/components/ui/button/Button.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import { CheckIcon, Edit3, Loader2, PackageOpen, StopCircle, Trash, UploadIcon, } from 'lucide-vue-next';
import { Table, TableRow, TableHead, TableCell, TableBody, TableHeader } from '@/components/ui/table';
import Input from '@/components/ui/input/Input.vue';
import { ulid } from 'ulid';

const store = useTodoStore();
const { setFilter, setProgress, add, remove } = store;
const { filteredTodos, filter, } = storeToRefs(store);

const states = reactive<{
  selectedProgress: PROGRESS,
  selectedTodos: string[]
}>({
  selectedProgress: PROGRESS.todo,
  selectedTodos: []
});

const checkHeader = ref(false);

const formAddNew = reactive({
  title: '',
  description: '',
});

const resetFormAddNew = () => {
  formAddNew.title = '';
  formAddNew.description = '';
}

const resetStates = () => {
  states.selectedTodos = [];
  if (checkHeader.value) {
    checkHeader.value = false;
  }
}

const handleAddNew = () => {
  add({
    title: formAddNew.title,
    description: formAddNew.description,
    id: ulid(),
    progress: PROGRESS.todo,
  });
  resetFormAddNew();
}

const selectAllTodos = () => {
  for (const todo of filteredTodos.value) {
    states.selectedTodos.push(todo.id);
  }
}

const handleRemove = () => {
  for (const id of states.selectedTodos) {
    remove(id);
  }
  resetStates();
}

const handleSubmit = () => {
  states.selectedTodos.forEach((id) => {
    setProgress(id, states.selectedProgress);
  });

  resetStates();
}
</script>

<template>
  <main>
    <div class="flex flex-col items-center h-screen space-y-3">
      <h1 class="text-3xl font-bold">Todos</h1>
      <div class="flex flex-col gap-4 w-full max-w-lg">
        <div class="flex gap-4 items-center">
          <h2 class="text-xl font-bold">Filter</h2>
          <Select v-model="filter" @change="setFilter(filter)">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select Filter" class="capitalize" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="filter in Filters" :key="filter" :value="filter" class="capitalize">
                {{ filter }}
              </SelectItem>
            </SelectContent>
          </Select>
          <Select v-model="states.selectedProgress">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select a fruit" class="capitalize" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="progress in PROGRESS" :key="progress" :value="progress" class="capitalize">
                {{ progress }}
              </SelectItem>
            </SelectContent>
          </Select>
          <Button class="rounded-md" @click="handleSubmit" :disabled="states.selectedTodos.length === 0">
            <Edit3 class="size-5" />
            Change Progress
          </Button>
          <Button variant="destructive" class="bg-destructive rounded-md" @click="handleRemove"
            :disabled="states.selectedTodos.length === 0">
            <Trash class="size-5" />
            Remove
          </Button>
        </div>
        <Table class="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>
                <input type="checkbox" @click="selectAllTodos" v-model="checkHeader" />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Progress </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="filteredTodos.length > 0">
              <TableRow v-for="todo in filteredTodos" :key="todo.id">
                <TableCell>
                  <input type="checkbox" v-model="states.selectedTodos" :id="todo.id" :value="todo.id"
                    :class="cn('text-primary',)" />
                </TableCell>
                <TableCell>
                  <span class="text-lg">{{ todo.title }}</span>
                </TableCell>
                <TableCell>
                  <span class="text-lg">{{ todo.description }}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="default" :class="cn('text-medium', {
                    'text-blue-500 bg-blue-100': todo.progress === PROGRESS.doing,
                    'text-amber-500 bg-amber-100': todo.progress === PROGRESS.todo,
                    'text-green-500 bg-green-100': todo.progress === PROGRESS.done,
                  })">
                    <CheckIcon class="size-5" v-if="todo.progress === PROGRESS.done" />
                    <Loader2 class="size-5" v-if="todo.progress === PROGRESS.doing" />
                    <StopCircle class="size-5" v-if="todo.progress === PROGRESS.todo" />
                    {{ todo.progress }}
                  </Badge>
                </TableCell>
              </TableRow>
            </template>
            <template v-else>
              <TableRow>
                <TableCell class="col-span-full" :colspan="4">
                  <p class="text-xl font-bold flex space-x-2 justify-center items-center">
                    <PackageOpen class="size-5" />
                    <span>No todos found</span>
                  </p>
                </TableCell>
              </TableRow>
            </template>
            <TableRow>
              <TableCell>
                <input type="checkbox" disabled />
              </TableCell>
              <TableCell>
                <Input v-model="formAddNew.title" placeholder="Title" />
              </TableCell>
              <TableCell>
                <Input v-model="formAddNew.description" placeholder="Description" />
              </TableCell>
              <TableCell>
                <Button variant="default" class="border-2 border-primary rounded-md" @click="handleAddNew"
                  :disabled="formAddNew.title === '' || formAddNew.description === ''">
                  <UploadIcon class="size-5" />
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </main>
</template>
