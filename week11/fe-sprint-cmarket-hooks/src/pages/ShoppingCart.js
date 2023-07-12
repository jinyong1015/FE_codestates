import React, { useState } from 'react'
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'

export default function ShoppingCart({ items, cartItems, setCartItems }) {
  const [checkedItems, setCheckedItems] = useState(cartItems.map((el) => el.itemId))

  const handleQuantityChange = (quantity, itemId) => {
    const newCartItems = [...cartItems]
    let findIdx = cartItems.findIndex((item) => item.itemId === itemId)
    newCartItems[findIdx].quantity = quantity
    setCartItems(newCartItems)
  }
  
  const handleDelete = (itemId) => {
    setCheckedItems(checkedItems.filter((el) => el !== itemId))
    setCartItems(cartItems.filter((el)=> el.itemId !== itemId))
  }

  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">장바구니</div>
        <span id="shopping-cart-select-all">
          <input
            type="checkbox"
            checked={
              checkedItems.length === cartItems.length ? true : false
            }
            onChange={(e) => handleAllCheck(e.target.checked)} >
          </input>
          <label >전체선택</label>
        </span>
        <div id="shopping-cart-container">
          {!cartItems.length ? (
            <div id="item-list-text">
              장바구니에 아이템이 없습니다.
            </div>
          ) : (
              <div id="cart-item-list">
                {renderItems.map((item, idx) => {
                  const quantity = cartItems.filter(el => el.itemId === item.id)[0].quantity
                  return <CartItem
                    key={idx}
                    handleCheckChange={handleCheckChange}
                    handleQuantityChange={handleQuantityChange}
                    handleDelete={handleDelete}
                    item={item}
                    checkedItems={checkedItems}
                    quantity={quantity}
                  />
                })}
              </div>
            )}
          <OrderSummary total={total.price} totalQty={total.quantity} />
        </div>
      </div >
    </div>
  )
}