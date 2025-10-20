import { useEffect, useState } from 'react'

import Display from './Display/Display';
import Controls from './Controls/Controls';

import body from './assets/body.png'


function App() {
  const [PowerState, setPowerState] = useState(false);
  const [SymbolStr, setSymbolStr] = useState('');

  const [DisplayRegister, setDisplayRegister] = useState({
    str: '',
    mantissa: 0,
    overflow: false,
    digits: 1,
    hasDecimal: false,
    decimalPow: 1,
  });

  const PowerSwitch = {
    State: PowerState,
    Handler: () => {
      setPowerState(prev => !prev);
      if(!PowerState)
        setDisplayRegister({str: '', mantissa: 0, overflow: false, digits: 1, hasDecimal: false, decimalPow: 1,});
    },
  };

  const IsOverflow = (mantissa) => {
    const ms = String(mantissa);
    let len = ms.length;
    len = (ms.includes('-') ? len - 1 : len);
    len = (ms.includes('.') ? len - 1 : len);
    return (len >= 8);
  };

  const ButtonHandler = (key) =>{
    if(DisplayRegister.overflow === true)
      return;
    if('0123456789'.includes(key)){
      setDisplayRegister(prev => ({...prev,
        str: prev.str + key}));
    }else if(key === '/-/'){
      setDisplayRegister(prev => ({...prev, 
        str: ((prev.str === '' ? '' : prev.str.startsWith('-') ? prev.str.slice(1) : '-' + prev.str))}));
    }else if(key === '.'){
      setDisplayRegister(prev => ({...prev, 
        str: (prev.str.includes('.') ? prev.str : prev.str + '.')}))
    }
    setDisplayRegister(prev => ({...prev, 
      mantissa: Number(prev.str)}));
    setDisplayRegister(prev => ({...prev, 
      overflow: IsOverflow(prev.mantissa)}));
  };

  useEffect(() => {
    if(PowerState === true){
      setSymbolStr(((DisplayRegister.mantissa < 0) ? '' : ' ') + 
        String(DisplayRegister.mantissa) + 
        (String(DisplayRegister.mantissa).includes('.') ? '' : '.'));
    }else{
      setSymbolStr('');
    }
    console.log(DisplayRegister);
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
