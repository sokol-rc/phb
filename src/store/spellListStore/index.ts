import {defineStore} from "pinia"
import {default as spells } from '@/database/spells.json'
import {ref} from "vue";
import orderBy from 'lodash.orderby'
import cloneDeep from 'lodash.clonedeep'
import {filterByLevel} from "@/helpers/filters";

export interface FiltersArrayValues {
    level?: Levels[]
    classes?: string[]
}
export enum Levels {
    FOCUS,
    LVL_1,
    LVL_2,
    LVL_3,
    LVL_4,
    LVL_5,
    LVL_6,
    LVL_7,
    LVL_8,
    LVL_9,
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
    const savedCollectionList = ref<ISpell[]>([])
    const isSavedCollection = ref(false)
    
    //snacks
    const snackbarShow = ref(false)
    const snackbarType = ref('success')
    const snackbarText = ref('Успешно добавлено')
    
    const restoreSpellList = () => spellList.value = spells.compendium.spell
    
    const initSpellList = () => {
        isSavedCollection.value = false
        restoreSpellList()
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
        savedCollectionList.value = currentCollection
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
    
    const restoreFilteredList = () => {
        if(isSavedCollection.value) {
            loadSavedCollection()
        } else {
            restoreSpellList()
        }
    }
    
    const filterSpellList = (filters: FiltersArrayValues) => {
        const {level} = filters
        
        restoreFilteredList()
        
        const sourceList = isSavedCollection.value ? savedCollectionList.value : spells.compendium.spell
        if (level?.length) {
            spellList.value =  filterByLevel(level, sourceList)
        }
        
    }
       
    
    return {
        spellList,
        isSavedCollection,
        snackbarShow,
        snackbarText,
        snackbarType,
        initSpellList,
        sortSpellList,
        filterSpellList,
        loadSavedCollection,
        addToSavedCollection,
        deleteFromSavedCollection,
    }
})
