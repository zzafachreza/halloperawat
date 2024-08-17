import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';
import { colors } from '../../utils';
import { MyHeader } from '../../components';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';

export default function Detail({ navigation, route }) {
    const pdfSource = require('../../../android/app/src/main/assets/pdf/hipertensi.pdf');

    const nama_edukasi = route.params.nama_edukasi;

    const [item, setItem] = useState({
        pdf: ''
    });
    useEffect(() => {

        axios.post(apiURL + 'edukasi', {
            judul: nama_edukasi
        }).then(res => {
            setItem(res.data[0])
        })

    }, [])

    return (
        <View style={styles.container}>
            <MyHeader title={nama_edukasi} />
            <Pdf
                source={{
                    uri: item.pdf
                }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                trustAllCerts={false}
                horizontal={false}
                style={styles.pdf}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
