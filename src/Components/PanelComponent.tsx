import React, { useState } from 'react';
import styled from 'styled-components';


interface TitleComponentProps {
    index: number,
    title: string,
    done: boolean,
}
interface TextProps {
    isChecked: boolean;
}

const PanelComponent: React.FC<TitleComponentProps> = ({ index, title, done }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheck = () => {
        setIsChecked(!isChecked);
    };
    return (
        <Container key={index}>
            <Input onChange={handleCheck} type="checkbox" checked={done} readOnly />
            <Text isChecked={isChecked}>{title}</Text>
        </Container>
    );
};


const Text = styled.p<TextProps>`
font-size: 30px;
font-family:'Merriweather';
color: #333;
text-decoration: ${(props) => (props.isChecked ? 'line-through' : 'none')};
`;

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center; 
`;

const Input = styled.input`
width: 30px;
height: 30px;
color: #333;
margin-right: 18px;
`;

export default PanelComponent;
