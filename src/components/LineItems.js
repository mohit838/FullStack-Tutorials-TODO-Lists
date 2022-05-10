import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const LineItems = (props) => {
    // console.log(props.item);
    const {item, handleChecked, handleDelete,} = props;

    return (
        <li className='item'>
            <input type="checkbox" 
                checked={item.checked}
                onClick={() => {handleChecked(item.id)}}
            />
            <label style={(item.checked) ? {textDecoration: "line-through"} : null}>
                {item.item}
            </label>
            <FaTrashAlt 
                role="button"
                tabIndex="0"
                onClick={() => handleDelete(item.id)}
                arial-label={`delete ${item.item}`}
            />

        </li>
    );
};

export default LineItems;