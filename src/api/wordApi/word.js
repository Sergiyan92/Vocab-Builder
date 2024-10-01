import { ClientFetch } from "../ClientFetch";





export const getCategoryWord =()=>{
  return  ClientFetch.get('/words/categories')
}