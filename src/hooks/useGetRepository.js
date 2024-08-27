import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../queries';

const useGetRepository = ({first, id}) => {
  const [repository, setRepository] = useState();

  const {data, error, fetchMore, loading} = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {first, id},
  })
  useEffect(() => {
    if(!data) {
      setRepository(data)
    }
    else {
      setRepository(data.repository)
    }
    
  }, [data])

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if(!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,  
        first,
        id  
      },
     });
  } 

  return { repository, fetchMore: handleFetchMore, loading }
  
};

export default useGetRepository;