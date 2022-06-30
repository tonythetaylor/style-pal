import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, RefreshControl } from 'react-native'
import { Avatar } from 'react-native-elements';
import personData from "../personData";
import { useRoute } from '@react-navigation/native';

export default function PastLooksScreen({ route, navigation }) {
    const _route = useRoute()
    const [propData, setData] = useState(personData)
    const [items, setItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
      /* 2. Get the param */
  const { data } = route.params;
//   const { otherParam } = route.params;

  console.log('DEBUG 2: ', data)

    const onRefresh = async () => {
        setIsFetching(true);
        setTimeout(() => {
            console.log("Delayed for 5 second.");
          }, "5000")
        setIsFetching(false);
      };
    // console.log('DEBUG: ---->', propData)

    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={{ uri: item.url }}
                    style={styles.cardImage}
                />
                <View style={styles.cardHeader}>
                    <Text category='s1' style={styles.cardTitle}>
                        {item.brand}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Closet')}>
                        <Image
                            source={{ uri: item.url }}
                            size='small'
                            style={styles.cardAvatar}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardContent}>
                    <Text category='p2'>{item.style}</Text>
                </View>
            </View>
        </View>
    )

    useEffect(() => {
        setTimeout(() => {
            if(data != undefined) {
                const _id = personData.forEach(element => {
                    element.id
                });
                if (data.id != _id) {
                    setData(current => [data, ...current]);
                    navigation.setParams({data: {}})
                }   
            }
            console.log("Delayed for 1 second.");
          }, "1000")
      }, [data]);

    return (
        
        <FlatList
            style={styles.container}
            data={propData}
            renderItem={renderItem}
            keyExtractor={personData.id}
            onRefresh={onRefresh}
            refreshing={isFetching}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 25,
        paddingTop: 5
    },
    cardHeader: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
        color: '#000',
    },
    cardImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain'
      },
    cardAvatar: {
        marginRight: 16,
        width: 45, height: 45,
        resizeMode: 'contain',
        borderRadius: 180 / 2
    },
    cardContent: {
        padding: 10,
        borderBottomWidth: 0.25,
        borderTopWidth: 0.25,
        borderColor: 'grey'
    }
})