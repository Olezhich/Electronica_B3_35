import { useState } from 'react'
import LightBox from './LightBox';
import Symbol from './Display/Symbol/Symbol';
import Display from './Display/Display';

import body from './assets/body.png'

function App() {
  const [SymbolStr, setSymbolStr] = useState('');

  return (
    <main>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%" primitiveUnits="objectBoundingBox">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.05" result="blur"/>
            <feFlood floodColor="var(--display-on-col)" result="color"/>
            <feComposite in="color" in2="blur" operator="in" result="glow"/>
            <feComposite in="SourceGraphic" in2="glow" operator="over"/>
          </filter>
        </defs>
      </svg>
      <div className="body" style={{backgroundImage: `url(${body})`}}>
        <Display Str={SymbolStr} />
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
