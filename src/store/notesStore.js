import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/firebase/firebase'
import { collection, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore'

export default defineStore('notesArr', {
  state: () => {
    return {
      notes: ref([])
    }
  },
  actions: {
    async getNotes() {
      onSnapshot(collection(db, 'notes'), (documentsFromDb) => {
        this.notes = ref([])
        documentsFromDb.forEach(doc => {
          this.notes.unshift({
            id: doc.id,
            value: doc.data().value,
            edited: false,
            date: doc.data().date,
            month: doc.data().month,
            year: doc.data().year,
            minute: doc.data().minute,
            hour: doc.data().hour
          })
          // let idFoundFlag = false
          // for (let note of this.notes) {
          //   if (note.id === doc.id) {
          //     idFoundFlag = true
          //     if (note.value !== doc.data().value) {
          //       note.value = doc.data().value
          //       break
          //     }
          //   }
          // }
          // if (!idFoundFlag) {
          //   this.notes.unshift({
          //     id: doc.id,
          //     value: doc.data().value,
          //     edited: false,
          //     date: doc.data().date,
          //     month: doc.data().month,
          //     year: doc.data().year,
          //     minute: doc.data().minute,
          //     hour: doc.data().hour
          //   })
          // }
        })
      })
    },
    async addNote(val) {
      if (!val)
        return
      const id = new Date().getTime().toString()
      await setDoc(doc(db, "notes", id), {
        value: val,
        date: new Date().getDate().toString(),
        month: new Date().getMonth().toString(),
        year: new Date().getFullYear().toString(),
        minute: new Date().getMinutes().toString(),
        hour: new Date().getHours().toString(),
      })
    },
    async deleteNote(indToBeRemoved) {
      await deleteDoc(doc(db, "notes", this.notes[indToBeRemoved].id)).finally(() => {
        // this.notes.splice(indToBeRemoved, 1)
        this.notes = ref([])
        this.getNotes()
      })
    },
    findIndById(id) {
      for (let ind in this.notes) {
        if (this.notes[ind].id === id) {
          return ind
        }
      }
      return -1
    },
    async editNote(id, val) {
      const ind = this.findIndById(id)
      this.notes[ind].edited = true
      this.notes[ind].date =  new Date().getDate().toString()
      this.notes[ind].month =  new Date().getMonth().toString()
      this.notes[ind].year =  new Date().getFullYear().toString()
      this.notes[ind].minute =  new Date().getMinutes().toString()
      this.notes[ind].hour = new Date().getHours().toString()
      this.notes[ind].value = val
      await setDoc(doc(db, "notes", id), {
        value: val,
        date: new Date().getDate().toString(),
        month: new Date().getMonth().toString(),
        year: new Date().getFullYear().toString(),
        minute: new Date().getMinutes().toString(),
        hour: new Date().getHours().toString(),
        edited: false
      })
    },
    setEditedToFalse(id) {
      const ind = this.findIndById(id)
      this.notes[ind].edited = false
    }
  },
  getters:{
    getNumOfNotes: (state) => {
      return state.notes.length
    },
    getNumOfChars: (state) => {
      let count = 0
      for (let note of state.notes) {
        count += note.value.length
      }
      return count
    }
  }
})