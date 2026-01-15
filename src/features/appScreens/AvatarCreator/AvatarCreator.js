import React, { useRef, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Slider from '@react-native-community/slider';

import AvatarWebView from '../components/AvatarWebView';
import { saveAvatar } from '../../../store/avatarStorage';
import { DEFAULT_AVATAR } from '../../../utils/avatarDefaults';

export default function AvatarCreator() {
  const webRef = useRef(null);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);

  const updateAvatar = (next) => {
    setAvatar(next);
    webRef.current?.postMessage(
      JSON.stringify({ type: 'SET_AVATAR', payload: next })
    );
  };

  return (
    <View>
      <AvatarWebView ref={webRef} />

      <Text>Height</Text>
      <Slider min={0.9} max={1.1} value={avatar.height}
        onValueChange={(v) => updateAvatar({ ...avatar, height: v })}
      />

      <Text>Weight</Text>
      <Slider min={0.8} max={1.2} value={avatar.weight}
        onValueChange={(v) => updateAvatar({ ...avatar, weight: v })}
      />

      <Button title="Save Avatar" onPress={() => saveAvatar(avatar)} />
    </View>
  );
}
