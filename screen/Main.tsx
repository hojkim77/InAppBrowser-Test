/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Alert,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

{
  //? For navigation
  /*
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
 */
}

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

//? For react-hook-form
import {useForm, Controller} from 'react-hook-form';

async function openInAppBrowser() {
  try {
    const url = 'https://github.com/proyecto26';
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        //* iOS Properties
        //dismissButtonStyle: 'cancel',
        //preferredBarTintColor: '#453AA4',
        //preferredControlTintColor: 'white',
        //readerMode: false,
        //animated: true,
        //modalPresentationStyle: 'fullScreen',
        //modalTransitionStyle: 'coverVertical',
        //modalEnabled: true,
        //enableBarCollapsing: false,

        //* Android Properties
        showTitle: true,
        toolbarColor: '#6200EE',
        secondaryToolbarColor: 'black',
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        headers: {
          'my-custom-header': 'my custom header value',
        },
      });
      await this?.sleep(800);
      console.log(JSON.stringify(result));
      Alert.alert(JSON.stringify(result));
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    console.log(error);
    //Alert.alert(error.message);
  }
}

function MainScreen() {
  const isDarkMode = useColorScheme() === 'light';

  //const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {/**
           *  //? test 페이지 이동
           */}
          <Pressable onPress={openInAppBrowser}>
            <Text
              style={{
                backgroundColor: 'gray',
                color: 'white',
                fontSize: 24,
                alignSelf: 'center',
                marginTop: 24,
              }}>
              InAppBrowserTest
            </Text>
          </Pressable>
          <Pressable onPress={openInAppBrowser}>
            <Text
              style={{
                backgroundColor: 'gray',
                color: 'white',
                fontSize: 24,
                alignSelf: 'center',
                marginTop: 24,
              }}>
              ReactHookFormTest
            </Text>
          </Pressable>
          {/**
           *  //? react-hook-form Test_1
           */}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="First name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text>This is required.</Text>}
          {/**
           *  //? react-hook-form Test_2
           */}
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Last name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastName"
          />
          {errors.lastName && <Text>This is required.</Text>}
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MainScreen;
