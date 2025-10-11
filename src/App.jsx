import { useState } from 'react'

import Display from './Display/Display';
import Controls from './Controls/Controls';

import body from './assets/body.png'


function App() {
  const [SymbolStr, setSymbolStr] = useState('');

  return (
    <main>
      <div className="body" style={{backgroundImage: `url(${body})`}}>
        <Display Str={SymbolStr} />
        <Controls />
      </div>
      
      <div className="buttons">
        <input
          type="text"
          value={SymbolStr}
          onChange={(e) => setSymbolStr(e.target.value)}
          placeholder=""
        />
      </div>
     
    </main>
  );
}

export default App
