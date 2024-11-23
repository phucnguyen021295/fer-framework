import AsyncStorage from '@react-native-async-storage/async-storage';

const _processInput = (input: any) => {
  if (input instanceof Date) {
    return JSON.stringify(input.getTime());
  }
  return JSON.stringify(input);
};

const _processOutput = (output: any) => {
  if (output === null) {
    return output;
  }
  let result;
  try {
    result = JSON.parse(output);
  } catch (e) {
    result = output;
  }
  return result;
};

const multiGet = async (keys: string[]) => {
  const _keys = await AsyncStorage.multiGet(keys);
  const result = {};
  _keys.forEach((item: any) => {
    Object.assign(result, {[item[0]]: _processOutput(item[1])});
  });

  return result;
};

export {_processInput, _processOutput, multiGet};
