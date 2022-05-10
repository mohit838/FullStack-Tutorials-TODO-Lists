import React from 'react';
import ItemLists from './ItemLists';

;

const Lesson = (props) => {
    // console.log(props);
    const {items, handleChecked, handleDelete} = props;

    return (
        <section className='items-section'>
            { items.length ? (
                <ItemLists
                    items={items}
                    handleChecked={handleChecked}
                    handleDelete={handleDelete}
                ></ItemLists>
            ) : (
                <p style={{margin: "2.5rem"}}> List items: {items.length} </p>
            ) 
            }
        </section>
    );
};

export default Lesson;