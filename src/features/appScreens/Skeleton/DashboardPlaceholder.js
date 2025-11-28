import React from "react";
import { View, StyleSheet } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

const DashboardPlaceholder = () => {
  return (
    <View style={styles.container}>
      {/* 🏞 Banner */}
      <ShimmerPlaceHolder
        // LinearGradient={LinearGradient}
        style={styles.banner}
      />

      {/* 🧭 Category Section */}
      <View style={styles.categorySection}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} style={styles.categoryItem}>
            <ShimmerPlaceHolder
            //   LinearGradient={LinearGradient}
              style={styles.categoryCircle}
            />
            <ShimmerPlaceHolder
            //   LinearGradient={LinearGradient}
              style={styles.categoryLabel}
            />
          </View>
        ))}
      </View>

           {/* 🛍 Most Popular */}
      <View style={styles.popularGrid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} style={styles.popularItem}>
            <ShimmerPlaceHolder
            //   LinearGradient={LinearGradient}
              style={styles.productCard}
            />
          </View>
        ))}

      </View>
    </View>
  );
};

export default DashboardPlaceholder;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  banner: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 24,
  },
  categorySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: "center",
    width: 70,
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryLabel: {
    width: 50,
    height: 10,
    borderRadius: 4,
  },
  popularSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popularGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  popularItem: {
    width: "48%",
    marginBottom: 16,
  },
  productCard: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
});
