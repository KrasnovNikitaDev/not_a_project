import React, {useState} from 'react';
import { Reorder } from 'framer-motion';


let list = [
    'NIKITA',
    'KATYA',
    "MIHA"
]

export const LIST = () => {
    const [state, setState] = useState(list)


    return <div>
        <Reorder.Group axis='y' onReorder={setState} values={state}>
        {
            state.map(item => (
                <Reorder.Item value={item} key={item} style={{background:"red"}}>
                    <h2>{item}</h2>
                </Reorder.Item>
            ))
        }
        </Reorder.Group>
    </div>
}
