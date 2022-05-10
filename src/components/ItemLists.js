import React from 'react';
import LineItems from './LineItems';


const ItemLists = (props) => {
    const {items, handleChecked, handleDelete} = props;
    // console.log(props);
    return (
        <ul>
                {
                    items.map((item) => <LineItems
                        key={item.id}
                        item={item}
                        handleChecked={handleChecked}
                        handleDelete={handleDelete}
                    ></LineItems>)
                }
            </ul>
    );
};

export default ItemLists;