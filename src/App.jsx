import { useState, initialState } from 'react'
import * as XLSX from 'xlsx';

function App() {
  const [items, setItems] = useState(initialState);

  const readExcel = (file) => {

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      console.log(fileReader);

      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })

    promise.then((res) => setItems(res))
  }

  return (
    <div>
      <input type="file" onChange={(e) => {
        const file = e.target.files[0];
        readExcel(file);
      }} />

      <table class="table" border="1" style={{borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {items && items.map((elem) => (
            <tr key={elem['Полное наименование']}>
              <th>{elem['Полное наименование']}</th>
              <td><input type="text" value={elem['Дата рождения']} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default App
