import { useState, useEffect } from "react";
import { TypeAnimation } from 'react-type-animation';

interface TypingEffectProps {
  text: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text }) => {
  return <TypeAnimation 
      sequence={[text]}
      speed={90}
    />;
};

export default TypingEffect;
