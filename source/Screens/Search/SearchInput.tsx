import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { getWeekWeatherCity } from '../../Redux/weather/actions';
import Loader from './Loader';

type PropsType = {
  defaultValue: string;
};

const SearchInput = memo<PropsType>(({ defaultValue }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const onPressSearch = useCallback(() => {
    if (value.length > 3) {
      dispatch(getWeekWeatherCity(value));
    }
  }, [dispatch, value]);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <View style={[styles.container]}>
      <TextInput
        style={[styles.input]}
        placeholder={'Type city name...'}
        placeholderTextColor={'#8d8d8d'}
        onChangeText={setValue}
        value={value}
      />
      <TouchableOpacity style={[styles.icon]} onPress={onPressSearch}>
        <Icon name="search" size={40} color={'white'} />
      </TouchableOpacity>
      <Loader />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    color: '#fff',
    fontSize: 18,
    paddingHorizontal: 10,
    marginLeft: 20,
  },
  icon: {
    marginLeft: 15,
  },
});

export default SearchInput;
