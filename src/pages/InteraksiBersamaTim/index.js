import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyHeader } from '../../components';
export default function InteraksiBersamaTim({ navigation, route }) {
   const item = route.params;
   const [data, setData] = useState({});
   const [loading, setLoading] = useState(false);

   const getDataTransaksi = () => {
      setLoading(true);
      axios.post(apiURL + 'tim').then(res => {
         console.log(res.data);
         setData(res.data);
         setTMP(res.data);
      }).finally(() => {
         setLoading(false)
      })
   }

   useEffect(() => {
      getDataTransaksi();
   }, []);

   const __renderItem = ({ item }) => {
      return (

         <TouchableWithoutFeedback onPress={() => {
            Linking.openURL('https://wa.me/' + item.telepon + '?text=Hallo ' + item.nama_lengkap)
         }}>
            <View style={{
               flex: 1,
               marginHorizontal: 8,
               padding: 10,
               backgroundColor: colors.secondary,
               marginVertical: 10,
               borderRadius: 10,
               borderWidth: 1,
               borderColor: colors.border,
               overflow: 'hidden',
               justifyContent: 'center',
               alignItems: 'center'

            }}>

               <Image source={require('../../assets/wa.png')} style={{
                  width: '100%',
                  height: 100,
                  resizeMode: 'contain',
               }} />
               <Text style={{
                  marginTop: 16,
                  fontFamily: fonts.primary[600],
                  color: colors.white,
                  fontSize: 15,
                  textAlign: 'center'
               }}>{item.nama_lengkap}</Text>
               <Text style={{
                  marginTop: 2,
                  fontFamily: fonts.primary[400],
                  color: colors.white,
                  fontSize: 14,
                  textAlign: 'center'
               }}>{item.keterangan}</Text>

            </View>
         </TouchableWithoutFeedback>

      )
   }

   const [key, setKey] = useState('');
   const [TMP, setTMP] = useState({});

   return (
      <SafeAreaView style={{
         flex: 1,
         backgroundColor: colors.background
      }}>

         <MyHeader title="Interaksi bersama Tim" onPress={() => navigation.goBack()} />
         {!loading &&
            <View style={{
               flex: 1,
               paddingHorizontal: 10,
            }}>
               {/* <View style={{
                        position: 'relative'
                    }}>
                        {key.length > 0 &&

                            <TouchableWithoutFeedback onPress={() => {
                                setKey(''); setData(TMP);
                            }}>
                                <View style={{
                                    position: 'absolute',
                                    zIndex: 99,
                                    top: 10,
                                    right: 10,
                                }}>
                                    <Icon type='ionicon' name='close' color={colors.secondary} />
                                </View>
                            </TouchableWithoutFeedback>}
                        <View style={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                        }}>
                            <Icon type='ionicon' name='search' color={colors.border} />
                        </View>
                        <TextInput value={key} onChangeText={x => {
                            setKey(x);
                            if (x.length > 0) {
                                let TMPSrc = data.filter(i => i.nama_stakeholder.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                if (TMPSrc.length > 0) {
                                    setData(TMPSrc);
                                }
                            } else {
                                setData(TMP);
                            }
                        }} placeholder='Pencarian . . .' style={{
                            height: 45,
                            borderWidth: 1,
                            marginBottom: 10,
                            borderRadius: 10,
                            paddingLeft: 40,
                            borderColor: colors.border,
                            fontFamily: fonts.secondary[600],
                            fontSize: MyDimensi / 4
                        }} />
                    </View> */}
               <FlatList data={data} numColumns={2} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

            </View>
         }
         {loading &&
            <View style={{
               flex: 1,
               justifyContent: 'center',
               alignItems: 'center'
            }}>
               <ActivityIndicator size="large" color={colors.primary} />

            </View>
         }



      </SafeAreaView>
   )
}

const styles = StyleSheet.create({})