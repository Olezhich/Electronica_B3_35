import { useEffect, useState } from 'react'

import Display from './Display/Display';
import Controls from './Controls/Controls';

import { KeyHandler } from './Core/KeyHandler';
import { DisplayString } from './Core/DisplayHandler'; 

import body from './assets/body.png'
import { ResetRegister } from './Core/Register';
import { ResetSelfState } from './Core/SelfState';


function App() {
  const [PowerState, setPowerState] = useState(false);
  const [SymbolStr, setSymbolStr] = useState('');

  const [DisplayRegister, setDisplayRegister] = useState(ResetRegister());

  const [SelfState, setSelfState] = useState(ResetSelfState());

  const PowerSwitch = {
    State: PowerState,
    Handler: () => {
      setPowerState(prev => !prev);
      if(!PowerState)
        setDisplayRegister(ResetRegister());
    },
  };

  const ButtonHandler = (key) =>{
    let currentState;
    setDisplayRegister(prev => {
      const result = KeyHandler({ prev, key, SelfState});
      currentState = result.state;
      return result.register ?? prev;
    });
    setSelfState(prev => {
      return currentState ?? prev;
    });
  };

  useEffect(() => {
    if(PowerState === true){
      setSymbolStr(DisplayString(DisplayRegister));
    }else{
      setSymbolStr('');
    }
    console.log(DisplayRegister, SelfState);
  }, [PowerState, DisplayRegister, SelfState]);

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
