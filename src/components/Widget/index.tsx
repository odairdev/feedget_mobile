import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ChatTeardropDots } from "phosphor-react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { styles } from "./styles";
import { theme } from "../../theme";
import { Options } from "../Options";
import { Form } from "../Form";
import { feedbackTypesProps } from "../../../App";
import { Success } from "../Success";

function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [feedbackTypeChosen, setFeedbackTypeChosen] =
    useState<feedbackTypesProps | null>(null);
  const [feedbackSuccess, setFeedbackSuccess] = useState<boolean>(false);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function restartFeedback() {
    setFeedbackTypeChosen(null);
    setFeedbackSuccess(false)
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          weight="bold"
          size={24}
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSuccess ? (
          <Success restart={restartFeedback}/>
        ) : (
          <>
            {feedbackTypeChosen ? (
              <Form
                optionTitle={feedbackTypeChosen}
                restartFeedback={restartFeedback}
                onFeedbackSuccess={() => setFeedbackSuccess(true)}
              />
            ) : (
              <Options chooseFeedback={setFeedbackTypeChosen} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
