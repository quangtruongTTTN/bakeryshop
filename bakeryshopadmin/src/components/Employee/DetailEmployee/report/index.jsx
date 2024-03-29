import {
  Document,
  Page,
  Text,
  Font,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import Logo from "./../../../../assets/img/BakeryShop.jpg";
import Moment from "react-moment";
// import { styles } from "./style";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 70,
    height: 70,
    marginLeft: "auto",
    marginRight: "auto",
  },
  wrapInfo: {
    display: "flex",
    flexDirection: "row",
  },
  wrapAvatarInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  fullName: {
    fontSize: 16,
    fontWeight: 900,
    marginTop: 10,
  },
  avatar: {
    border: "3px solid #000",
    borderRadius: "50%",
    width: 100,
    height: 100,
  },
  wrapDate: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
    marginBottom: 30,
  },
  mark: {
    color: "red",
    marginTop: 5,
  },
  wrapField: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 10,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 25,
  },
  reportTitle: {
    color: "#BF9000",
    letterSpacing: 4,
    fontSize: 25,
    textAlign: "center",
    textTransform: "uppercase",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContainer: {
    marginLeft: 40,
  },
});

const Report = ({ user }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.header}>
        <Image style={styles.logo} src={Logo} />
        <View style={styles.headerContainer}>
          <Text>
            Địa chỉ: 97 Man Thiện, Phường Hiệp Phú, Quận 9, Thành phố Hồ
            Chí Minh
          </Text>
          <Text>Số điện thoại: + 84 967 903 498</Text>
          <Text>Email: nguyenquangtruong3q@gmail.com</Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>Thông tin người dùng</Text>
      </View>
      <View style={styles.wrapDate}>
        <Text>Ngày xuất: </Text>
        <Text>
          <Moment format="DD/MM/YYYY HH:mm:ss" date={new Date()} />
        </Text>
      </View>
      <View style={styles.wrapInfo}>
        <View style={styles.wrapAvatarInfo}>
          <Image
            src={user?.linkImage ? user?.linkImage : Logo}
            style={styles.avatar}
          />
          <Text style={styles.fullName}>{user?.fullName}</Text>
          {/* <Text style={styles.mark}>Điểm: {user?.memberVip?.mark ?? "0"}</Text> */}
        </View>
        <View>
          <View style={styles.wrapField}>
            <Text>Ngày sinh: </Text>
            <Text>
              {<Moment format="DD/MM/YYYY" date={user?.birthday} /> && (
                <Moment format="DD/MM/YYYY" date={new Date()} />
              )}
            </Text>
          </View>
          <View style={styles.wrapField}>
            <Text>Địa chỉ: </Text>
            <Text>{user?.address}</Text>
          </View>
          <View style={styles.wrapField}>
            <Text>Điện thoại: </Text>
            <Text>{user?.phone}</Text>
          </View>
          <View style={styles.wrapField}>
            <Text>Email: </Text>
            <Text>{user?.email}</Text>
          </View>
          <View style={styles.wrapField}>
            <Text>Tham gia: </Text>
            <Text>
              {<Moment format="DD/MM/YYYY HH:mm:ss" date={user?.createdAt} />}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <hr style={{ marginTop: 50, height: 1, backgroundColor: "#BF9000" }} />
        <Text style={{ textAlign: "center", color: "#BF9000" }}>
        BAKERYSHOP
        </Text>
      </View>
    </Page>
  </Document>
);

export default Report;
