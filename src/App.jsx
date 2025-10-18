import { useEffect, useState } from 'react'

import Display from './Display/Display';
import Controls from './Controls/Controls';

import body from './assets/body.png'


function App() {
  const [PowerState, setPowerState] = useState(false);
  const [SymbolStr, setSymbolStr] = useState('');

  const PowerSwitch = {
    State: PowerState,
    Handler: () => setPowerState(prev => !prev),
  };

  useEffect(() => {
    if(PowerState === true)
      setSymbolStr(' 0.');
    else
      setSymbolStr('');
  },[PowerState]);

  return (
    <main>
      <div className="body" style={{backgroundImage: `url(${body})`}}>
        <Display Str={SymbolStr} />
        <Controls PowerSwitch={PowerSwitch}/>
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
