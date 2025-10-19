import { useEffect, useState } from 'react'

import Display from './Display/Display';
import Controls from './Controls/Controls';

import body from './assets/body.png'


function App() {
  const [PowerState, setPowerState] = useState(false);
  const [SymbolStr, setSymbolStr] = useState('');

  const [DisplayRegister, setDisplayRegister] = useState({
    mantissa: 0,
    digits: 1,
    hasDecimal: false,
    decimalPow: 1,
  });

  const PowerSwitch = {
    State: PowerState,
    Handler: () => {
      setPowerState(prev => !prev);
      if(!PowerState)
        setDisplayRegister({mantissa: 0, digits: 1, hasDecimal: false, decimalPow: 1,});
    },
  };

  const ButtonHandler = (key) =>{
    if(typeof key === 'number' && !isNaN(key)){
      setDisplayRegister(prev => ({...prev, mantissa: prev.mantissa * 10 + key}));
      console.log(DisplayRegister);
    }
  };

  useEffect(() => {
    if(PowerState === true){
      setSymbolStr(' ' + String(DisplayRegister.mantissa) + (DisplayRegister.hasDecimal? '' : '.'));
    }else{
      setSymbolStr('');
    }
  }, [PowerState, DisplayRegister]);

  return (
    <main>
      <div className="body" style={{backgroundImage: `url(${body})`}}>
        <Display Str={SymbolStr} />
        <Controls PowerSwitch={PowerSwitch} ButtonHandler={ButtonHandler}/>
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
