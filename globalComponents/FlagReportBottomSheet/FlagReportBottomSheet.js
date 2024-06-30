import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { FlagReportBottomSheetStyles, font } from "../../styles/Global/main";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BackDrop from "./BackDrop";
import StandardButton from "../StandardButton";
import { useMemo, useState } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { getPercent } from "../../middleware";
import { updateUser,getAllUsers } from "../../state-management/actions/features";
import { getAuth } from "firebase/auth";

const FlagReportBottomSheet = (props) => {
  let { user, bottomSheetRef } = props;
  let { width, height } = useWindowDimensions();
  let styles = FlagReportBottomSheetStyles({ width, height });
  let currentUserId = getAuth().currentUser?.uid;
  const snapPoints = useMemo(() => ["25%", "82%"], []);
  const [selectedFlags, setSelectedFlags] = useState([]);
  const [loading, setLoading] = useState(false);
  let userReports = {...user?.reports} || {}

  const CardHeader = () => {
    return (
      <View style={styles.card_header_wrapper}>
        <Text style={font(15, "#181725", "Semibold")}>FLAG REPORT</Text>
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current?.close();
            bottomSheetRef.current = null;
          }}
        >
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const categories = [
    { key: "fake_news", label: "Fake News / Purposeful Misinformation" },
    { key: "hate_speech", label: "Hate Speech" },
    { key: "profanity", label: "Profanity / Personal Insults / Rude" },
    { key: "harassment", label: "Harassment / Threats / Intimidation" },
    {
      key: "illegal_activity",
      label: "Illegal Activity / Violence / Terrorism",
    },
    { key: "libel_slander", label: "Libel / Slander" },
    { key: "fake_profile", label: "Fake Profile / Fake Voice" },
    { key: "lewd_images", label: "Lewd Images" },
    { key: "suspected_troll_bot", label: "Suspected Troll / Bot" },
    { key: "something_else", label: "Something Else" },
  ];
  const onSubmit = () => {
    let alreadyReported = userReports[currentUserId];
    if (!alreadyReported) {
      userReports[currentUserId] = selectedFlags;
    }
    props
      ?.updateUser({ reports: userReports }, currentUserId, setLoading)
      .then((res) => {
        bottomSheetRef.current.close();
        setSelectedFlags([]);
        alert("User Reported");
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong try again.");
      });
  };

  return (
    <BottomSheetModalProvider>
      <View
        style={[styles.container, { flex: bottomSheetRef.current ? 0 : 1 }]}
      >
        <BottomSheetModal
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={BackDrop}
          enableContentPanningGesture={false}
        >
          <BottomSheetView style={styles.sheetContentContainer}>
            <CardHeader />
            <ScrollView>
              <View style={styles.contentContainer}>
                <Text
                  style={font(14, "#111827", "Semibold", 8, 22, {
                    textAlign: "justify",
                  })}
                >
                  Terms -{" "}
                  <Text style={font(14, "#111827", "Regular")}>
                    Do not troll or flag other users with fake flags or you may
                    be subject to disciplinary action yourself
                  </Text>
                </Text>
                <Text style={font(14, "#111827", "Semibold", 8, 22)}>
                  Fake news or purposeful misinformation will not be tolerated
                </Text>
                <View style={styles.categoriesWrapper}>
                  {categories?.map((item, index) => {
                    let isSelected =
                      selectedFlags?.filter((e) => e?.key === item?.key)
                        ?.length > 0;
                    return (
                      <TouchableOpacity
                        style={styles.categoriesItemWrapper}
                        key={index}
                        onPress={() =>
                          setSelectedFlags((prev) => {
                            if (isSelected) {
                              return prev.filter((e) => e?.key !== item?.key);
                            } else {
                              return [...prev, item];
                            }
                          })
                        }
                      >
                        {isSelected ? (
                          <Ionicons
                            name="radio-button-on"
                            size={24}
                            color="#011A51"
                            style={{ marginRight: 10 }}
                          />
                        ) : (
                          <Ionicons
                            name="radio-button-off-outline"
                            size={24}
                            color="#E5E7EB"
                            style={{ marginRight: 10 }}
                          />
                        )}
                        <Text style={font(15, "#111827", "Regular")}>
                          {item?.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <StandardButton
                  title="Submit"
                  customStyles={{
                    width: "100%",
                    height: getPercent(6, height),
                    marginVertical: 20,
                  }}
                  onPress={onSubmit}
                />
              </View>
            </ScrollView>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};
const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  get_user_details: state.main.get_user_details,
});
export default connect(mapStateToProps, {
  updateUser,
  getAllUsers
})(FlagReportBottomSheet);
