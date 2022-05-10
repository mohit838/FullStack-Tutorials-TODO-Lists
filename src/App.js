import { useEffect, useState } from 'react';
import './App.css';
import AddItem from './components/AddFrom';
import Footer from './components/Footer';
import Header from './components/Header';
import Lesson from './components/Lesson';
import SearchItems from './components/SearchItems';

function App() {

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState('');
  
  const [search, setSearch] = useState('');


  useEffect(() => {
    
  }, [])


  const localWebStorage = (listItems) => {
    setItems(listItems);
    localStorage.setItem('list', JSON.stringify(listItems));
  };

  const addItem = (item) => {
    const id = items.length ? (items[items.length - 1].id + 1) : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    localWebStorage(listItems);
  };

  const handleChecked = (id) => {
    const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
    localWebStorage(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    localWebStorage(listItems);
  }

  const handleSubmit = (e) => {
    if(!newItem) return;
    addItem(newItem);
    setNewItem('');
  }


  return (
    <div>
      <Header 
        title="Grocery Item List"
      ></Header>

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      ></AddItem>

      <SearchItems
        search={search}
        setSearch={setSearch}
      />

      <Lesson 
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleChecked={handleChecked}
        handleDelete={handleDelete}
      ></Lesson>
      
      <Footer
        length={items.length}
      ></Footer>
    </div>
  );
}

export default App;
