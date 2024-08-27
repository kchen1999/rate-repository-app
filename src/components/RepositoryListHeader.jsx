import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import theme from '../theme';


const RepositoryListHeader = ({selectedOrderingPrinciple, setSelectedOrderingPrinciple, filteredRepo, setFilteredRepo}) => {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.mainBackground,
      fontSize: 16,
      paddingTop: 21,
      alignItems: 'center',
      borderStyle: 'none',
    },
    filteredRepoSearchBar: {
      backgroundColor: 'white',
      borderRadius: 6, 
    },
  });

    return (
      <View style={{padding: 21}}>
        <Searchbar
          value={filteredRepo}
          onChangeText={setFilteredRepo}
          style={styles.filteredRepoSearchBar}
        />
        <Picker
          style={styles.container}
          selectedValue={selectedOrderingPrinciple}
          prompt='Select an item...'
          onValueChange={(itemValue, itemIndex) =>
          setSelectedOrderingPrinciple(itemValue)}>
          <Picker.Item label="Latest repositories" value="latestRepo" />
          <Picker.Item label="Highest rated repositories" value="highestRatedRepo" />
          <Picker.Item label="Lowest rated repositories" value="lowestRatedRepo" />
        </Picker>
      </View>
    );
};

export default RepositoryListHeader;