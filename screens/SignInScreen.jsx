import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const SignInScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  })

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <View style={styles.container}>
      {/* <Text>Signin screen!</Text> */}

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.controls}>
        <Input
          placeholder='Email'
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          leftIcon={<Icon
            name='envelope'
            size={16}
          />}
        />

        <Input
          placeholder='Password'
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon
            name='key'
            size={16}
          />}
        />

        <TouchableOpacity style={styles.control__button} onPress={signIn}>
          <Text style={styles.control__text}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.control__button} onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.control__text}>Register</Text>
        </TouchableOpacity>

        {/* <View>
           <Text title="Sign in" style={styles.control__text} onPress={signIn}>Click here to register</Text>
        </View> */}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    flex: 2,
    width: '100%',
    padding: 20
  },

  control: {
    marginTop: 10
  },
  control__button: {
    marginTop: 10,
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  control__text: {
    // flex: 1,
    // width: '100%',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
    // backgroundColor: 'blue'
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
    width: '100%'
  }
});

export default SignInScreen;