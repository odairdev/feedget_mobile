import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { Copyright } from "../Copyright";
import { Option } from "../Option";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { feedbackTypesProps } from "../../../App";

interface OptionsProps {
  chooseFeedback: (data: feedbackTypesProps | null) => void;
}

export function Options({ chooseFeedback }: OptionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deixe seu feedback
      </Text>

      <View style={styles.options}>
        {
          Object.entries(feedbackTypes).map(([key, value]) => {
            return <Option key={key} title={value.title} image={value.image} onPress={() => chooseFeedback(key as feedbackTypesProps)} />
          })
        }
      </View>
      <Copyright />
    </View>
  )
}