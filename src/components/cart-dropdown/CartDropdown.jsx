import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

import Button from '../button/Button'
import CartItem from '../cart-item/CartItem'
import './CartDropdown.scss'

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext)

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.map((item) => (
					<CartItem key={item.id} cartItem={item} />
				))}
			</div>
			<Button>GO TO CHECKOUT</Button>
		</div>
	)
}

export default CartDropdown
