const appUrl = 'https://pokeapi.co/api/v2'

export const allPokemons = async ({ queryKey }) => {
  let res
  try {
    res = await fetch(`${appUrl}/pokemon/?offset=${queryKey[1].offset}&limit=${queryKey[1].limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
  } catch (error) {
    res = {
      error,
    }
  }
  return res
}

export const fetchingPokemonByName = async (name) => {
  let res
  try {
    res = await fetch(`${appUrl}/pokemon/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
  } catch (error) {
    res = {
      error,
    }
  }
  return res
}

export const fetchingTypesByName = async ({ queryKey }) => {
  let res
  try {
    res = await fetch(`${appUrl}/type/${queryKey[1]}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
  } catch (error) {
    res = {
      error,
    }
  }
  return res
}

export const fetchingAllTypes = async () => {
  let res
  try {
    res = await fetch(`${appUrl}/type/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
  } catch (error) {
    res = {
      error,
    }
  }
  return res
}