import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { feedbackTypesProps } from "../../../App";
import { captureScreen } from "react-native-view-shot";
import * as FileSystem from 'expo-file-system'

import { styles } from "./styles";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { ScreenshotButton } from "../ScreenshotButton";
import { Button } from "../Button";
import { api } from "../../libs/api";

interface FormProps {
  optionTitle: feedbackTypesProps;
  restartFeedback: () => void;
  onFeedbackSuccess: () => void;
}

export function Form({
  optionTitle,
  restartFeedback,
  onFeedbackSuccess,
}: FormProps) {
  const feedbackTypeInfo = feedbackTypes[optionTitle];
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comment, setComment] = useState("");

  function handleScreenshot() {
    setIsLoading(true);

    captureScreen({
      format: "png",
      quality: 0.8,
    })
      .then((uri) => {
        setScreenshot(uri);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  }

  async function handleSubmit() {
    setIsLoading(true);

    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64'})

    try {
      await api.post("/feedbacks", {
        type: optionTitle,
        comment,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
      });

      setIsLoading(false);

      onFeedbackSuccess();
    } catch (err) {
      setIsLoading(false);

      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={restartFeedback}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image style={styles.image} source={feedbackTypeInfo.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.textInput}
        placeholder="Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      ></TextInput>

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onRemoveShot={() => setScreenshot(null)}
          onTakeShot={handleScreenshot}
        />
        <Button isLoading={isLoading} onPress={handleSubmit} />
      </View>
    </View>
  );
}
