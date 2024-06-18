import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { db } from '@/firebase/firebase'
import { collection, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore'

export default defineStore('notesArr', {
  state: () => {
    return {
      loadingNotes: true,
      notes: ref([])
    }
  },
  actions: {
    async getNotes() {
      onSnapshot(collection(db, 'notes'), (documentsFromDb) => {
        const notes = []
        documentsFromDb.forEach(doc => {
          notes.unshift({
            id: doc.id,
            value: doc.data().value,
            edited: doc.data().edited,
            date: doc.data().date,
            month: doc.data().month,
            year: doc.data().year,
            minute: doc.data().minute,
            hour: doc.data().hour
          })
        })
        this.notes = notes.sort((first, second)=>{
          this.getDateAndTime(first) - this.getDateAndTime(second)
        })
        this.loadingNotes = false
      })
    },
    async addNote(val) {
      if (!val)
        return
      const id = new Date().getTime().toString()
      await setDoc(doc(db, "notes", id), {
        id: id,
        value: val,
        date: new Date().getDate().toString(),
        month: new Date().getMonth().toString(),
        year: new Date().getFullYear().toString(),
        minute: new Date().getMinutes().toString(),
        hour: new Date().getHours().toString(),
        edited: false
      })
    },
    async deleteNote(indToBeRemoved) {
      await deleteDoc(doc(db, "notes", this.notes[indToBeRemoved].id)).finally(() => {
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
      if(!val) return
      const ind = this.findIndById(id)
      this.notes[ind].date =  new Date().getDate().toString()
      this.notes[ind].month =  new Date().getMonth().toString()
      this.notes[ind].year =  new Date().getFullYear().toString()
      this.notes[ind].minute =  new Date().getMinutes().toString()
      this.notes[ind].hour = new Date().getHours().toString()
      this.notes[ind].value = val
      await setDoc(doc(db, "notes", id), {
        id: id,
        value: val,
        date: new Date().getDate().toString(),
        month: new Date().getMonth().toString(),
        year: new Date().getFullYear().toString(),
        minute: new Date().getMinutes().toString(),
        hour: new Date().getHours().toString(),
        edited: true
      })
    },
    async setEditedToFalse(id) {
      const ind = this.findIndById(id)
      this.notes[ind].edited = false
      await setDoc(doc(db, "notes", id), {
        ...this.notes[ind],
        edited: false
      })
    },
    getDateAndTime(note){
      const date = note.date.length===1?'0'+note.date:note.date 
      const month = note.month.length===1?'0'+note.month:note.month
      const year = note.year 
      const minute = note.minute.length === 1 ? '0' + note.minute : note.minute
      // const ampm = note.hour>'12'? 'PM':'AM'
      // const hour = note.hour>'12'? (note.hour-'12').toString(): note.hour
      const hour = note.hour.lenhth === 1 ? '0' + note.hour : note.hour
      // const time = `${hour.length===1?'0'+hour:hour}:${minute} ${ampm}`
      const timeData = minute+hour+date+month+year
      return timeData
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
