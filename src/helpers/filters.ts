import {type ISpell, Levels} from "@/store/spellListStore";

export const filterByLevel = (level: Levels[], sourceList: ISpell[]) => {
    return sourceList.filter(spell => {
        if (!spell.level) spell.level = Levels.FOCUS
        if (Object.values(level).includes(spell.level)) {
            return true
        }
        return false
    })
}
