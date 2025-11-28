import { useEffect, useState } from 'react'

import Display from './Display/Display';
import Controls from './Controls/Controls';

import { KeyHandler } from './Core/KeyHandler';
import { DisplayString } from './Core/DisplayHandler'; 

import body from './assets/body.png'
import { ResetRegister, ResetRS } from './Core/Register';
import { ResetSelfState } from './Core/SelfState';


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
      setSymbolStr(DisplayString(Registers.X, SelfState));
    }else{
      setSymbolStr('');
    }
    console.log(Registers.X, SelfState);
  }, [PowerState, Registers, SelfState]);

  return (
    <main>
      <div className="body" style={{backgroundImage: `url(${body})`}}>
        <Display Str={SymbolStr} />
        <Controls SW={{PowerSwitch, DegRadSwitch}} ButtonHandler={ButtonHandler}/>
      </div>
      <p>{Registers.PrevOperation}</p>
      <div className='registers'>
        <table>
          <colgroup>
            <col className="register" />
            <col className="mantissa" />
            <col className="degree" />
            <col className="operation" />
          </colgroup>
          <tbody>
            <tr>
              <th>X</th>
              <th>{Registers.X.mantissa  ?? 0}</th>
              <th>{Registers.X.degree ?? 0}</th>
              <th>{Registers.X.operation}</th>
            </tr>
            <tr>
              <th>Y</th>
              <th>{Registers.Y.mantissa ?? 0}</th>
              <th>{Registers.Y.degree ?? 0}</th>
              <th>{Registers.Y.operation}</th>
            </tr>
            <tr>
              <th>A</th>
              <th>{Registers.A.mantissa ?? 0}</th>
              <th>{Registers.A.degree ?? 0}</th>
              <th>{Registers.A.operation}</th>
            </tr>
            <tr>
              <th>B</th>
              <th>{Registers.B.mantissa ?? 0}</th>
              <th>{Registers.B.degree ?? 0}</th>
              <th>{Registers.B.operation}</th>
            </tr>
          </tbody>
        </table>
      </div>
     
    </main>
  );
}

export default App
