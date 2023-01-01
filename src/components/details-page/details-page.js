import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import {fetchingPokemonByName } from '../../apis/api' 
import ProgressBar from '../progress-bar/progress-bar';
import placeholder from '../../images/pokeball.png'
import  './style.css'
import Loader from '../loader/loader';

const DetailsPage = () => {
  const [data, setData] = useState({})
  const {name} = useParams()

  const fetchingData = async () => {
    const res = await fetchingPokemonByName(name)
    setData(res)
  }

  useEffect(() => {
    fetchingData()
  }, [name])

  const className = data?.types?.map(({ type }) => 'type-' + type.name ).join( ' ' )

  console.log('data', data);


  return(
    data ? (
      <div className={`details-page container`}>
        <div className={`details-page-image ${className}`}>
          <img alt={data.name} className='details-box-illustration' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png` || placeholder}/>
        </div>
      <div className='details-page-content'>
        <h1 className={`details-page-title ${className}`}>{data.name}</h1>
        <div className="details-box-types">
        {
          data.types?.map( ( { type } ) => (
            <span className={`type type-${type.name}`} key={type.name}>{type.name}</span>
          ))
        }
        </div>
        <h3>Basic Info</h3>
        <table className='details-box-info'>
          <tr>
            <td><strong>Id :</strong></td>
            <td><span>#{data.id}</span></td>
          </tr>
          <tr>
            <td><strong>Weight :</strong></td>
            <td><span>{data.weight}Kg</span></td>
          </tr>
          <tr>
            <td><strong>Height :</strong></td>
            <td><span>{data.height}cm</span></td>
          </tr>
          <tr>
            <td><strong>Abilities :</strong></td>
            <td><span>{data?.abilities?.map(el => el?.ability?.name).join(', ')}</span></td>
          </tr>
        </table>
        <h3>Stats</h3>
        <table className='details-box-info'>
          {data?.stats?.map((el, index) => {
            return(
              <tr key={index}>
                <td><strong>{el.stat.name}: </strong></td>
                <td>{el.base_stat} <ProgressBar value={el.base_stat} max={200}/><span></span></td>
              </tr>
            )
          })}
        </table>
      </div>
      
    </div>
    ):(
      <div className={`details-page container`}><Loader/></div> 
    )
  )
}

export default DetailsPage