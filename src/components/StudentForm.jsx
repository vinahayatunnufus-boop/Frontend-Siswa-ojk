
import { useState } from 'react'

const StudentForm = ({ initialData, onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)
    try {
      const saved = await onSubmit(Object.fromEntries(formData.entries()))
      if (saved) {
        form.reset()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="form-container">
      <h2>{initialData ? 'Edit Data Siswa' : 'Form Data Siswa'}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="kode_siswa"
          type="text"
          placeholder="Kode Siswa"
          defaultValue={initialData?.kode_siswa || ''}
          required
        />
        <input
          name="nama_siswa"
          type="text"
          placeholder="Nama Siswa"
          defaultValue={initialData?.nama_siswa || ''}
          required
        />
        <textarea
          name="alamat_siswa"
          placeholder="Alamat Siswa"
          defaultValue={initialData?.alamat_siswa || ''}
        ></textarea>
        <input
          name="tgl_siswa"
          type="date"
          defaultValue={initialData?.tgl_siswa
            ? initialData.tgl_siswa.slice(0, 10)
            : ''}
        />
        <input
          name="jurusan_siswa"
          type="text"
          placeholder="Jurusan Siswa"
          defaultValue={initialData?.jurusan_siswa || ''}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Menyimpan...' : initialData ? 'Simpan Perubahan' : 'Simpan Data'}
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} disabled={isSubmitting}>
            Batal
          </button>
        )}
      </form>
    </div>
  )
}

export default StudentForm
