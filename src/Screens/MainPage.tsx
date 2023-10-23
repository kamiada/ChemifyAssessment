import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from '../Components/Title';
import PanelComponent from '../Components/PanelComponent';

interface TaskProps {
    done: boolean,
    id: string
    title: string,
}
interface ApiProps {
    data: TaskProps[];
}

export const MainPage: React.FC = () => {
    const [todos, setToDos] = useState<TaskProps[]>([]);
    const [newTask, setNewTask] = useState('');
    //my refresh function somehow failed to work - it should change its value each time user post
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/todos');
                if (response.ok) {
                    const result: ApiProps = await response.json();
                    setToDos(result.data);
                } else {
                    console.error('Couldnt fetch data. Please check if the API is running. In order to do so run yarn dev inside api folder');
                }
            }
            catch (error) {
                console.log('There seems to be an issue:', error)
            }
        }
        fetchData();
    }, [refresh])

    const getInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);
    };

    const postToDo = () => {
        fetch('http://localhost:8080/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTask }),
        }).then((response) => response.json().then(() => setRefresh(true))
        ).catch((error) => {
            console.error('Error:', error);
        });
        setRefresh(true);
    }
    return (
        <div>
            <Title size='60px' text="To-Do List" />
            {todos.map((task, index) => (
                <PanelComponent index={index} title={task.title} done={task.done} />
            ))}
            <Input
                type="text"
                placeholder="Add task"
                value={newTask}
                onChange={getInput}
            />
            <Button onClick={postToDo}>Post Task</Button>
        </div>
    )
}

/// Due to time & the fact that I have not thought well some pieces of the app
/// I decided to stylize MainPage instead of creating new component

const Input = styled.input`
height: 35px;
width: 300px;
color: #333;
margin-right: 18px;
font-family: 'Dancing Script';
font-size: 30px;
`;

const Button = styled.button`
font-family: 'Dancing Script';
background-color: transparent;
color: black;
cursor: pointer;
transition: background-color 0.2s, color 0.2s;
font-size: 16px;
outline: none;
text-decoration: none;
border: none;
&:hover {
    background-color: black;
    color: white;
}
font-size: 30px;
`;