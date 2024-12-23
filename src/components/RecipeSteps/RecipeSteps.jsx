import { useState } from 'react';
import styles from './RecipeSteps.module.css';
import stepsData from '../../data/steps.json';

export const RecipeSteps = () => {
  const [steps] = useState(stepsData);
  const [activeIndex, setActiveIndex] = useState(0);

  const isFirstStep = activeIndex === 0;
  const isLastStep = activeIndex === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      setActiveIndex(0);
    } else {
      setActiveIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const handleStepClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles.stepsContent}>
            {steps[activeIndex].content}
          </div>
          <ul className={styles.stepsList}>
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={`${styles.stepsItem} 
                  ${index <= activeIndex ? styles.done : ''} 
                  ${index === activeIndex ? styles.active : ''}`}
              >
                <button
                  className={styles.stepsItemButton}
                  onClick={() => handleStepClick(index)}
                >
                  {index + 1}
                </button>
                <span>{step.title}</span>
              </li>
            ))}
          </ul>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.button}
              onClick={handleBack}
              disabled={isFirstStep}
            >
              Назад
            </button>
            <button 
              className={styles.button} 
              onClick={handleNext}
            >
              {isLastStep ? 'Начать сначала' : 'Далее'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};