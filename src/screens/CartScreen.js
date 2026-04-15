import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

import { getCart, updateCartItemQuantity } from '../utils/cartStorage';

const ORANGE_JUICE_IMAGE = require('../../assets/images/product-orange-juice.png');
const MILK_IMAGE = require('../../assets/images/product-milk-bottle.png');
const AMBER_BOTTLE_IMAGE = require('../../assets/images/product-amber-bottle.png');

const PREVIEW_CART_ITEMS = [
  {
    id: 'juice_01',
    brand: "Lauren's",
    name: 'Orange Juice',
    price: 149,
    quantity: 1,
    imageKey: 'orange_juice',
  },
  {
    id: 'milk_01',
    brand: "Baskin's",
    name: 'Skimmed Milk',
    price: 129,
    quantity: 1,
    imageKey: 'milk',
    badge: 'summer',
  },
  {
    id: 'amber_01',
    brand: "Marley's",
    name: 'Aloe Vera Lotion',
    price: 1249,
    quantity: 1,
    imageKey: 'amber',
  },
];

function ProductArtwork({ item }) {
  const source =
    item.imageKey === 'milk'
      ? MILK_IMAGE
      : item.imageKey === 'amber'
        ? AMBER_BOTTLE_IMAGE
        : ORANGE_JUICE_IMAGE;

  const imageStyle =
    item.imageKey === 'milk'
      ? styles.milkImage
      : item.imageKey === 'amber'
        ? styles.amberImage
        : styles.juiceImage;

  return <Image source={source} style={[styles.productImage, imageStyle]} resizeMode="cover" />;
}

function QuantityPill({ quantity, onDecrease, onIncrease, disabled }) {
  return (
    <View style={styles.quantityPill}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.quantityHit}
        onPress={onDecrease}
        disabled={disabled}
      >
        <Text style={styles.quantityAction}>−</Text>
      </TouchableOpacity>

      <Text style={styles.quantityValue}>{quantity}</Text>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.quantityHit}
        onPress={onIncrease}
        disabled={disabled}
      >
        <Text style={styles.quantityAction}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function CartItemCard({ item, editable, onDecrease, onIncrease }) {
  return (
    <View style={styles.itemCard}>
      <View style={styles.thumbWrap}>
        <ProductArtwork item={item} />
      </View>

      <View style={styles.itemTextBlock}>
        <Text style={styles.itemBrand}>{item.brand}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹ {item.price}</Text>
      </View>

      <View style={styles.itemRightBlock}>
        {item.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        ) : (
          <View style={styles.badgeSpacer} />
        )}

        <QuantityPill
          quantity={item.quantity}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
          disabled={!editable}
        />
      </View>
    </View>
  );
}

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);

  const loadCartData = async () => {
    const items = await getCart();
    setCartItems(items);
  };

  useFocusEffect(
    useCallback(() => {
      loadCartData();
    }, [])
  );

  const handleQuantityChange = async (id, currentQty, amount) => {
    const newQty = currentQty + amount;
    const updatedCart = await updateCartItemQuantity(id, newQty);
    setCartItems(updatedCart);
  };

  const hasRealItems = cartItems.length > 0;

  const displayItems = useMemo(() => {
    if (!hasRealItems) {
      return PREVIEW_CART_ITEMS;
    }

    const normalizedItems = cartItems.map((item) => ({
      ...item,
      imageKey:
        item.id === 'milk_01'
          ? 'milk'
          : item.id === 'amber_01'
            ? 'amber'
            : 'orange_juice',
      quantity: item.quantity ?? 1,
    }));

    const realIds = new Set(normalizedItems.map((item) => item.id));
    const previewOnly = PREVIEW_CART_ITEMS.filter((item) => !realIds.has(item.id)).map((item) => ({
      ...item,
      isPreviewOnly: true,
    }));

    return [...normalizedItems, ...previewOnly];
  }, [cartItems, hasRealItems]);

  const totalAmount = useMemo(() => {
    return displayItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [displayItems]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.inner}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={19} color="#F39A66" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Your Cart 👍🏻</Text>

        <FlatList
          data={displayItems}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <CartItemCard
              item={item}
              editable={hasRealItems && !item.isPreviewOnly}
              onDecrease={() => handleQuantityChange(item.id, item.quantity, -1)}
              onIncrease={() => handleQuantityChange(item.id, item.quantity, 1)}
            />
          )}
          ListFooterComponent={
            <View style={styles.footerBlock}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹ {totalAmount}</Text>
              </View>

              <TouchableOpacity activeOpacity={0.92} style={styles.checkoutButton}>
                <Text style={styles.checkoutText}>Proceed to checkout</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerRow: {
    paddingTop: 2,
  },
  backButton: {
    width: 31,
    height: 31,
    borderRadius: 8,
    backgroundColor: '#FFF3EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 18,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    color: '#2A2A2A',
  },
  listContent: {
    paddingTop: 18,
    paddingBottom: 118,
    rowGap: 12,
  },
  itemCard: {
    minHeight: 78,
    borderRadius: 18,
    backgroundColor: '#F7F7FB',
    paddingHorizontal: 11,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F3E4D5',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  productImage: {
    position: 'absolute',
  },
  juiceImage: {
    width: 74,
    height: 74,
  },
  milkImage: {
    width: 70,
    height: 70,
  },
  amberImage: {
    width: 80,
    height: 80,
  },
  itemTextBlock: {
    flex: 1,
    marginLeft: 10,
    paddingRight: 8,
  },
  itemBrand: {
    fontSize: 7,
    lineHeight: 9,
    color: '#C7BEB6',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '500',
    color: '#4A4A4A',
  },
  itemPrice: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '700',
    color: '#F18E4B',
  },
  itemRightBlock: {
    width: 74,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  badge: {
    minWidth: 63,
    height: 24,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#758AB4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 7,
    lineHeight: 9,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.4,
    textTransform: 'lowercase',
  },
  badgeSpacer: {
    height: 24,
    marginBottom: 10,
  },
  quantityPill: {
    width: 54,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3E9E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  quantityHit: {
    width: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityAction: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '600',
    color: '#F39A66',
  },
  quantityValue: {
    fontSize: 9,
    lineHeight: 11,
    fontWeight: '500',
    color: '#B8B1AA',
  },
  footerBlock: {
    paddingTop: 22,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  totalLabel: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    color: '#343434',
  },
  totalValue: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    color: '#F18E4B',
  },
  checkoutButton: {
    height: 36,
    borderRadius: 11,
    backgroundColor: '#F59158',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
