import Text from "@/src/shared/components/Text";
import { Image, View } from "react-native";
import { styles } from "../styles";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.textNormal}>Xin chào 🖐️</Text>
        <Text style={styles.textMedium}>Vũ Hồng Sơn</Text>
      </View>
      <View>
        <Image
          source={require("../../../assets/images/default-avatar.jpg")}
          style={styles.avatar}
        />
      </View>
    </View>
  );
}
