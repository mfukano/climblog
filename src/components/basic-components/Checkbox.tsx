import BouncyCheckbox from "react-native-bouncy-checkbox"
import toggleArrayElement from "../../helpers/toggleArrayElement"

const Checkbox = ({ setState, state, text }) => {
  return (
    <BouncyCheckbox
      text={text}
      textStyle={{textDecorationLine: "none"}}
      onPress={() => setState(toggleArrayElement(state, text))}
    />
  )
}

export default Checkbox