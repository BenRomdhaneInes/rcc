import React, {useState, useEffect} from 'react';
import { useQuery } from 'react-query'
import { allPokemons, fetchingAllTypes, fetchingTypesByName } from '../../apis/api'
import DetailsBox from '../details-box/details-box';
import Loader from '../loader/loader';
import PaginationBar from '../pagination-buttons/PaginationButtons';
import './style.css'
const Home = ()  => {
  const [filter, setFilter] = useState({limit: 20, offset:0})
  const [selectedType, setSelectedType] = useState('')
  const [count, setCount] = useState(0)
  const [countByType, setCountByType] = useState(0)
  const { 
    data: pokemonsData,
    isLoading: loadingPokemon,
    isError: isErrorPokemon,
    error: errorPokemon
  } = useQuery(
    ['filter', filter], allPokemons,
    {
      keepPreviousData: true,
    },
  )
  const { 
    data: allTypes,
    isLoading: loadingTypes,
    isError: isErrorTypes,
    error: errorTypes 
  } = useQuery(['fetchingAllTypes'], fetchingAllTypes)

  const { 
    data: typeData,
    isLoading: typeDataIsLoading,
    isError: typeDataIsError,
    error: typeDataError 
  } = useQuery(['fetchingTypesByName', selectedType], fetchingTypesByName)

  useEffect(() => {
    setCountByType(typeData?.pokemon?.length)
  },[typeData, selectedType])

  useEffect(() => {
    setCount(pokemonsData?.count)
  },[pokemonsData])

  const handelAllData = () =>{
    return (
      loadingPokemon ? (
        <Loader/>
      ) : isErrorPokemon ? (
        <div>Error: {errorPokemon.message}</div>
      ) : (
        <div>
          <div className='grid'>{pokemonsData?.results?.map((el, index) => <DetailsBox key={index} name={el.name}/>)}</div>
          {count > 20 && (
          <PaginationBar
            count={count}
            limit={filter?.limit}
            offset={filter?.offset}
            setOffset={(ind) =>
              setFilter((prev) => ({ ...prev, offset: ind }))
            }
          />
        )}
        </div>
      )
    )
  }

  const handelDataByType = () =>{
    return (
      typeDataIsLoading ? (
        <Loader/>
      ) : typeDataIsError ? (
        <div>Error: {typeDataError.message}</div>
      ) : (
        <div>
          <div className='grid'>{typeData?.pokemon?.slice(filter.offset, (filter.limit+filter.offset))?.map((el, index) => <DetailsBox key={index} name={el?.pokemon?.name}/>)}</div>
          {countByType > 20 && (
          <PaginationBar
            count={countByType}
            limit={filter?.limit}
            offset={filter?.offset}
            setOffset={(ind) =>
              setFilter((prev) => ({ ...prev, offset: ind }))
            }
          />
        )}
        </div>
      )
    )
  }

  console.log('filter', filter);
  
  return (
    <div className="container">
      {loadingTypes ? (
        <Loader/>
      ) : isErrorTypes ? (
        <div>Error: {errorTypes.message}</div>
      ) : (
        <div className="chip-wrapper">
          <span 
            className={`chip type-all ${selectedType === '' ? 'selected' : ''}`}  
            onClick={() => {
              setSelectedType('')
              setFilter(() => ({ ...filter, offset: 0 }))
            }}
          >
            {'all'}
          </span>
          {allTypes?.results?.filter(type => !['unknown', 'shadow'].includes(type.name))?.map((type, index) => 
          <span 
            className={`chip type-${type.name} ${type.name === selectedType ? 'selected' : ''}`} 
            key={index} 
            onClick={() => {
              setSelectedType(type.name)
              setFilter(() => ({ ...filter, offset: 0 }))
            }}
          >
            {type.name}
          </span>
          )}
        </div>
      )}

      {selectedType === '' ? 
      handelAllData() : 
      handelDataByType()
      }
    </div>
  )
}
export default Home