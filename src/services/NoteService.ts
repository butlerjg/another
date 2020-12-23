import base from './Service'

const get = async() => 
{
  const res = await base.get('notes')

  if (!res.ok) return Promise.reject() 
  
  return await res.json()
}

const query = async(query: string) =>
{
  const res = await base.get(`notes/?query=${query}`)
  if (!res.ok) return Promise.reject()
  return await res.json();
}

const getById = async(id: number) => 
{

  const res = await base.get(`notes/?id=${id}`)
  if (!res.ok) return Promise.reject()
  return await res.json()
}

const post = async(note) =>
{
  try{
    const res = await base.post('notes', note)

    if (!res.ok) return Promise.reject()
     
    return await res.json();
  }
  catch (err)
  {
    return Promise.reject()
  }
}

const put = async(note) =>
{
  try {
  const res = await base.put(`notes/${note.id}`, note)
  if (!res.ok) return Promise.reject()
  return await res.json();
  }
  catch (err)
  {
    return Promise.reject()
  }
}

const remove = async(id: number) =>
{
  try {
    const res = await base.delete(`notes/?id=${id}`)
    if (!res.ok) return Promise.reject()
    return await res.json();
  }
  catch (err)
  {
    return Promise.reject()
  }
}

export {put, post, get, query, getById, remove};