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
  const [deviceMode, setDeviceMode] = useState('DETECTING...');

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
    setLoadingMsg("ANALYZING DEVICE...");
    
   
    const isMobile = window.innerWidth < 768;
    const modeName = isMobile ? "MOBILE (10k LIMIT)" : "DESKTOP (FULL DATA)";
    setDeviceMode(modeName);

    setLoadingMsg("INDEXING RECORDS...");
    
    const lines = text.split('\n');
    const newBST = new CustomerBST();
    const parsedData = [];

   
    const maxRows = isMobile ? 10000 : lines.length;

    for (let i = 1; i < lines.length; i++) {
      
      if (parsedData.length >= maxRows) break;

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
      
      if (rowRefs.current[id]) {
        rowRefs.current[id].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      
      if (deviceMode.includes("MOBILE") && id > 0) {
         setError(`ID ${id} not found (Might be outside 10k mobile limit).`);
      } else {
         setError(`ID ${id} not found.`);
      }
    }
  };

  return (
 
    <section id="app" className="py-12 px-4 md:py-20 md:px-8 max-w-[1600px] mx-auto font-sans">

      <div className="mb-8 p-4 md:p-6 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-gray-200 pb-4 mb-4">
          <div>
            <h2 className="text-3xl md:text-6xl font-black italic tracking-tighter text-blue-700">
              LOYALTY_TRACKER<span className="text-black">.EXE</span>
            </h2>
            <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2">
                <p className="font-mono text-[10px] md:text-sm text-gray-500 tracking-wide">
                  RECORDS: <span className="tabular-nums font-bold text-gray-700">{rawData.length.toLocaleString()}</span>
                </p>
                {/* device mode */}
                <span className="text-[10px] font-bold bg-gray-200 px-2 py-0.5 rounded text-gray-600 w-fit">
                    {deviceMode}
                </span>
            </div>
          </div>
          <div className={`px-4 py-2 font-bold font-mono text-xs md:text-sm tracking-wider rounded ${isLoaded ? 'bg-green-100 text-green-700 border-2 border-green-600' : 'bg-yellow-100 text-yellow-700 animate-pulse'}`}>
            STATUS: {loadingMsg}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded border border-gray-200 text-xs md:text-base leading-relaxed">
          <h4 className="font-black text-gray-800 mb-2 tracking-wide uppercase text-[10px] md:text-xs">HOW TO USE:</h4>
          <ol className="list-decimal list-inside space-y-1 text-gray-700 font-medium">
            <li>Check the <strong>RAW DATABASE</strong> on the right.</li>
            <li>Type the ID into the <strong>PROCESSED OUTPUT</strong> input field.</li>
            <li>Click <strong>RUN</strong> to calculate RFM metrics.</li>
          </ol>
        </div>
      </div>

    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[800px]">
        
      
        <div className="card-neo flex flex-col h-[500px] lg:h-full overflow-hidden relative border-4 border-black rounded-xl">
          <div className="p-4 bg-black text-white flex justify-between items-center z-10">
            <h3 className="font-bold font-mono tracking-widest text-xs md:text-sm">USER_QUERY_TERMINAL</h3>
            <div className="flex gap-2">
               <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full border border-gray-600"></div>
               <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-yellow-400 rounded-full border border-gray-600"></div>
               <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full border border-gray-600"></div>
            </div>
          </div>

          <div className="p-4 md:p-6 flex-1 overflow-y-auto bg-gray-50">
            <div className="flex gap-2 mb-6">
              <input 
                type="number" 
                className="flex-1 p-3 md:p-4 border-4 border-black font-mono text-lg md:text-2xl focus:outline-none focus:bg-white bg-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] placeholder:text-gray-300"
                placeholder="ENTER ID..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                className="btn-neo px-4 md:px-8 bg-blue-600 text-white font-black text-lg md:text-xl tracking-wider hover:bg-blue-700 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                RUN
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border-l-8 border-red-500 p-4 font-bold text-red-700 mb-6 flex items-center gap-2">
                <span className="text-2xl">⚠</span> 
                <span className="font-mono text-xs md:text-base">{error}</span>
              </div>
            )}

            {result ? (
              <div className="space-y-6 animate-fadeIn pb-4">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-white border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    <div className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1">CUSTOMER ID</div>
                    <div className="text-2xl md:text-4xl font-black text-slate-900 tabular-nums tracking-tight">#{result.customerId}</div>
                  </div>
                  <div className="bg-green-100 border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    <div className="text-[10px] font-black tracking-widest text-green-700 uppercase mb-1">TOTAL SPENT</div>
                    <div className="text-2xl md:text-4xl font-black text-green-900 tabular-nums tracking-tight">${result.rfm.monetary.toFixed(0)}</div>
                  </div>
                  <div className="bg-purple-100 border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    <div className="text-[10px] font-black tracking-widest text-purple-700 uppercase mb-1">FREQUENCY</div>
                    <div className="text-2xl md:text-4xl font-black text-purple-900 tabular-nums tracking-tight">{result.rfm.frequency} <span className="text-xs md:text-lg font-bold text-purple-600/70">Orders</span></div>
                  </div>
                  <div className="bg-yellow-100 border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    <div className="text-[10px] font-black tracking-widest text-yellow-700 uppercase mb-1">RECENCY</div>
                    <div className="text-2xl md:text-4xl font-black text-yellow-900 tabular-nums tracking-tight">{result.rfm.recency} <span className="text-xs md:text-lg font-bold text-yellow-600/70">Days</span></div>
                  </div>
                </div>

                <div className="bg-white border-2 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
                  <h4 className="font-black border-b-2 border-gray-200 pb-2 mb-4 text-xs tracking-widest text-gray-500">TRANSACTION HISTORY</h4>
                  <div className="space-y-2 font-mono text-xs md:text-sm max-h-48 overflow-y-auto pr-2">
                    {result.transactions.map((t, i) => (
                      <div key={i} className="flex justify-between items-center bg-gray-50 hover:bg-white p-2 md:p-3 rounded border border-gray-200 transition-colors">
                        <div>
                          <span className="font-bold block text-blue-900">{t.productType}</span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-wide">{t.purchaseDate.toLocaleDateString()}</span>
                        </div>
                        <div className="text-right">
                          <span className="block font-bold tabular-nums text-sm md:text-base">${t.totalPrice}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-32 md:h-48 flex flex-col items-center justify-center text-gray-300 font-mono text-center select-none">
                <div className="text-4xl md:text-6xl mb-4 opacity-20">?</div>
                <div className="tracking-widest text-xs md:text-sm font-bold">AWAITING INPUT...</div>
              </div>
            )}
          </div>
        </div>

       
        <div className="card-neo flex flex-col h-[500px] lg:h-full overflow-hidden border-4 border-black rounded-xl">
          <div className="p-4 bg-gray-200 border-b-4 border-black flex justify-between items-center z-10">
            <h3 className="font-bold font-mono tracking-widest text-xs md:text-sm text-gray-700">RAW_DATABASE</h3>
            <span className="text-[10px] font-black tracking-widest bg-white px-2 py-1 border border-black rounded text-gray-500">READ ONLY</span>
          </div>

          <div className="flex-1 overflow-auto bg-white relative">
            {isLoaded ? (
              <table className="w-full text-left border-collapse font-mono text-xs md:text-sm">
                <thead className="bg-gray-100 sticky top-0 border-b-2 border-black shadow-sm z-10">
                  <tr>
                    <th className="p-2 md:p-3 border-r border-gray-300 w-16 md:w-20 tracking-wider text-gray-600">ID</th>
                    <th className="p-2 md:p-3 border-r border-gray-300 tracking-wider text-gray-600">PRODUCT</th>
                    <th className="p-2 md:p-3 border-r border-gray-300 text-right tracking-wider text-gray-600">PRICE</th>
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
                      <td className="p-2 md:p-3 border-r border-gray-200 text-blue-700 tabular-nums">{row.id}</td>
                      <td className="p-2 md:p-3 border-r border-gray-200 truncate max-w-[100px] text-gray-900">{row.rawLine[4]}</td>
                      <td className="p-2 md:p-3 border-r border-gray-200 text-right tabular-nums text-gray-900">${parseFloat(row.rawLine[9]).toFixed(0)}</td>
                    </tr>
                  ))}
            
                  {deviceMode.includes("MOBILE") && (
                     <tr>
                        <td colSpan="3" className="p-4 text-center text-gray-400 italic bg-gray-50">
                           ... Limiting display to 10,000 records for Mobile Performance ...
                        </td>
                     </tr>
                  )}
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