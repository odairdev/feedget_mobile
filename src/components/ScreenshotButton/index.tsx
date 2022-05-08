import { Camera, Trash } from "phosphor-react-native";
import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { theme } from "../../theme";

import { styles } from "./styles";

interface ScreenshotProps {
  screenshot: string | null;
  onTakeShot: () => void;
  onRemoveShot: () => void;
}

export function ScreenshotButton({
  screenshot,
  onTakeShot,
  onRemoveShot,
}: ScreenshotProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? onRemoveShot : onTakeShot}
    >
      {screenshot ? (
        <View>
          <Image source={{uri: screenshot}} style={styles.image}/>
          <Trash
          style={styles.removeIcon}
          size={22}
          color={theme.colors.text_secondary}
          weight="fill"
        />
        </View>
      ) : (
        <Camera size={24} color={theme.colors.text_primary} weight='bold' />
      )}
    </TouchableOpacity>
  );
}
