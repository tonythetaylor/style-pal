import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import List from "../components/List";
import SearchBar from "../components/SearchBar";

const searchData = [
  {
    "id": "1",
    "name": "Ally Nicole",
    "details": "Celebrity Stylist"
  },
  {
    "id": "2",
    "name": "Brett Corbin",
    "details": "Sneaker Shopper"
  },
  {
    "id": "3",
    "name": "Tristian Coplin",
    "details": "Specializes in accessory matching"
  },
  {
    "id": "4",
    "name": "Shelly Belly",
    "details": "Jewelry Maker"
  },
  {
    "id": "5",
    "name": "Tiffany Bean",
    "details": "Lash Techniciain"
  },
  {
    "id": "6",
    "name": "Daniel Cruze",
    "details": "InstaCLTHG shopper"
  },
  {
    "id": "7",
    "name": "Retro Jordan 1 Low Travis Scott",
    "details": "Sell or Swap. Min Price: $1300"
  },
  {
    "id": "8",
    "name": "Yezzy 350",
    "details": "Donating, First come first serve!"
  },
  {
    "id": "9",
    "name": "H&M",
    "details": "25% off coupon + SALE NOW!!"
  }
]

const SearchScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  // get data from the fake api endpoint
  useEffect(() => {
    const getData = async () => {
      setFakeData(searchData);
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      {!clicked}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {(

          <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
          />

      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white'
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});