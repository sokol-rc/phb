<template>
  <v-card
      color="grey-lighten-4"
      rounded="0"
      flat
  >
      <v-toolbar density="compact">
        <v-app-bar-nav-icon @click.stop="() => emit('openDrawer')"></v-app-bar-nav-icon>

        <v-toolbar-title>{{label ?? 'Заклинания'}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
            >
              <v-icon>mdi-sort</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                v-for="(item, index) in sortMenu"
                :key="index"
                :value="index"
                @click="item.onClick"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn icon @click.stop="() => emit('openFilters')">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        
      </v-toolbar>
  </v-card>
</template>
<script setup lang="ts">
import {ref} from "vue";

const emit = defineEmits(['sortByLevel', 'sortByName', 'openDrawer', 'openFilters'])
const {
  label,
} = defineProps<{label: string | null}>()

const sortMenu = [
  {
    title: 'Сортировать по уровню',
    onClick: () => emit('sortByLevel'),
  },
  {
    title: 'Сортировать по названию',
    onClick: () => emit('sortByName'),
  },
]
</script>
