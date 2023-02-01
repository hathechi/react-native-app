import React, { useState } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign'; //Icon
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Image,
    ToastAndroid,
    TouchableOpacity,
    ImageBackground,
    useColorScheme,
    View,
} from 'react-native';
function HomeScreen() {
    return (
        <ScrollView>
            <View style={{ backgroundColor: 'black', flex: 1 }}>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../assets/images/br3.png')}></Image>
                    <View style={{
                        // borderRadius: 20
                    }}>
                        <View>
                            <Text style={{
                                fontWeight: "700",
                                fontSize: 26,
                                color: 'white',
                                marginEnd: 50,
                                marginTop: 10

                            }}>Khóa Học Lập Trình Flutter Cho Người Mới</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginTop: 50
                        }}>
                            <View style={{ marginEnd: 15 }}>
                                <Text style={styles.text}>50 Bài Học</Text>
                            </View>
                            <Text style={styles.text}>
                                <AntDesign name="clockcircle" style={{ color: 'white', fontSize: 18, }} /> 20 Giờ Học                        </Text>
                        </View>
                        <Text style={styles.text}>
                            <AntDesign name="user" style={{
                                color: 'white',
                                fontSize: 18,
                            }} /> Teacher MR.Sơn
                        </Text>
                        <View style={{
                            marginTop: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity style={{
                                width: '80%',
                                height: 60,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 16,
                                    fontWeight: '700'
                                }}>
                                    SHOW DETAIL
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: 'black', flex: 1 }}>
                <View style={styles.container}>
                    <Image style={styles.image} source={{ uri: 'https://storage.googleapis.com/cms-storage-bucket/70760bf1e88b184bb1bc.png' }}></Image>
                    <View style={{
                        // borderRadius: 20
                    }}>
                        <View>
                            <Text style={{
                                fontWeight: "700",
                                fontSize: 26,
                                color: 'white',
                                marginEnd: 50,
                                marginTop: 10

                            }}>Flutter Từ Cơ Bản Đến Nâng Cao</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginTop: 50
                        }}>
                            <View style={{ marginEnd: 15 }}>
                                <Text style={styles.text}>50 Bài Học</Text>
                            </View>

                            <Text style={styles.text}>
                                <AntDesign name="clockcircle" style={{ color: 'white', fontSize: 18, }} /> 20 Giờ Học</Text>

                        </View>
                        <Text style={styles.text}>
                            <AntDesign name="user" style={{
                                color: 'white',
                                fontSize: 18,
                            }} /> Teacher MR.Sơn</Text>
                        <View style={{
                            marginTop: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity style={{
                                width: '80%',
                                height: 60,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 16,
                                    fontWeight: '700'
                                }}>
                                    SHOW DETAIL
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: 'black', flex: 1 }}>
                <View style={styles.container}>
                    <Image style={styles.image} source={{ uri: 'https://cdn.sanity.io/images/s7xbv9bz/production/1562d4dae8dc03456edca898e89c0f39ae086a8f-1600x1000.png?w=1200&h=750&auto=format&fm=webp' }}></Image>
                    <View style={{
                        // borderRadius: 20
                    }}>
                        <View>
                            <Text style={{
                                fontWeight: "700",
                                fontSize: 26,
                                color: 'white',
                                marginEnd: 50,
                                marginTop: 10

                            }}>Từ Zero Đến Hero =))</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginTop: 50
                        }}>
                            <View style={{ marginEnd: 15 }}>
                                <Text style={styles.text}>50 Bài Học</Text>
                            </View>

                            <Text style={styles.text}>
                                <AntDesign name="clockcircle" style={{ color: 'white', fontSize: 18, }} /> 20 Giờ Học</Text>

                        </View>
                        <Text style={styles.text}>
                            <AntDesign name="user" style={{
                                color: 'white',
                                fontSize: 18,
                            }} /> Teacher MR.Sơn</Text>
                        <View style={{
                            marginTop: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity style={{
                                width: '80%',
                                height: 60,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 16,
                                    fontWeight: '700'
                                }}>
                                    SHOW DETAIL
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView >
    );
};
export default HomeScreen;

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 18
    },
    container: {
        borderRadius: 30,
        padding: 20,
        margin: 10,
        backgroundColor: '#4d4f4f'
    },
    image: {
        width: '100%',
        borderRadius: 20,
        height: 250,
    }
})