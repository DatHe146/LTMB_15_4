import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = '@cart_items';

export const getCart = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CART_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error reading cart data', e);
    return [];
  }
};

export const addToCart = async (item) => {
  try {
    const cart = await getCart();
    const existingIndex = cart.findIndex((i) => i.id === item.id);
    
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    
    const jsonValue = JSON.stringify(cart);
    await AsyncStorage.setItem(CART_KEY, jsonValue);
    return cart;
  } catch (e) {
    console.error('Error adding to cart', e);
    return [];
  }
};

export const updateCartItemQuantity = async (id, quantity) => {
  try {
    const cart = await getCart();
    const existingIndex = cart.findIndex((i) => i.id === id);
    
    if (existingIndex > -1) {
      if (quantity <= 0) {
        cart.splice(existingIndex, 1);
      } else {
        cart[existingIndex].quantity = quantity;
      }
      
      const jsonValue = JSON.stringify(cart);
      await AsyncStorage.setItem(CART_KEY, jsonValue);
    }
    return cart;
  } catch (e) {
    console.error('Error updating cart data', e);
    return [];
  }
};

export const clearCart = async () => {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (e) {
    console.error('Error clearing cart data', e);
  }
};
