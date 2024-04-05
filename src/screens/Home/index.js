import { View, Text, ImageBackground, TouchableOpacity, FlatList, Image, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Card from '../Card';
import DropDownPicker from 'react-native-dropdown-picker';
import CITY_LIST from '../../api/vn.json'
import { COLORS } from '../../components/theme';
import { deviceWidth } from '../../components/Dimension';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

const Home = (props) => {

    const cities = [
        {
            name: 'Hà Nội',
            city: 'Hanoi',
            lat: "21.0000",
            lng: "105.8500",
            image: require('../../assets/img/hanoi.jpg')
        },
        {
            name: 'Đà Nẵng',
            city: 'Đà Nẵng',
            lat: "16.0748",
            lng: "108.2240",
            image: require('../../assets/img/danang.jpg')
        },
        {
            name: 'Cần Thơ',
            city: 'Cần Thơ',
            lat: "10.0333",
            lng: "105.7833",
            image: require('../../assets/img/cantho.jpg')
        },
        {
            name: 'Hồ Chí Minh',
            city: 'Ho Chi Minh City',
            lat: "10.7756",
            lng: "106.7019",
            image: require('../../assets/img/hochiminh.jpg')
        },
        {
            name: 'Huế',
            city: 'Huế',
            lat: "16.4667",
            lng: "107.5792",
            image: require('../../assets/img/hue.jpg')
        },
        // {
        //     name: 'Quảng nam',
        //     image: require('../../assets/img/hoian.jpeg')
        // }
    ]

    const [visible, setVisible] = useState(false)
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [items, setItems] = useState(CITY_LIST)

    // Hàm để ngăn không cho sự kiện onPress của cha lan truyền xuống con
    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    return (
        //Hide Keyboard when click outside TextInput
        <DismissKeyboard>
            <View>
                {/* Modal to hide setting when clicking outside */}
                <Modal
                    transparent
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* Sử dụng stopPropagation để ngăn sự kiện lan truyền */}
                            <TouchableWithoutFeedback onPress={stopPropagation}>
                                {/* setting */}
                                {visible &&
                                    <View style={styles.setting}>
                                        <TouchableOpacity>
                                            <Text style={styles.settingText}>Chia sẻ</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={styles.settingText}>Cài đặt</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>


                <ImageBackground source={require('../../assets/img/background.jpg')} style={styles.backgroundImg} imageStyle={{ opacity: 0.8, backgroundColor: '#000' }} />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setVisible(true)}>
                            <IonIcon name="menu" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }}>
                            <Image source={require('../../assets/img/user.png')} style={styles.user} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerMain}>
                        <Text style={styles.title}>Weather App</Text>
                        <Text style={styles.searchText}>Search city by the name</Text>

                        <View style={styles.formSearch}>
                            {/* <TextInput
                                placeholder='Enter the city'
                                placeholderTextColor={'#fff'}
                                style={styles.searchInput}
                                value={city}
                                onChangeText={(val) => setCity(val)}
                            />
                            <TouchableOpacity onPress={() => { props.navigation.navigate('Detail', { name: city }) }}>
                                <IonIcon name="search" style={styles.icon} />
                            </TouchableOpacity> */}

                            <DropDownPicker
                                open={open}
                                TouchableOpacity={false}
                                searchable
                                searchPlaceholder='Type the city name'
                                searchTextInputStyle={{
                                    borderColor: COLORS.accent,
                                    fontWeight: '700',
                                    fontSize: 15
                                }}
                                searchContainerStyle={{
                                    paddingVertical: 15,
                                    // borderBottomColor: COLORS.accent
                                }}
                                placeholder='Select a city'
                                placeholderStyle={{
                                    color: COLORS.darkGrey,
                                }}
                                containerStyle={{
                                    marginRight: 10,
                                    width: deviceWidth - 45
                                }}
                                labelStyle={{
                                    color: COLORS.primary,
                                    fontWeight: 'bold',
                                    fontSize: 20
                                }}
                                listItemLabelStyle={{
                                    color: COLORS.primary,
                                    fontWeight: '700',
                                }}
                                showTickIcon={false}
                                dropDownContainerStyle={{
                                    borderColor: COLORS.primary,

                                }}
                                ArrowUpIconComponent={() =>
                                    <IonIcon name='chevron-up-sharp' size={20} color={COLORS.accent} />
                                }
                                ArrowDownIconComponent={() =>
                                    <IonIcon name='chevron-down-sharp' size={20} color={COLORS.accent} />
                                }
                                value={value}
                                items={items.map(({ city }) => ({
                                    label: city,
                                    value: city
                                }))}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                onSelectItem={(item) => {
                                    // Chuyển tới trang Detail và truyền giá trị city
                                    props.navigation.navigate('Detail', { city: item.value });
                                }}
                            />
                        </View>

                        <View style={styles.locationList}>
                            <Text style={styles.locationListText}>Locations</Text>
                            <FlatList
                                horizontal
                                data={cities}
                                renderItem={({ item }) => (
                                    <Card name={item.name} image={item.image} city={item.city} navigation={props.navigation} />
                                )}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </DismissKeyboard >
    )
}

export default Home