import * as Keychain from 'react-native-keychain';

const getGeneric = async () => {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log(
        'Credentials successfully loaded for user ' + credentials.username,
      );
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
};

const setGeneric = async (username: string, password: string) => {
  await Keychain.setGenericPassword(username, password);
};

export {getGeneric, setGeneric};
