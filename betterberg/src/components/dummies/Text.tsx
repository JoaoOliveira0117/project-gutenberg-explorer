import React from "react";
import TextTooltip from "./TextTooltip";

type TextComponents = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'pre'

type Props = {
  text: string;
  length?: number;
  key?: string;
  className?: string;
  as?: TextComponents;
}

const TextComponent: React.FC<{ 
  as: TextComponents, 
  className?: string;
  key?: string;
  children: string | React.ReactNode
}> = (props) => {
  return React.createElement(props.as, props);
}

const Text: React.FC<Props> = ({ text, length, as, key, className }: Props) => {
  const formattedTitle = length && text.length > length ? text.slice(0, length - 3) + "..." : text;
  return (
    length && text.length > length ? 
      <TextTooltip key={key} text={
        <TextComponent as={as || 'p'} className={className}>
          {formattedTitle}
        </TextComponent>  
      } 
      content={text} />
    : 
      <TextComponent as={as || 'p'} key={key} className={className}>
        {text}
      </TextComponent>
  );
}

export default Text;