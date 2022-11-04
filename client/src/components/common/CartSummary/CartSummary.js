const CartSummary = ({ id, name }) => {
    const cartItems = useSelector((state) => state.cart.cartItems);

    return (
        <div className={styles.root}>
            <h2>Cart Summary</h2>
            {cartItems.map((item) => (
                    <div className={styles.image}>
                    <img src={image} alt={name} />
                  </div>
                  <div className={styles.details}>
                    <h3>{name}</h3>
                    <p>Quantity: {quantity}</p>
                    <p>Price: {price}</p>
                  </div>
                  <div className={styles.notes}>
                    <label htmlFor="notes">Notes</label>
                    <textarea
                      name="notes"
                      onChange={(e) => setNotes(e.target.value)}
                      value={notes}
                    />
                  </div>}
};

export default CartSummary;
