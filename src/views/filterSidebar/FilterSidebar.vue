<template>
  <v-navigation-drawer
      v-model="sidebarVisible"
      location="right"
      :width="300"
      floating
      temporary
  >
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>
          Уровни
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <filter-list 
              title="Уровень" 
              :filters-list="filterLevels" 
              v-model:model="filteredLevels"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-navigation-drawer>
</template>
<script setup lang="ts">

import {computed, ref, watch} from "vue"
import {type FiltersArrayValues, Levels, useSpellListStore} from "@/store/spellListStore"
import {filterLevels} from "@/views/filterSidebar/configs/filters"
import FilterList from "@/components/FilterList.vue"

const spellListStore = useSpellListStore()
const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void
}>()

const props = defineProps<{
  visible: boolean
}>()

const filtersArray = ref<FiltersArrayValues | null>(null)

const filteredLevels = ref<Levels[]>([])

const sidebarVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  },
})

const doFilter = (filter: FiltersArrayValues) => {
  filtersArray.value = {
    ...filter
  }
  spellListStore.filterSpellList(filtersArray.value)
}

watch(filteredLevels, (value) => {
  if (!value) return
  doFilter({level: value})

})
</script>
