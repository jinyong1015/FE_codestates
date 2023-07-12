import React from 'react';
import Item from '../components/Item';

function ItemListContainer({ items, cartItems, setCartItems }) {
  const handleClick = ( e, id ) => { 
    let newCartItem = {};
    newCartItem.itemId = id;
    newCartItem.quantity = 1;
    for(let i = 0; i < cartItems.length; i++){
      if(cartItems[i].itemId === id){
        setCartItems([...cartItems])
        cartItems[i].quantity++
      }else{
        setCartItems([...cartItems, newCartItem])
      }
    }
  }
  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">쓸모없는 선물 모음</div>
        {items.map((item, idx) => <Item item={item} key={idx} handleClick={handleClick} />)}
      </div>
    </div>
  );
}

export default ItemListContainer;
