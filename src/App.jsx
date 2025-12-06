import { useEffect, useState } from 'react'

import Display from './Display/Display';
import Controls from './Controls/Controls';

import { KeyHandler } from './Core/KeyHandler';
import { DisplayString } from './Core/DisplayHandler'; 

import body from './assets/body.png'
import { ResetRegister, ResetRS } from './Core/Register';
import { ResetSelfState } from './Core/SelfState';
import RegistersTable from './RegTable';
import InstructionViewer from './Instruction/InstructionView';


function App() {
  const [PowerState, setPowerState] = useState(false);
  const [SymbolStr, setSymbolStr] = useState('');

  const [Registers, setRegisters] = useState(ResetRS());

  const [SelfState, setSelfState] = useState(ResetSelfState());

  const PowerSwitch = {
    State: PowerState,
    Handler: () => {
      setPowerState(prev => !prev);
      if(!PowerState)
        setRegisters(ResetRS());
    },
  };

  const DegRadSwitch = {
    State: SelfState.RadianMode,
    Handler: () => {
      setSelfState(prev => ({...prev, RadianMode: !prev.RadianMode}));
    }
  }

  const ButtonHandler = (key) =>{
    let currentState;
    setRegisters(prev => {
      const result = KeyHandler({ prev, key, SelfState, PowerState});
      currentState = result.state;
      return result.register ?? prev;
    });
    setSelfState(prev => {
      return currentState ?? prev;
    });
  };

  useEffect(() => {
    if(PowerState === true){
      setSymbolStr(DisplayString(Registers.X, Registers.M, SelfState));
    }else{
      setSymbolStr('');
    }
    console.log(Registers.X, SelfState);
  }, [PowerState, Registers, SelfState]);

  return (
    <main>
      <header>
        <h1>Эмулятор калькулятора Электроника Б3-35</h1>
      </header>
      <div className="body" style={{backgroundImage: `url(${body})`}}>
        <Display Str={SymbolStr} />
        <Controls SW={{PowerSwitch, DegRadSwitch}} ButtonHandler={ButtonHandler}/>
      </div>
      <div className='meta'>
        <RegistersTable Registers={Registers}/>     
        <InstructionViewer />
        <div data-testid="display">{SymbolStr}</div>
      </div>
    </main>
  );
}

export default App