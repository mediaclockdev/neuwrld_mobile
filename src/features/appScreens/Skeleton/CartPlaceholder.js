import React from "react";
import { View } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

const CartPlaceholder = () => {
  return (
    <View style={{ padding: 16 }}>
      {[1, 2, 3].map((_, i) => (
        <View key={i} style={{ flexDirection: "row", marginBottom: 20 }}>
          {/* Image */}
          <ShimmerPlaceHolder style={{ width: 80, height: 80, borderRadius: 8 }} />
          {/* Text */}
          <View style={{ marginLeft: 12, flex: 1 }}>
            <ShimmerPlaceHolder style={{ width: "60%", height: 18, marginBottom: 8 }} />
            <ShimmerPlaceHolder style={{ width: "40%", height: 18, marginBottom: 8 }} />
            <ShimmerPlaceHolder style={{ width: "30%", height: 18 }} />
          </View>
        </View>
      ))}

      {/* Promo code + Apply button */}
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <ShimmerPlaceHolder style={{ flex: 1, height: 40, borderRadius: 8 }} />
        <ShimmerPlaceHolder style={{ width: 80, height: 40, borderRadius: 8, marginLeft: 12 }} />
      </View>

      {/* Summary */}
      {[1, 2, 3].map((_, i) => (
        <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
          <ShimmerPlaceHolder style={{ width: "40%", height: 16 }} />
          <ShimmerPlaceHolder style={{ width: "20%", height: 16 }} />
        </View>
      ))}

      {/* Total */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <ShimmerPlaceHolder style={{ width: "50%", height: 20 }} />
        <ShimmerPlaceHolder style={{ width: "30%", height: 20 }} />
      </View>

      {/* Checkout Button */}
      <ShimmerPlaceHolder style={{ width: "100%", height: 50, borderRadius: 12 }} />
    </View>
  );
};

export default CartPlaceholder;
