
import { useState } from 'react';
import s1 from '../assets/s1.png';
import s2 from '../assets/s2.png';
import s3 from '../assets/s3.png';
import s4 from '../assets/s4.png';
import s5 from '../assets/s5.png';
import s6 from '../assets/s6.png';

import s37 from '../assets/s_37.png';
import s38 from '../assets/s_38.png';
import s39 from '../assets/s_39.png';
import s40 from '../assets/s_40.png';
import s41 from '../assets/s_41.png';
import s42 from '../assets/s_42.png';
import s43 from '../assets/s_43.png';
import s44 from '../assets/s_44.png';
import s45 from '../assets/s_45.png';
import s46 from '../assets/s_46.png';
import s47 from '../assets/s_47.png';
import s48 from '../assets/s_48.png';
import s49 from '../assets/s_49.png';

import styles from './InstructionView.module.css';

// const steps = [
//   { id: 's1', label: '1', src: s1 },
//   { id: 's2', label: '2', src: s2 },
//   { id: 's3', label: '3', src: s3 },
//   { id: 's4', label: '4', src: s4 },
//   { id: 's5', label: '5', src: s5 },
//   { id: 's6', label: '6', src: s6 },
// ];

const steps = [
  { id: 's37', label: '1', src: s37 },
  { id: 's38', label: '2', src: s38 },
  { id: 's39', label: '3', src: s39 },
  { id: 's40', label: '4', src: s40 },
  { id: 's41', label: '5', src: s41 },
  { id: 's42', label: '6', src: s42 },
  { id: 's43', label: '7', src: s43 },
  { id: 's44', label: '8', src: s44 },
  { id: 's45', label: '9', src: s45 },
  { id: 's46', label: '10', src: s46 },
  { id: 's47', label: '11', src: s47 },
  { id: 's48', label: '12', src: s48 },
  { id: 's49', label: '13', src: s49 },
];


const InstructionViewer = () => {
  const [currentStep, setCurrentStep] = useState(steps[0]?.id || null);
  const currentImage = steps.find(step => step.id === currentStep)?.src;

  return (
    <div className={styles.instructionViewer}>
      <div className={styles.instructionButtons}>
        {steps.map(step => (
          <button
            key={step.id}
            className={`${styles.instructionBtn} ${
              currentStep === step.id ? styles.active : ''
            }`}
            onClick={() => setCurrentStep(step.id)}
          >
            {step.label}
          </button>
        ))}
      </div>

      {currentImage && (
        <div className={styles.instructionPreview}>
          <img
            src={currentImage}
            alt={`Инструкция: шаг ${steps.find(s => s.id === currentStep)?.label}`}
          />
        </div>
      )}
    </div>
  );
};

export default InstructionViewer;