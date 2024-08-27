import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import RepositoryListHeader from './RepositoryListHeader';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderHeader = (selectedOrderingPrinciple, setSelectedOrderingPrinciple, filteredRepo, setFilteredRepo) => {
  return <RepositoryListHeader selectedOrderingPrinciple={selectedOrderingPrinciple} setSelectedOrderingPrinciple={setSelectedOrderingPrinciple}
          filteredRepoValue={filteredRepo} setFilteredRepo={setFilteredRepo}/>
}

export const RepositoryListContainer = ({ repositories, onEndReach, selectedOrderingPrinciple, setSelectedOrderingPrinciple, filteredRepo, setFilteredRepo }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <RepositoryItem item={item}/>}
        ListHeaderComponent={renderHeader(selectedOrderingPrinciple, setSelectedOrderingPrinciple, filteredRepo, setFilteredRepo)}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );

}

const RepositoryList = () => {
  const [selectedOrderingPrinciple, setSelectedOrderingPrinciple] = useState('latestRepo');
  const [filteredRepo, setFilteredRepo] = useState('')
  const [searchKeyword] = useDebounce(filteredRepo, 500);
  const { repositories, fetchMore } = useRepositories({first: 3, selectedOrderingPrinciple, searchKeyword});

  const onEndReach = () => {
    fetchMore();
  }

  return <RepositoryListContainer repositories={repositories} selectedOrderingPrinciple={selectedOrderingPrinciple} setSelectedOrderingPrinciple={setSelectedOrderingPrinciple}
          filteredRepoValue={filteredRepo} setFilteredRepo={setFilteredRepo} onEndReach={onEndReach}/>;
};

export default RepositoryList;