import { useState, initialState, useEffect } from 'react'
import * as XLSX from 'xlsx';
import dataWrite from './assets/newJson.json';
import dataRide from './assets/nimadir.json';

export let dataObj = []


function App() {
  const [items, setItems] = useState(initialState);

  const readExcel = (file) => {

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
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


  useEffect(() => {
    if (items) {
      items.map(item => {
        if (!dataObj.some(e => e["soato"] == item["СОАТО"])) {
          dataObj.push({
            nomi: item["аҳоли пункти"],
            soato: item["СОАТО"],
            mahallalar: [{
              nomi: item["маҳалла қисқа"],
              soato: item["fifteen"],
            }]
          })
        } else {
          dataObj[dataObj.findIndex(t => t?.soato == item["СОАТО"])]?.mahallalar.push({
            nomi: item["маҳалла қисқа"],
            soato: item["fifteen"],
          })
        }
      })
    }


    console.log(JSON.stringify(dataObj))
    // document.write(JSON.stringify(dataObj))
  }, [items])

 /*  useEffect(() => {
    if (items) {
      items.map(item => {
        dataRide.forEach(region => {
          region["tumanlar"].map(tuman => {
            if (tuman["soato"] == item["soato"]) {


              if (!dataObj.some(e => e["soato"] == item["soato"])) {
                dataObj.push({
                  nomi: tuman["nomi"],
                  soato: tuman["soato"],
                  mahallalar: [{
                    nomi: item["mahalla_nomi"],
                    soato: item["mahalla_soato"],
                  }]
                })
              } else {
                dataObj[dataObj.findIndex(t => t?.soato == tuman["soato"])]?.mahallalar.push({
                  nomi: item["mahalla_nomi"],
                  soato: item["mahalla_soato"],
                })
              }
            }
          })
        });
      })
    }


    console.log(dataObj)
    // document.write(JSON.stringify(dataObj))
  }, [items])
 */


  return (
    <div>
      <input type="file" onChange={(e) => {
        const file = e.target.files[0];
        readExcel(file);
      }} />

      <table class="table" border="1" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {items && Object.keys(items[0]).map((elem) => (
              <th scope="col">{elem}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items && items.map((elem) => (
            <tr>
              {Object.keys(elem).map(keyObj => (
                <td>{elem[keyObj]}</td>
              ))}
              {/* <td>{elem?.shipName}</td>
              <td><input type="text" value={elem?.freight} /></td> */
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default App