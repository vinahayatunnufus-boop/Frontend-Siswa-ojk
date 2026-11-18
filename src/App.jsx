
import './App.css'
import { useEffect, useState } from 'react'

import StudentForm from './components/StudentForm.jsx'
import StudentTable from './components/StudentTable.jsx'

function App() {
  const [students, setStudents] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [editingStudent, setEditingStudent] = useState(null)

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await fetch('/api/siswa')
        const result = await response.json()
        if (!response.ok) {
          throw new Error(result.message || 'Gagal mengambil data siswa.')
        }
        setStudents(result)
      } catch (loadError) {
        setError(loadError.message)
      }
    }

    loadStudents()
  }, [])

  const saveStudent = async (student) => {
    setError('')
    setMessage('')
    try {
      const response = await fetch(
        editingStudent ? `/api/siswa/${editingStudent.id}` : '/api/siswa',
        {
          method: editingStudent ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student),
        },
      )
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Gagal menyimpan data siswa.')
      }
      if (editingStudent) {
        setStudents((currentStudents) =>
          currentStudents.map((currentStudent) =>
            currentStudent.id === editingStudent.id
              ? { ...currentStudent, ...student }
              : currentStudent,
          ),
        )
        setEditingStudent(null)
      } else {
        setStudents((currentStudents) => [{ id: result.id, ...student }, ...currentStudents])
      }
      setMessage(result.message)
      return true
    } catch (saveError) {
      setError(saveError.message)
      return false
    }
  }

  const deleteStudent = async (student) => {
    if (!window.confirm(`Hapus data siswa ${student.nama_siswa}?`)) {
      return
    }

    setError('')
    setMessage('')
    try {
      const response = await fetch(`/api/siswa/${student.id}`, {
        method: 'DELETE',
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Gagal menghapus data siswa.')
      }
      setStudents((currentStudents) =>
        currentStudents.filter((currentStudent) => currentStudent.id !== student.id),
      )
      if (editingStudent?.id === student.id) {
        setEditingStudent(null)
      }
      setMessage(result.message)
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  return (
    <div className="container">
      <h1>APLIKASI DATA SISWA</h1>

      <StudentForm
        key={editingStudent?.id || 'new'}
        initialData={editingStudent}
        onSubmit={saveStudent}
        onCancel={() => setEditingStudent(null)}
      />
      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}

      <StudentTable
        students={students}
        onEdit={(student) => {
          setMessage('')
          setError('')
          setEditingStudent(student)
        }}
        onDelete={deleteStudent}
      />
    </div>
  )
}

export default App
