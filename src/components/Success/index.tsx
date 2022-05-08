import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import successImg from '../../assets/success.png'
import { Copyright } from "../Copyright";

import { styles } from "./styles";

interface SuccessProps {
  restart: () => void;
}

export function Success({ restart }: SuccessProps) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />

      <Text style={styles.title}>
        Agradecemos o feedback
      </Text>

      <TouchableOpacity style={styles.button} onPress={restart}>
        <Text style={styles.buttonTitle}>
          Quero enviar outro
        </Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  )
}