import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES_CREATED_AT, GET_REPOSITORIES_RATING_AVERAGE } from '../queries';

const useRepositories = ({first, selectedOrderingPrinciple, searchKeyword}) => {
  const [repositories, setRepositories] = useState();
  const [query, setQuery] = useState(GET_REPOSITORIES_CREATED_AT);
  const [variables, setVariables] = useState({orderBy: "CREATED_AT", searchKeyword});

  useEffect(() => {
    if(selectedOrderingPrinciple === 'latestRepo') {
      setVariables({first, orderBy: "CREATED_AT", searchKeyword})
      setQuery(GET_REPOSITORIES_CREATED_AT)
    }
    else if(selectedOrderingPrinciple === 'highestRatedRepo') {
      setVariables({first, orderBy: "RATING_AVERAGE", orderDirection: "DESC", searchKeyword})
      setQuery(GET_REPOSITORIES_RATING_AVERAGE)
    }
    else if(selectedOrderingPrinciple === 'lowestRatedRepo') {
      setVariables({first, orderBy: "RATING_AVERAGE", orderDirection: "ASC", searchKeyword})
      setQuery(GET_REPOSITORIES_RATING_AVERAGE)
    }
  }, [selectedOrderingPrinciple, searchKeyword])


  const {data, error, loading, fetchMore} = useQuery(query, {
    fetchPolicy: 'cache-and-network',
    variables
  })
  useEffect(() => {
    if(!data) {
      setRepositories(data)
    }
    else {
      setRepositories(data.repositories)
    }
    
  }, [data])

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if(!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,  
        ...variables,  
      },
     });
  }

  return { repositories, fetchMore: handleFetchMore, loading }
  
};

export default useRepositories;