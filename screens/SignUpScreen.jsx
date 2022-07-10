import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { async } from '@firebase/util';

const auth = getAuth();

const SignUpScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    displayName: '',
    email: '',
    password: '',
    error: ''
  })

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [ currentUser, setCurrentUser ] = useState();

  async function signUp() {
    if (email === '' || password === '') {
      setError({
        error: 'Email and password are mandatory.'
      })
      return;
    }
    try {
      // await createUserWithEmailAndPassword(auth, email, password)
      await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
      console.log(err)
    );

      await updateProfile(auth.currentUser, { displayName: displayName }).catch(
        (err) => console.log(err)
      );
      setCurrentUser(auth.currentUser)
    //   .then(userCredential => {
    //     updateProfile(userCredential.user, {displayName : displayName})   
    //  })
      // setCurrentUser(user)

      navigation.navigate('Sign In');
    } catch (error) {
      setError({
        error: error.message,
      })
    }
  }

 useEffect(() => {
  console.log('WHAT IS THE CURRENT USER? ::::', auth.currentUser)
  return () => {
    signUp();
  }
}, [currentUser]);



/* This would be called when store/state data is updated */
// useEffect(()=>{
//   console.log('\n CURRENT USER: -----> \n HERE: ', currentUser)
//   if (currentUser) {
//     updateProfile(currentUser, {
//       displayName: displayName
//     });
//   }
// }, [currentUser]);

  return (
    <View style={styles.container}>
      <Text>Signup screen!</Text>

      {!!error && <View style={styles.error}><Text>{error}</Text></View>}

      <View style={styles.controls}>
        <Input
          placeholder='Email'
          containerStyle={styles.control}
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={<Icon
            name='envelope'
            size={16}
          />}
        />

        <Input
          placeholder='Username'
          containerStyle={styles.control}
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
          leftIcon={<Icon
            name='user'
            size={16}
          />}
        />

        <Input
          placeholder='Password'
          containerStyle={styles.control}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          leftIcon={<Icon
            name='key'
            size={16}
          />}
        />

        <Button title="Sign up" buttonStyle={styles.control} onPress={signUp} />
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

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
    width: '100%'
  }
});

export default SignUpScreen;