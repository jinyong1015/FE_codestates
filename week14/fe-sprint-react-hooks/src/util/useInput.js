import { useState } from "react";

const useInput = (intialValue = "") => {
  const [text, setText] = useState(intialValue);

  const onChangeText = e => setText(e.target.value);

  return [text, onChangeText, setText];
}

export default useInput
