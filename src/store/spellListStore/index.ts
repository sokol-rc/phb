import {defineStore} from "pinia"
import {default as spells } from '@/database/spells.json'
import {computed, ref} from "vue";
import orderBy from 'lodash.orderby'
import cloneDeep from 'lodash.clonedeep'

interface DndDatabase {
    compendium: ICompendium;
}

interface ICompendium {
    spell: ISpell[];
}

export interface ISpell {
    id: number
    name: string
    level?: number
    school: string
    time: string
    range?: string
    components?: string
    duration?: string
    text: string
    classes: string
    roll?: string[] | string
    ritual?: string
}


export const useSpellListStore = defineStore('spell-list', () => {
    
    const spellList = ref<ISpell[]>([])
    const isSavedCollection = ref(false)
    
    //snacks
    const snackbarShow = ref(false)
    const snackbarType = ref('success')
    const snackbarText = ref('Успешно добавлено')
    
    const initSpellList = () => {
        isSavedCollection.value = false
        spellList.value = spells.compendium.spell
    }
    
    const sortSpellList = (field = 'name', order = 'asc') => {

        const prepareSpellList = cloneDeep(spellList.value).map((spell) => {
            if (!spell.level) {
                spell.level = 0
            }
            return spell
        })
        //@ts-ignore
        spellList.value = orderBy(prepareSpellList, [field, 'name'], [order, 'asc'])
    }
    
    const getSavedCollection = (collectionName: string) => {
        return JSON.parse(localStorage.getItem(collectionName) || '')
    }
    
    const setSavedCollection = (collectionName: string, value: ISpell[]) => {
        localStorage.setItem(collectionName, JSON.stringify(value))
    }
    
    const loadSavedCollection = () => {
        const currentCollection = getSavedCollection('бард')
        spellList.value = currentCollection
        isSavedCollection.value = true
    }
    
    const alreadySaved = (id: number) => {
        const currentCollection: ISpell[] = getSavedCollection('бард')
        return currentCollection.some(spell => spell.id === id)
    }
    
    const addToSavedCollection = (id: number) => {
        if (alreadySaved(id)) {
            snackbarText.value = 'Уже сохранено'
            snackbarType.value = 'error'
            snackbarShow.value = true
            return
        }
        const spell = spellList.value.find((spell) => spell.id === id)
        const currentCollection = getSavedCollection('бард')
        currentCollection.push(spell)
        
        setSavedCollection('бард', currentCollection)
        snackbarText.value = 'Успешно добавлено'
        snackbarType.value = 'success'
        snackbarShow.value = true
    }
    
    const deleteFromSavedCollection = (id: number) => {
        const currentCollection: ISpell[] = getSavedCollection('бард')
        const newCollection = currentCollection.filter((spell) => spell.id !== id)

        setSavedCollection('бард', newCollection)
        spellList.value = newCollection
        snackbarText.value = 'Успешно удалено'
        snackbarType.value = 'success'
        snackbarShow.value = true
    }
       
    
    return {
        spellList,
        isSavedCollection,
        snackbarShow,
        snackbarText,
        snackbarType,
        initSpellList,
        sortSpellList,
        loadSavedCollection,
        addToSavedCollection,
        deleteFromSavedCollection,
    }
})
