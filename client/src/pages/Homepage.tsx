import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface MyList {
  item: string;
  price: number;
  quantity: number;
}

const Homepage: React.FC = () => {
  const [list, setList] = useState<MyList[]>([]);
  const [newItem, setNewItem] = useState<MyList>({
    item: "",
    price: 0,
    quantity: 0,
  });

  

  const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({ 
      ...newItem,
      [name]: name === "item" ? value : parseFloat(value),
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setList((prevList) => [...prevList, newItem]);
    localStorage.setItem("setList", JSON.stringify([...list, newItem])); 
    setNewItem({ item: '', price: 0, quantity: 0 });
  };

  useEffect(() => {
    const savedList = localStorage.getItem("setList");

    if (savedList) {
      try {
        setList(JSON.parse(savedList));
      } catch (e) {
        console.log('Error for fetch saved list', e)
      }
    }
  }, []);


  return (
    <div className="home-cont">
      <div className="add-list">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter your product"
            name="item"
            onChange={onFieldChange}
          />
          <input
            type="number"
            placeholder="Enter price"
            name="price"
            onChange={onFieldChange}
          />
          <input
            type="number"
            placeholder="Enter quantity"
            name="quantity"
            onChange={onFieldChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="item-list"></div>

      <ul>
        {list.map((lists, index) => (
          <li key={index}>
            {lists.item} - ${lists.price} - {lists.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
