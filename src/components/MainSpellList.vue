<template>
  <v-list lines="three">
    <template v-for="(spell) in spellListStore.spellList" :key="spell.id">
      
      <spell-list-item
          :spell="spell"
          :isIconAdd="isIconAdd"
          @on-add-icon-click="onAddIconClick"
          @on-delete-icon-click="onDeleteIconClick"
      ></spell-list-item>
    </template>
    
  </v-list>
</template>
<script setup lang="ts">
import SpellListItem from "@/components/SpellListItem.vue"
import {useSpellListStore} from "@/store/spellListStore"
import {computed} from "vue"

const spellListStore = useSpellListStore()

const isIconAdd = computed(() => spellListStore.isSavedCollection)

const onAddIconClick = (id: number) => {
  spellListStore.addToSavedCollection(id)
}

const onDeleteIconClick = (id: number) => {
  spellListStore.deleteFromSavedCollection(id)
}
</script>
