import React, { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddFrom = (props) => {
    const {newItem, setNewItem, handleSubmit} = props;
    const inputRef = useRef();
    return (
        <form className='addForm' onSubmit={(e) => handleSubmit(e.preventDefault())}>
            <label htmlFor="addItems">Add Item</label>
            <input 
            autoFocus 
            ref={inputRef}
            type="text" 
            id="addItem"
            placeholder='Add Item'
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            required
            />

            <button 
            type='submit' 
            arial-label='Add Item'
            onClick={() => inputRef.current.focus()}
            >
                <FaPlus/>
            </button>
        </form>
    );
};

export default AddFrom;