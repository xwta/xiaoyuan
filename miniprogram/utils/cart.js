const CART_STORAGE_KEY = 'campus_snack_cart';

function getCartItems() {
  return wx.getStorageSync(CART_STORAGE_KEY) || [];
}

function saveCartItems(items) {
  wx.setStorageSync(CART_STORAGE_KEY, items);
}

function addCartItem(product, quantity = 1) {
  const items = getCartItems();
  const existItem = items.find(item => item.id === product.id);

  if (existItem) {
    existItem.quantity += quantity;
  } else {
    items.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      coverUrl: product.coverUrl || '',
      quantity
    });
  }

  saveCartItems(items);
  return items;
}

function updateCartItemQuantity(productId, quantity) {
  const items = getCartItems()
    .map(item => item.id === productId ? { ...item, quantity } : item)
    .filter(item => item.quantity > 0);

  saveCartItems(items);
  return items;
}

function clearCart() {
  saveCartItems([]);
}

function getCartTotal(items = getCartItems()) {
  return items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
}

module.exports = {
  getCartItems,
  saveCartItems,
  addCartItem,
  updateCartItemQuantity,
  clearCart,
  getCartTotal
};
