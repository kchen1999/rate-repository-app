import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../queries';


const useRepositories = () => {
  const [repositories, setRepositories] = useState();


  const {data, error, loading} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })
  useEffect(() => {
    if(!data) {
      setRepositories(data)
    }
    else {
      setRepositories(data.repositories)
    }
    
  }, [data])

  return { repositories, loading }
  
};

export default useRepositories;