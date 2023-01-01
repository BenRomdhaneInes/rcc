import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {fetchingPokemonByName } from '../../apis/api' 
import Loader from '../loader/loader';
import  './style.css'

const DetailsBox = ({name}) => {
  const [data, setData] = useState({})
  const navigate = useNavigate()

  const fetchingData = async () => {
    const res = await fetchingPokemonByName(name)
    setData(res)
  }

  useEffect(() => {
    fetchingData()
  }, [name])

  const className = data?.types?.map( ( { type } ) => 'type-' + type.name ).join( ' ' )


  return(
    <div className={`details-box ${className}`}
    onClick={()=>{
      navigate(`/details/${data.name}`)
    }}
    >
      {data ? (
      <>
      <div>
      <h2>{data.name}</h2>
      <div className="details-box-types">
      {
        data.types?.map( ( { type } ) => (
          <span className="type" key={type.name}>{type.name}</span>
        ))
      }
      </div>
      </div>
      <img alt={data.name} className='details-box-illustration' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`}/>
      </>
      ) : (<Loader />)}
    </div>
  )
}

export default DetailsBox