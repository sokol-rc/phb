<template>
  <v-list density="compact">

    <v-list-group :value="title">
      <template v-slot:activator="list">
        <v-list-item
            v-for="(filter) in props.filtersList"
            v-bind="list.props"
            :title="filter.name"
            height="50"
        >
          <template v-slot:append="{ isActive }">
            <v-switch
                v-model="filterModel"
                :value="filter.value"
                hide-details
            ></v-switch>
          </template>
        </v-list-item>
      </template>
    </v-list-group>
  </v-list>
</template>
<script setup lang="ts">

import {computed} from "vue"

interface IFilters {
  name: string
  value: boolean
}
const props = defineProps<{
  filtersList: IFilters[]
  model: number[]
  title: string
}>()
const emit = defineEmits<{
  (e: 'update:model', val: number[]): void
}>()

const filterModel = computed({
  get() {
    return props.model
  },
  set(val) {
    emit('update:model', val)
  }
})
</script>
