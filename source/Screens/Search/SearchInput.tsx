import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { getWeekWeatherCity } from '../../Redux/weather/actions';
import SearchButton from './SearchButton';

type PropsType = {
  defaultValue: string;
};

const SearchInput = memo<PropsType>(({ defaultValue }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const validate = value.length > 3;
  const onPressSearch = useCallback(() => {
    if (validate) {
      dispatch(getWeekWeatherCity(value));
    }
  }, [dispatch, value]);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <View style={[styles.container]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input]}
          placeholder={'Type city name...'}
          placeholderTextColor={'rgba(255,255,255, 0.6)'}
          onChangeText={setValue}
          value={value}
        />
      </View>
      <SearchButton
        onPress={onPressSearch}
        active={validate}
        style={styles.icon}
      />
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
  inputContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 5,
    backgroundColor: 'rgba(255,255,255, 0.04)',
    borderColor: 'rgba(255,255,255, 0.6)',
    borderWidth: 1,
  },
  input: {
    height: 40,
    color: 'rgba(255,255,255, 1)',
    fontSize: 18,
    paddingHorizontal: 10,
    marginTop: 1,
  },
  icon: {
    marginLeft: 15,
    marginRight: 5,
  },
});

export default SearchInput;
