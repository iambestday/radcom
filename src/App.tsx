import { useState } from "react";

function App() {
  const [m, setM] = useState<number>(0);
  const [n, setN] = useState<number>(0);
  const [arrayValues, setArrayValues] = useState<number[][]>([]);
  const [error, setError] = useState<string>("");

  const createTable = () => {
    if (m > 3 && n > 3 && m % 2 !== 0 && n % 2 !== 0) {
      const newArrayValues: number[][] = [];
      for (let i = 0; i < m; i++) {
        newArrayValues.push(new Array(n).fill(0));
      }
      setArrayValues(newArrayValues);
      setError("")
    } else {
      setError("ابعاد آرایه باید فرد و بزرگتر از 3 باشد");
    }
  };

  const fillRandom = () => {
    if (m > 0 && n > 0) {
      const randomValues = [];
      for (let i = 0; i < m; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
          row.push(Math.floor(Math.random() * 100));
        }
        randomValues.push(row);
      }
      setArrayValues(randomValues);
      setError("مقادیر قابل تغییر می باشد")
    } else {
      alert("ابعاد آرایه باید بزرگتر از صفر باشد.");
    }
    console.log(arrayValues);
  };

  const sortMatrix = () => {
    const sortedRows = arrayValues.map((arr, index) => {
      if (index % 2 === 0) {
        // صعودی
        return arr.sort((a, b) => a - b);
      } else {
        // نزولی
        return arr.sort((a, b) => b - a);
      }
    });

    setArrayValues(sortedRows);
  };

  return (
    <div className="h-screen w-full flex items-center justify-between">
      <div className="h-screen w-3/6 flex flex-col justify-center py-12 px-40">
        <div className="h-auto mb-3  card bg-base-200 rounded-box place-items-center">
          <div className="flex my-3 mb-8">
            <div className="w-1/2 mr-2">
              <label className="block">ردیف (m):</label>
              <input
                type="number"
                id="m"
                value={m}
                onChange={(e) => setM(parseInt(e.target.value))}
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="w-1/2 ml-2">
              <label className="block">ستون (n):</label>
              <input
                type="number"
                id="n"
                value={n}
                onChange={(e) => setN(parseInt(e.target.value))}
                className="border rounded p-2 w-full"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between mb-8">
            <button
              onClick={createTable}
              className="bg-blue-500 text-white px-4 py-2 mr-1 rounded hover:bg-blue-600"
            >
              ایجاد جدول
            </button>
            {arrayValues.length > 0 && (
              <>
                <button
                  onClick={fillRandom}
                  className="bg-green-500 text-white px-4 py-2 mr-1 rounded hover:bg-green-600 "
                >
                  درج مقادیر تصادفی
                </button>
                <button
                  onClick={sortMatrix}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  مرتب سازی صعودی نزولی
                </button>
              </>
            )}
          </div>
        </div>
        {error !== "" && (
        <div role="alert" className=" z-10 alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{error}</span>
          <div>
            <button className="btn btn-sm btn-primary"  onClick={()=> setError("")} >OK</button>
          </div>
        </div>
)
}
      </div>

      <div className="bg-base-200 h-screen w-3/6 flex flex-col justify-center py-12 px-40">
        {arrayValues.length > 0 && (
          <div className="mb-8">
            <table className="table table-zebra ">
              <thead>
                <tr>
                  <th> </th>
                  {[...Array(n)].map((_, index) => (
                    <th className="border border-slate-600 text-center" key={index}>{index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {arrayValues.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <th className="border border-slate-600">{rowIndex + 1}</th>
                    {row.map((col, colIndex) => (
                      <td className="border border-slate-700" key={colIndex}>
                        <input
                          type="number"
                          value={col}
                          onChange={(e) => {
                            const newValue = parseInt(e.target.value);
                            const newArrayValues = [...arrayValues];
                            newArrayValues[rowIndex][colIndex] = isNaN(newValue)
                              ? 0
                              : newValue;
                            setArrayValues(newArrayValues);
                          }}
                          className=" bg-transparent w-full h-full text-center"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
