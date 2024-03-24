<template>
  <div
      v-if="offlineReady || needRefresh"
      class="pwa-toast"
      role="alert"
  >
    <div class="message">
      <span v-if="offlineReady">
        App ready to work offline
      </span>
      <span v-else>
        New content available, click on reload button to update.
      </span>
    </div>
    <button v-if="needRefresh" @click="updateServiceWorker()">
      Reload
    </button>
    <button @click="close">
      Close
    </button>
  </div>
  <HeaderToolbar
      :label="currentLabel"
      @sort-by-level="onSortByLevel"
      @sort-by-name="onSortByName"
      @open-drawer="onOpenDrawer"
  />
  <v-layout>
    <v-navigation-drawer
        v-model="drawer"
        location="left"
        temporary
    >
      <v-list>
        <v-list-item
            title="Все заклинания"
            value="all"
            @click.stop="openAllSpellList"
        ></v-list-item>
        <v-list-item
            title="Бард"
            value="bard"
            @click.stop="openSavedCollection"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
  <main-spell-list></main-spell-list>
  <v-snackbar
      v-model="spellListStore.snackbarShow"
      :timeout="2000"
      :color="spellListStore.snackbarType"
      elevation="24"
  >
    {{ spellListStore.snackbarText }}
  </v-snackbar>
</template>

<script setup lang="ts">
import {useRegisterSW} from 'virtual:pwa-register/vue'
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import MainSpellList from "@/components/MainSpellList.vue";

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW()

async function close() {
  offlineReady.value = false
  needRefresh.value = false
}

import {useSpellListStore} from "@/store/spellListStore"
import {onMounted, ref} from "vue";

const spellListStore = useSpellListStore()

const drawer = ref(false)
const currentLabel = ref<string | null>(null)

/*const drawerMenu = [
  {
    title: 'Бард',
    onClick: () => openSavedCollection(),
  },
]*/

onMounted(() => {
  spellListStore.initSpellList()
  const savedCollection = [
    {
      "id": 0,
      "name": "Испепеляющий удар",
      "level": 1,
      "school": "EV",
      "time": "Действие",
      "range": "На себя (15-футовый конус)",
      "components": "(2 очка ци)",
      "duration": "Мгновенно",
      "text": "Вы можете потратить 2 очка ци, чтобы наложить заклинание огненные ладони \n\nСоединив ладони и растопырив пальцы веером, вы испускаете из них тонкие языки пламени. Все существа в пределах 15-футового конуса должны совершить спасброски Ловкости. Существо получает урон огнём 3d6 в случае провала и половину этого урона в случае успеха.\n\n    Пламя поджигает все горючие предметы, никем не несомые и не носимые.",
      "classes": "Монах (Путь четырёх стихий)"
    },
    {
      "id": 1,
      "name": "Дружба с животными",
      "level": 1,
      "school": "EN",
      "time": "Действие",
      "range": "30 футов",
      "components": "V, S, M (кусочек пищи)",
      "duration": "24 часа",
      "text": "Это заклинание позволяет убедить Зверя, что вы не намерены причинять ему вред. Выберите Зверя, которого вы видите в пределах дистанции. Он должен видеть и слышать вас. Если Интеллект Зверя 4 и больше, то заклинание проваливается. В противном случае Зверь должен преуспеть в спасброске Мудрости, иначе он станет очарованным на время действия заклинания. Если вы или один из ваших спутников причинит цели вред, заклинание окончится.\n\nНа больших уровнях. Если вы накладываете это заклинание, используя ячейку 2-го уровня или выше, вы можете воздействовать на одного дополнительного Зверя за каждый уровень ячейки выше первого.",
      "classes": "Бард, Друид, Жрец (Домен природы), Следопыт"
    },]
  localStorage.setItem('бард', JSON.stringify(savedCollection))
})
const onSortByLevel = () => {
  spellListStore.sortSpellList('level', 'asc')
}
const onSortByName = () => {
  spellListStore.sortSpellList('name', 'asc')
}
const openAllSpellList = () => {
  spellListStore.initSpellList()
  currentLabel.value = null
  closeDrawer()
}
const openSavedCollection = () => {
  spellListStore.loadSavedCollection()
  currentLabel.value = 'Бард'
  closeDrawer()
}

const openDrawer = () => drawer.value = true
const closeDrawer = () => drawer.value = false

const onOpenDrawer = () => {
  openDrawer()
}
</script>

<style>
</style>
