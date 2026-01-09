import React, { useState, useEffect, useRef } from 'react';
import { Customer, CustomerBST, Transaction } from '../utils/BSTLogic'; 

const LoyaltyApp = () => {

  const [bst, setBst] = useState(null);
  const [rawData, setRawData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loadingMsg, setLoadingMsg] = useState('Waiting for System...');

  const rowRefs = useRef({});

  useEffect(() => {
    const loadData = async () => {
      setLoadingMsg("CONNECTING TO DATABASE...");
      try {
        const response = await fetch('/customers.csv');
        if (!response.ok) throw new Error("Database file missing");
        const text = await response.text();
        setTimeout(() => processCSV(text), 100);
      } catch (err) {
        setError(err.message);
      }
    };
    loadData();
  }, []);

  const processCSV = (text) => {
    setLoadingMsg("INDEXING RECORDS...");
    const lines = text.split('\n');
    const newBST = new CustomerBST();
    const parsedData = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const data = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      const id = parseInt(data[0]);
      if (isNaN(id)) continue;

      parsedData.push({ id: id, rawLine: data });

      let customer = newBST.search(id);
      if (!customer) {
        customer = new Customer(id, parseInt(data[1]), data[2], data[3] === 'Yes');
        newBST.insert(customer);
      }
      customer.addTransaction(new Transaction(data));
    }

    setRawData(parsedData);
    setBst(newBST);
    setIsLoaded(true);
    setLoadingMsg("SYSTEM ONLINE");
  };

  const handleSearch = () => {
    if (!bst) return;
    setResult(null);
    setError('');
    
    const id = parseInt(searchId);
    if (!id) {
      setError("Please enter a numeric ID.");
      return;
    }

    const customer = bst.search(id);
    
    if (customer) {
      customer.calculateRFM();
      setResult(customer);
      
    // anim (right table)
      if (rowRefs.current[id]) {
        rowRefs.current[id].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setError(`ID ${id} not found.`);
    }
  };

  return (
    <section id="app" className="py-16 px-4 md:px-8 max-w-[1600px] mx-auto font-sans">
      
     {/* header/instruc */}
      <div className="mb-8 p-6 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-gray-200 pb-4 mb-4">
          <div>
            {/* IMPROVED FONT: Tighter tracking for impactful headline */}
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-blue-700">
              LOYALTY_TRACKER<span className="text-black">.EXE</span>
            </h2>
            <p className="font-mono text-xs md:text-sm text-gray-500 mt-2 tracking-wide">
              ALGORITHM: BINARY SEARCH TREE (O(log n)) | RECORDS: <span className="tabular-nums font-bold text-gray-700">{rawData.length.toLocaleString()}</span>
            </p>
          </div>
          <div className={`px-4 py-2 font-bold font-mono text-sm tracking-wider rounded ${isLoaded ? 'bg-green-100 text-green-700 border-2 border-green-600' : 'bg-yellow-100 text-yellow-700 animate-pulse'}`}>
            STATUS: {loadingMsg}
          </div>
        </div>

     {/* instruc */}
        <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm md:text-base leading-relaxed">
          <h4 className="font-black text-gray-800 mb-2 tracking-wide uppercase text-xs">HOW TO USE:</h4>
          <ol className="list-decimal list-inside space-y-1 text-gray-700 font-medium">
            <li>Check the <strong>RAW DATABASE</strong> on the right to pick a Customer ID (e.g., <code className="bg-gray-200 px-1 rounded font-mono text-blue-600">1002</code>).</li>
            <li>Type the ID into the <strong>PROCESSED OUTPUT</strong> input field on the left.</li>
            <li>Click <strong>RUN</strong> to calculate RFM (Recency, Frequency, Monetary) metrics instantly.</li>
          </ol>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[800px]">
        
       {/* left content */}
        <div className="card-neo flex flex-col h-full overflow-hidden relative">
          <div className="p-4 bg-black text-white flex justify-between items-center z-10">
            {/* IMPROVED FONT: Monospaced header with wide tracking */}
            <h3 className="font-bold font-mono tracking-widest text-sm">USER_QUERY_TERMINAL</h3>
            <div className="flex gap-2">
               <div className="w-3 h-3 bg-red-500 rounded-full border border-gray-600"></div>
               <div className="w-3 h-3 bg-yellow-400 rounded-full border border-gray-600"></div>
               <div className="w-3 h-3 bg-green-500 rounded-full border border-gray-600"></div>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto bg-gray-50">
            <div className="flex gap-2 mb-6">
              <input 
                type="number" 
                className="flex-1 p-4 border-4 border-black font-mono text-xl md:text-2xl focus:outline-none focus:bg-white bg-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] placeholder:text-gray-300"
                placeholder="ENTER ID..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                className="btn-neo px-8 bg-blue-600 text-white font-black text-xl tracking-wider hover:bg-blue-700 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                RUN
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border-l-8 border-red-500 p-4 font-bold text-red-700 mb-6 flex items-center gap-2">
                <span className="text-2xl">⚠</span> 
                <span className="font-mono">{error}</span>
              </div>
            )}

            {result ? (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-2 gap-4">
                  {/* ID BOX */}
                  <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    <div className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1">CUSTOMER ID</div>
                    <div className="text-3xl md:text-4xl font-black text-slate-900 tabular-nums tracking-tight">#{result.customerId}</div>
                  </div>
                  {/* SPENT BOX */}
                  <div className="bg-green-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    <div className="text-[10px] font-black tracking-widest text-green-700 uppercase mb-1">TOTAL SPENT</div>
                    <div className="text-3xl md:text-4xl font-black text-green-900 tabular-nums tracking-tight">${result.rfm.monetary.toFixed(2)}</div>
                  </div>
                  {/* FREQUENCY BOX */}
                  <div className="bg-purple-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    <div className="text-[10px] font-black tracking-widest text-purple-700 uppercase mb-1">FREQUENCY</div>
                    <div className="text-3xl md:text-4xl font-black text-purple-900 tabular-nums tracking-tight">{result.rfm.frequency} <span className="text-lg font-bold text-purple-600/70">Orders</span></div>
                  </div>
                  {/* RECENCY BOX */}
                  <div className="bg-yellow-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    <div className="text-[10px] font-black tracking-widest text-yellow-700 uppercase mb-1">RECENCY</div>
                    <div className="text-3xl md:text-4xl font-black text-yellow-900 tabular-nums tracking-tight">{result.rfm.recency} <span className="text-lg font-bold text-yellow-600/70">Days</span></div>
                  </div>
                </div>

                <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
                  <h4 className="font-black border-b-2 border-gray-200 pb-2 mb-4 text-xs tracking-widest text-gray-500">TRANSACTION HISTORY</h4>
                  <div className="space-y-2 font-mono text-xs md:text-sm max-h-48 overflow-y-auto pr-2">
                    {result.transactions.map((t, i) => (
                      <div key={i} className="flex justify-between items-center bg-gray-50 hover:bg-white p-3 rounded border border-gray-200 transition-colors">
                        <div>
                          <span className="font-bold block text-blue-900">{t.productType}</span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-wide">{t.purchaseDate.toLocaleDateString()}</span>
                        </div>
                        <div className="text-right">
                          <span className="block font-bold tabular-nums text-base">${t.totalPrice}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wide ${t.orderStatus === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {t.orderStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-gray-300 font-mono text-center select-none">
                <div className="text-6xl mb-4 opacity-20">?</div>
                <div className="tracking-widest text-sm font-bold">AWAITING INPUT...</div>
              </div>
            )}
          </div>
        </div>

  {/* raw data tabl */}
        <div className="card-neo flex flex-col h-full overflow-hidden">
          <div className="p-4 bg-gray-200 border-b-4 border-black flex justify-between items-center z-10">
            <h3 className="font-bold font-mono tracking-widest text-sm text-gray-700">RAW_DATABASE_VIEWER</h3>
            <span className="text-[10px] font-black tracking-widest bg-white px-2 py-1 border border-black rounded text-gray-500">READ ONLY</span>
          </div>

          <div className="flex-1 overflow-auto bg-white relative">
            {isLoaded ? (
              <table className="w-full text-left border-collapse font-mono text-xs md:text-sm">
                <thead className="bg-gray-100 sticky top-0 border-b-2 border-black shadow-sm z-10">
                  <tr>
                    <th className="p-3 border-r border-gray-300 w-20 tracking-wider text-gray-600">ID</th>
                    <th className="p-3 border-r border-gray-300 w-16 tracking-wider text-gray-600">AGE</th>
                    <th className="p-3 border-r border-gray-300 tracking-wider text-gray-600">PRODUCT</th>
                    <th className="p-3 border-r border-gray-300 text-right tracking-wider text-gray-600">PRICE</th>
                    <th className="p-3 tracking-wider text-gray-600">STATUS</th>
                  </tr>
                </thead>
         
                <tbody style={{ contentVisibility: 'auto', containIntrinsicSize: '5000px' }}>
                  {rawData.map((row) => (
                    <tr 
                      key={row.id} 
                      ref={(el) => (rowRefs.current[row.id] = el)}
                      className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                        result && result.customerId === row.id ? 'bg-yellow-100 border-y-2 border-black font-bold' : 'text-gray-600'
                      }`}
                    >
                      <td className="p-3 border-r border-gray-200 text-blue-700 tabular-nums">{row.id}</td>
                      <td className="p-3 border-r border-gray-200 tabular-nums">{row.rawLine[1]}</td>
                      <td className="p-3 border-r border-gray-200 truncate max-w-[100px] text-gray-900">{row.rawLine[4]}</td>
                      <td className="p-3 border-r border-gray-200 text-right tabular-nums text-gray-900">${parseFloat(row.rawLine[9]).toFixed(0)}</td>
                      <td className="p-3">
                          <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wide rounded ${row.rawLine[7] === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                           {row.rawLine[7].substring(0,4)}
                          </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-gray-400 font-mono animate-pulse tracking-widest">INITIALIZING DATABASE...</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyApp;