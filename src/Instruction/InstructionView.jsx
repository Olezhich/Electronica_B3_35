// InstructionViewer.jsx
import { useState } from 'react';
import s1 from '../assets/s1.png';
import s2 from '../assets/s2.png';
import s3 from '../assets/s3.png';
import s4 from '../assets/s4.png';
import s5 from '../assets/s5.png';

import styles from './InstructionView.module.css';

const steps = [
  { id: 's1', label: '1', src: s1 },
  { id: 's2', label: '2', src: s2 },
  { id: 's3', label: '3', src: s3 },
  { id: 's4', label: '4', src: s4 },
  { id: 's5', label: '5', src: s5 },
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