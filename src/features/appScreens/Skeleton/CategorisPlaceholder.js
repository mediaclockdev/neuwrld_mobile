import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width ) ; // two columns with padding

const CategorisPlaceholder = () => {
  return (
    <View style={styles.container}>
      {/* 🔘 Category Filter Chips */}
      {/* <View style={styles.filterRow}>
        {Array.from({ length: 5 }).map((_, index) => (
          <ShimmerPlaceHolder
            key={index}
            style={styles.filterChip}
          />
        ))}
      </View> */}

      {/* 🛍 Product Grid */}
      <FlatList
        data={Array.from({ length: 6 })}
        keyExtractor={(_, i) => i.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={() => (
          <View style={styles.card}>
            {/* Product image */}
            <ShimmerPlaceHolder
             
              style={styles.image}
            />
            {/* Product title */}
            <ShimmerPlaceHolder
             
              style={styles.title}
            />
            {/* Product price */}
            <ShimmerPlaceHolder
             
              style={styles.price}
            />
          </View>
        )}
      />
    </View>
  );
};

export default CategorisPlaceholder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterChip: {
    width: 70,
    height: 32,
    borderRadius: 20,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    width: "80%",
    height: 14,
    borderRadius: 4,
    marginBottom: 6,
  },
  price: {
    width: "40%",
    height: 12,
    borderRadius: 4,
  },
});
