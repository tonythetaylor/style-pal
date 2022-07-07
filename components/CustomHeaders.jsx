import { Image } from 'react-native'

import logos from '../logos';

const ClthgLogoTitle = () => {
    return (
      <Image
        style={{ width: 100, height: 100, resizeMode: 'contain'}}
        source={require('../assets/CLTHG-logo.png')}
      />
    );
}

const PastLooksLogoTitle = () => {
    return (
      <Image
        style={{ width: 100, height: 100, resizeMode: 'contain'}}
        source={require('../assets/CLTHG-logo.png')}
      />
    );
}

export default {ClthgLogoTitle, PastLooksLogoTitle}