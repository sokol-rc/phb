<template>
  <v-card
      class="spell-list-item"
      @click="openSpellCard"
  >
    <template v-slot:title>
      <div class="text-caption">{{ spell.level ? `${spell.level} уровень` : `заговор` }}</div>
      <p class="text-h6 text--primary">
        {{ spell.name }}
      </p>
    </template>
    <template v-slot:subtitle>
      <span class="spell-list-item__subtitle me-1 text-wrap">{{ mainParams }}</span>
    </template>
    <template v-slot:append>
      <v-btn
          v-if="!isIconAdd"
          icon="mdi-plus-circle-outline"
          @click.stop="onAddIconClick"
      ></v-btn>
      <v-btn
          v-else
          icon="mdi-minus-circle-outline"
          @click.stop="onDeleteIconClick"
      ></v-btn>
    </template>
  </v-card>
  <v-dialog
      v-model="dialog"
      fullscreen
      scrollable
      
  >
    <v-card>
      <v-toolbar>
        <v-toolbar-title>{{spell.name}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn
              icon="mdi-close"
              @click="dialog = false"
          ></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      
        <v-card-title><span class="text-wrap text-h6">Название: {{ spell.name }}</span></v-card-title>

        <v-card-subtitle>
          <v-list>
            <v-list-item-title>
              <span class="text-wrap">
                <span class="text-subtitle-2 font-weight-bold">Уровень:</span> 
                {{ spell.level ? `${spell.level} уровень` : `заговор` }}
              </span>
            </v-list-item-title>
            <v-list-item-title>
              <span class="text-wrap">
                <span class="text-subtitle-2 font-weight-bold">Время накладывания:</span> 
                {{ spell.ritual ? 'ритуал' : spell.time }}
              </span>
            </v-list-item-title>
            <v-list-item-title>
              <span class="text-wrap">
                <span class="text-subtitle-2 font-weight-bold">Дистанция:</span> 
                {{ spell.range}}
              </span>
            </v-list-item-title>
            <v-list-item-title>
              <span class="text-wrap">
                <span class="text-subtitle-2 font-weight-bold">Классы:</span> 
                 {{ spell.classes }}
                </span>
            </v-list-item-title>
            <v-list-item-title>
              <span class="text-wrap">
                <span class="text-subtitle-2 font-weight-bold">Школа:</span> 
                {{ spell.school }}
              </span>
            </v-list-item-title>
            <v-list-item-title>
              <span class="text-wrap">
                <span class="text-subtitle-2 font-weight-bold">Компоненты:</span> 
                {{ spell.components }}
              </span>
            </v-list-item-title>
            <v-list-item-title>
              <span class="text-wrap">
                <span class="text-subtitle-2 font-weight-bold">Продолжительность:</span> 
                {{ spell.duration }}
              </span>
            </v-list-item-title>
          </v-list>
        </v-card-subtitle>

        <v-card-text>
          <div class="text-body-1">{{spell.text}}</div>
        </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import {computed, ref} from "vue";
import type {ISpell} from "@/store/spellListStore";

const {
  spell,
  isIconAdd,
} = defineProps<{
  spell: ISpell
  isIconAdd?: boolean
}>()

const emit = defineEmits(['onAddIconClick', 'onDeleteIconClick'])

const dialog = ref(false)

const mainParams = computed(() => {
  const {time, duration, range} = spell
  return [time, duration, range]
      .filter(Boolean)
      .filter(v => !v?.toLowerCase().includes('мгновен'))
      .map(v => v?.includes('реакция') ? 'Реакция' : v)
      .join(' | ')

})

const openSpellCard = () => {
  dialog.value = true
}

const onAddIconClick = () => {
  emit('onAddIconClick', spell.id)
}

const onDeleteIconClick = () => {
  emit('onDeleteIconClick', spell.id)
}

</script>
<style scoped>
.spell-list-item__subtitle {
  font-size: 12px
}
</style>
