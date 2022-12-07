import { Document, Page, Text, Font, View, Image } from "@react-pdf/renderer";
import { styles } from "./style";
import Logo from "./../../../../assets/img/BakeryShop.jpg";
import Moment from "react-moment";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const Report = ({ category }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.header}>
        <Image style={styles.logo} src={Logo} />
        <View style={styles.headerContainer}>
          <Text>
            Địa chỉ: 97 Man Thiện, Phường Hiệp Phú, Quận 9, Thành phố Hồ Chí
            Minh
          </Text>
          <Text>Số điện thoại: + 84 967 903 498</Text>
          <Text>Email: nguyenquangtruong3q@gmail.com</Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>Danh sách Loại Sản Phẩm</Text>
      </View>
      <View>
        <Text style={styles.reportTitle}>{category.name}</Text>
      </View>
      <View style={styles.invoiceDateContainer}>
        <Text style={styles.label}>Ngày xuất: </Text>
        <Text>
          <Moment format="yyyy-MM-DD hh:mm:ss" date={new Date()} />
        </Text>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.container}>
          <Text style={styles.img}>Hình Ảnh</Text>
          <Text style={styles.name}>Tên Sản Phẩm</Text>
          <Text style={styles.name}>Chú Thích</Text>
          <Text style={styles.price}>Giá</Text>
        </View>
      </View>

      {category?.products.map((item, index) => (
        <View key={index}>
          <View style={styles.row}>
            <Text style={styles.img}>
              <Image
                style={{ width: 30, height: 20 }}
                src={item.linkImage ?? Logo}
              />
            </Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      ))}
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
