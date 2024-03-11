import { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetFields, fetchGetId, fetchGetProduct, fetchGetProductCount } from './redux/itemSlice';
import PaginatedItems from './components/PaginatedItems';
import Spin from './components/Spin';
function App() {

  const dispatch = useDispatch();
  const { status, error, pageSize, currentPage, productsId } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchGetProductCount())
    dispatch(fetchGetFields())
  }, [])

  useEffect(() => {
    dispatch(fetchGetProduct(productsId))
  }, [currentPage, productsId, error])

  useEffect(() => {
    dispatch(fetchGetId({
      currentPage: currentPage * 50,
      pageSize: pageSize,
    }))
  }, [currentPage, error])

  return (
    <>
      {status === 'loading' && <Spin />}
      <PaginatedItems
        itemsPerPage={50} />
    </>

  )
}

export default App
