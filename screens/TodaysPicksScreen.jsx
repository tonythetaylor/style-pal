import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import Carousel from 'react-native-snap-carousel';
import pantsData from "../bottomData";
import shoeData from "../shoeData";
import shirtData from "../topdata";

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Dimensions.get('window').width;

const HomeScreen = ({route, navigation}) => {
  // get picked clothes from closet
  if(route.params === undefined) return []
  const { selectedItems } = route.params;

  if(selectedItems !== undefined) {
    console.log('TODAYS PICKS', selectedItems)
  }

  const [shirts, setShirtData] = useState([])
  const [pants, setPantsData] = useState([])
  const [shoes, setShoesData] = useState([])

  const sortTypes = (item) => {
    item.map((byItem) => {
    if(byItem.type === 'Shirt') {
      setShirtData(current => [byItem, ...current])
    }

    if(byItem.type === 'Pants') {
      setPantsData(current => [byItem, ...current])
    }

    if(byItem.type === 'Shoes') {
      setShoesData(current => [byItem, ...current])
    }
  })
  }

  const renderTop = ({ item }) => {
    return (
      <View
        style={{
          flex: 3,
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image source={{ uri: item.url }} style={{ width: 200, height: 200 }} />
        <Text>
          {item.style}
        </Text>
      </View>
    );
  };

  const renderBottom = ({ item }) => {
    return (
      <View
        style={{
          flex: 3,
          // position: "absolute",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image source={{ uri: item.url }} style={{ width: 200, height: 200 }} />
        <Text>
          {item.style}
        </Text>
      </View>
    );

    
  };

  const renderShoe = ({ item }) => {
    return (
      <View
        style={{
          flex: 3,
          // position: "absolute",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image source={{ uri: item.url }} style={{ width: 200, height: 200 }} />
        <Text>
          {item.style}
        </Text>
      </View>
    );
  };
  
  useEffect(() => {
    sortTypes(selectedItems)
  }, [])
  


  return (
    <View style={[styles.container, {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "column"
    }]}>
      <View style={{
        flex: 3,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
      }} >
        <Carousel
          data={shirts}
          renderItem={renderTop}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
        />
        <Carousel
          data={pants}
          renderItem={renderBottom}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
        />
        <Carousel
          data={shoes}
          renderItem={renderShoe}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
        />
      </View>
      {/* <View style={{ flex: 3, backgroundColor: "darkorange" }} >
        <Carousel
          data={pantsData}
          renderItem={renderBottom}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
        />
      </View>
      <View style={{ flex: 3, backgroundColor: "green" }} >
        <Text>Shoes</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "white" }} >
        <Text>Compliment</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    alignItems: "center",
    justifyContent: 'center'
  },
});

export default HomeScreen;