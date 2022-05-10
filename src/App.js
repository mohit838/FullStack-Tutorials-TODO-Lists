import { useEffect, useState } from 'react';
import './App.css';
import AddItem from './components/AddFrom';
import apiRequest from './components/apiRequest';
import Footer from './components/Footer';
import Header from './components/Header';
import Lesson from './components/Lesson';
import SearchItems from './components/SearchItems';

function App() {
  const API_URL = 'http://localhost:4000/items';

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState('');
  
  const [search, setSearch] = useState('');

  const [fetchError, setFetchError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchItem = async () => {
      try{
        const response = await fetch(API_URL);

        if(!response.ok) throw Error("Didn't Recieved expected Data!");

        const listItem = await response.json();
        // console.log(listItem);
        setItems(listItem);
        setFetchError(null);
      }
      catch(err){
        // console.log(err.message)
        setFetchError(err.message);
      }
      finally{
        setIsLoading(false);
      }
    }

    // This is set for simulation not place in realworld code
    setTimeout(() => {
      fetchItem();
    }, 2000)

    
  }, [])


  const localWebStorage = (listItems) => {
    setItems(listItems);
    localStorage.setItem('list', JSON.stringify(listItems));
  };

  const addItem = async (item) => {
    const id = items.length ? (items[items.length - 1].id + 1) : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    localWebStorage(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }

  const handleChecked = async (id) => {
    const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
    localWebStorage(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    localWebStorage(listItems);
    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
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
      />

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />

      <SearchItems
        search={search}
        setSearch={setSearch}
      />

      <main>
        {isLoading && <p 
        style={{
          textAlign:'center',
          backgroundColor: 'tomato',
          width: '50%',
          margin: "15px auto",
          fontSize: '25px',
          fontWeight: 'bold',
          color: 'white',
          borderRadius: '10px'
          }}>Loading Items.....</p>}
        {fetchError && <p 
        style={{
          textAlign:'center',
          backgroundColor: 'tomato',
          width: '50%',
          margin: "15px auto",
          fontSize: '25px',
          fontWeight: 'bold',
          color: 'white',
          borderRadius: '10px'
          }}>{`Error:: ${fetchError}`}</p>}

        {!fetchError && !isLoading &&
            <Lesson 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleChecked={handleChecked}
          handleDelete={handleDelete}
        />}
      </main>
      
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
