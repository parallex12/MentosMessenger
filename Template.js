import { Text, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../styles/ScreenName/main";

const ScreenName = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return <View style={styles.container}></View>;
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(ScreenName);
"ios": {
  "appleId": "nazreenbrohi787@gmail.com",
  "ascAppId": "6444082213",
  "appleTeamId": "VJS7TJ6W33"
}