import React, { useState, useEffect, useRef } from 'react';
import { Customer, CustomerBST, Transaction } from '../utils/BSTLogic'; 

const LoyaltyApp = () => {

  const [bst, setBst] = useState(null);
  const [rawData, setRawData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0); 
  
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loadingMsg, setLoadingMsg] = useState('Waiting for System...');

  const rowRefs = useRef({});

  useEffect(() => {
    const loadData = async () => {
      setLoadingMsg("CONNECTING...");
      try {
        const response = await fetch('/customers.csv');
        if (!response.ok) throw new Error("DB Error");
        const text = await response.text();
  
        setTimeout(() => processCSVInBatches(text), 100);
      } catch (err) {
        setError("DB Missing");
        setLoadingMsg("ERROR");
      }
    };
    loadData();
  }, []);

//   500 at a time since 20k data
  const processCSVInBatches = (text) => {
    setLoadingMsg("INITIALIZING...");
    
   
    const lines = text.split('\n');
    const totalLines = lines.length;
    
    const newBST = new CustomerBST();
    const tempRawData = [];
    
    let currentIndex = 1; 
    const BATCH_SIZE = 500; 

    const processBatch = () => {
      const endIndex = Math.min(currentIndex + BATCH_SIZE, totalLines);

   
      for (let i = currentIndex; i < endIndex; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        
        const data = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        const id = parseInt(data[0]);
        if (isNaN(id)) continue;

    //    pang save ng memory (di kaya ng ram ko)
        tempRawData.push({ 
          id: id, 
          age: data[1],
          product: data[4],
          status: data[7],
          price: data[9],
          fullData: data 
        });

        let customer = newBST.search(id);
        if (!customer) {
          customer = new Customer(id, parseInt(data[1]), data[2], data[3] === 'Yes');
          newBST.insert(customer);
        }
        customer.addTransaction(new Transaction(data));
      }

    //  progress bar
      const currentProgress = Math.round((endIndex / totalLines) * 100);
      setProgress(currentProgress);
      setLoadingMsg(`LOADING ${currentProgress}%`);

      currentIndex = endIndex;

      if (currentIndex < totalLines) {
      
        setTimeout(processBatch, 0);
      } else {
        
        setRawData(tempRawData);
        setBst(newBST);
        setIsLoaded(true);
        setLoadingMsg("ONLINE");
      }
    };

  
    setTimeout(processBatch, 0);
  };

  const handleSearch = () => {
    if (!bst) return;
    setResult(null);
    setError('');
    
    const id = parseInt(searchId);
    if (!id) {
      setError("Enter Number");
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
      setError(`ID ${id} not found.`);
    }
  };

  return (
    <section id="app" className="py-12 md:py-20 px-4 md:px-8 max-w-[1600px] mx-auto font-sans">
      
    
      <div className="mb-8 p-4 md:p-6 bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-gray-200 pb-4 mb-4">
          <div>
            <h2 className="text-3xl md:text-6xl font-black italic tracking-tighter text-blue-700">
              LOYALTY_TRACKER<span className="text-black">.EXE</span>
            </h2>
            <p className="font-mono text-[10px] md:text-sm text-gray-500 mt-2 tracking-wide break-words">
              BST ALGORITHM (O(log n)) | RECORDS: <span className="tabular-nums font-bold text-gray-700">{rawData.length.toLocaleString()}</span>
            </p>
          </div>
          
          <div className={`self-start md:self-auto px-3 py-1 md:px-4 md:py-2 font-bold font-mono text-xs md:text-sm tracking-wider rounded transition-colors duration-300 ${isLoaded ? 'bg-green-100 text-green-700 border-2 border-green-600' : 'bg-yellow-100 text-yellow-700 border-2 border-yellow-400'}`}>
            
             {isLoaded ? "STATUS: ONLINE" : `STATUS: ${loadingMsg}`}
          </div>
        </div>
        
      {/* loading */}
        {!isLoaded && (
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div 
                    className="h-full bg-blue-600 transition-all duration-75 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        )}

        <div className="bg-gray-50 p-3 md:p-4 rounded border border-gray-200 text-xs md:text-base leading-relaxed">
          <h4 className="font-black text-gray-800 mb-2 tracking-wide uppercase text-[10px] md:text-xs">HOW TO USE:</h4>
          <ol className="list-decimal list-inside space-y-1 text-gray-700 font-medium">
            <li>Find an ID in the <strong>DATABASE</strong> (below/right).</li>
            <li>Type ID into <strong>TERMINAL</strong> (e.g., <code className="bg-gray-200 px-1 rounded font-mono text-blue-600">1002</code>).</li>
            <li>Tap <strong>RUN</strong>.</li>
          </ol>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[800px]">
        
      
        <div className="card-neo flex flex-col h-[550px] lg:h-full overflow-hidden relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl bg-white">
          <div className="p-3 md:p-4 bg-black text-white flex justify-between items-center z-10 shrink-0">
            <h3 className="font-bold font-mono tracking-widest text-xs md:text-sm">USER_QUERY_TERMINAL</h3>
            <div className="flex gap-1.5 md:gap-2">
               <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full border border-gray-600"></div>
               <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-yellow-400 rounded-full border border-gray-600"></div>
               <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full border border-gray-600"></div>
            </div>
          </div>

          <div className="p-4 md:p-6 flex-1 overflow-y-auto bg-gray-50">
            <div className="flex gap-2 mb-6">
              <input 
                type="number" 
                className="flex-1 p-3 md:p-4 border-4 border-black font-mono text-lg md:text-2xl focus:outline-none focus:bg-white bg-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] placeholder:text-gray-300"
                placeholder="ID..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                className="btn-neo px-4 md:px-8 bg-blue-600 text-white font-black text-lg md:text-xl tracking-wider hover:bg-blue-700 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black"
              >
                RUN
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border-l-4 md:border-l-8 border-red-500 p-3 md:p-4 font-bold text-red-700 mb-6 flex items-center gap-2 text-sm md:text-base">
                <span>⚠</span> 
                <span className="font-mono">{error}</span>
              </div>
            )}

            {result ? (
              <div className="space-y-6 animate-fadeIn pb-4">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-white border-2 md:border-4 border-black p-3 md:p-4 shadow-sm">
                    <div className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1">CUSTOMER ID</div>
                    <div className="text-2xl md:text-4xl font-black text-slate-900 tabular-nums tracking-tight">#{result.customerId}</div>
                  </div>
                  <div className="bg-green-100 border-2 md:border-4 border-black p-3 md:p-4 shadow-sm">
                    <div className="text-[10px] font-black tracking-widest text-green-700 uppercase mb-1">TOTAL SPENT</div>
                    <div className="text-2xl md:text-4xl font-black text-green-900 tabular-nums tracking-tight">${result.rfm.monetary.toFixed(0)}</div>
                  </div>
                  <div className="bg-purple-100 border-2 md:border-4 border-black p-3 md:p-4 shadow-sm">
                    <div className="text-[10px] font-black tracking-widest text-purple-700 uppercase mb-1">FREQUENCY</div>
                    <div className="text-2xl md:text-4xl font-black text-purple-900 tabular-nums tracking-tight">{result.rfm.frequency} <span className="text-sm md:text-lg font-bold text-purple-600/70">Orders</span></div>
                  </div>
                  <div className="bg-yellow-100 border-2 md:border-4 border-black p-3 md:p-4 shadow-sm">
                    <div className="text-[10px] font-black tracking-widest text-yellow-700 uppercase mb-1">RECENCY</div>
                    <div className="text-2xl md:text-4xl font-black text-yellow-900 tabular-nums tracking-tight">{result.rfm.recency} <span className="text-sm md:text-lg font-bold text-yellow-600/70">Days</span></div>
                  </div>
                </div>

                <div className="bg-white border-2 border-black p-3 md:p-4 shadow-sm">
                  <h4 className="font-black border-b-2 border-gray-200 pb-2 mb-4 text-xs tracking-widest text-gray-500">HISTORY</h4>
                  <div className="space-y-2 font-mono text-xs md:text-sm max-h-48 overflow-y-auto pr-2">
                    {result.transactions.map((t, i) => (
                      <div key={i} className="flex justify-between items-center bg-gray-50 hover:bg-white p-2 md:p-3 rounded border border-gray-200 transition-colors">
                        <div>
                          <span className="font-bold block text-blue-900 text-xs md:text-sm">{t.productType}</span>
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

        
        <div className="card-neo flex flex-col h-[500px] lg:h-full overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl bg-white">
          <div className="p-3 md:p-4 bg-gray-200 border-b-4 border-black flex justify-between items-center z-10 shrink-0">
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
                 
                  {rawData.slice(0, 100).map((row) => (
                    <tr 
                      key={row.id} 
                      ref={(el) => (rowRefs.current[row.id] = el)}
                      className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                        result && result.customerId === row.id ? 'bg-yellow-100 border-y-2 border-black font-bold' : 'text-gray-600'
                      }`}
                    >
                      <td className="p-2 md:p-3 border-r border-gray-200 text-blue-700 tabular-nums">{row.id}</td>
                      <td className="p-2 md:p-3 border-r border-gray-200 truncate max-w-[100px] text-gray-900">{row.product}</td>
                      <td className="p-2 md:p-3 border-r border-gray-200 text-right tabular-nums text-gray-900">${parseFloat(row.price).toFixed(0)}</td>
                    </tr>
                  ))}
               
                  {rawData.length > 100 && (
                      <tr>
                          <td colSpan="3" className="p-4 text-center text-gray-400 italic">
                              ... {rawData.length - 100} more records hidden for performance ...
                          </td>
                      </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-gray-400 font-mono animate-pulse tracking-widest">
                  {loadingMsg}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyApp;