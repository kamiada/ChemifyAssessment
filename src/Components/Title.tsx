import React from 'react';
import styled from 'styled-components';

interface TitleComponentProps {
  font?: string;
  size?: string;
  color?: string;
}

// I added here extend for the TitleComponentProps as otherwise I was getting errors
interface TitleProps extends TitleComponentProps {
  text: string;
}

// The component is easily reusable as we can modify its size, text, etc
const Title: React.FC<TitleProps> = ({ text, size, font, color }) => {
  return <TitleTag size={size} font={font} color={color}>{text}</TitleTag>;
};

/// I downloaded from Google Fonts Dancing Script to make it a bit prettier
const TitleTag = styled.h1<TitleComponentProps>`
  font-size: ${(props) => props.size || '24px'};
  font-family: ${(props) => props.font || 'Dancing Script, cursive'};
  color:  ${(props) => props.color || '#333'};
`;

export default Title;