// wehn checkOutButtone is clicked
const { cart } = useCartStore();
const { addToCart } = useCartStore();
const { user } = useUserStore();
const [ShippingAddressInput, setShippingAddressInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
});
const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
};
const checkoutHandler = async (e) => {
    e.preventDefault();
    // api implementation start from here
    try {
        const checkoutData = {
            cartItems: cart.map((cartItem) => ({
                menuId: cartItem._id,
                name: cartItem.name,
                image: cartItem.image,
                price: cartItem.price.toString(),
                quantity: cartItem.quantity.toString(),
            })),
            deliveryDetails: ShippingAddressInput,
            restaurantId: restaurant?._id,
        };
        await createCheckoutSession(checkoutData);
    }
    catch (error) {
        console.log(error);
    }
};
export {};
