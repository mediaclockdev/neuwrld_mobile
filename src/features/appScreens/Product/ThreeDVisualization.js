import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Canvas} from '@react-three/fiber';
import {Mesh} from 'three';

export default function ThreeDVisualization() {
  return (
    <View style={styles.container}>
      <Canvas style={{flex: 1}}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
