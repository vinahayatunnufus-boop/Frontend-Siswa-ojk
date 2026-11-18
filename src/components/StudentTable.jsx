
function StudentTable({ students, onEdit, onDelete }) {
  const formatDate = (date) => {
    if (!date) {
      return '-'
    }

    const [year, month, day] = date.slice(0, 10).split('-')
    return `${day}/${month}/${year}`
  }

  return (
    <div className="table-container">
      <h2>Data Siswa</h2>

      <table>
        <thead>
          <tr>
            <th>Kode Siswa</th>
            <th>Nama Siswa</th>
            <th>Alamat Siswa</th>
            <th>Tanggal Lahir</th>
            <th>Jurusan</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6">Belum ada data siswa</td>
            </tr>
          ) : students.map((student) => (
            <tr key={student.id}>
              <td>{student.kode_siswa}</td>
              <td>{student.nama_siswa}</td>
              <td>{student.alamat_siswa || '-'}</td>
              <td>{formatDate(student.tgl_siswa)}</td>
              <td>{student.jurusan_siswa || '-'}</td>
              <td>
                <button type="button" onClick={() => onEdit(student)}>
                  Edit
                </button>
                <button className="delete-button" type="button" onClick={() => onDelete(student)}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable
