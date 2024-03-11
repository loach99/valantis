/* eslint-disable react/prop-types */
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import Items from './Items';
import { fetchGetProductByBrand, getCurrentPage } from '../redux/itemSlice';
import Search from './Search';
import SearchBrand from './SearchBrand';

function PaginatedItems({ itemsPerPage }) {

    const [isActive, setIsActive] = useState(false);
    const { brands, totalPageCount, products } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = products.slice(itemOffset, endOffset);
    const handlePageClick = (event) => {
        const newOffset = ((event.selected + 1) * itemsPerPage) % products.length;
        dispatch(getCurrentPage(event.selected + 1))
        setItemOffset(newOffset);
    };
    return (
        <>
            <div className='header' style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil(totalPageCount)}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className='pagination'
                />
                <SearchBrand
                    isActive={isActive}
                    setIsActive={setIsActive} />
            </div>
            <div style={!isActive ? {
                width: '100vw',
                backgroundColor: 'red',
                position: 'fixed',
                transition: '.5s',
                opacity: '0',
                visibility: 'hidden'
            } : {
                width: '100vw',
                backgroundColor: 'red',
                position: 'fixed',
                transition: '.5s',
                opacity: '1',
                visibility: 'visible'
            }}>
                <ul style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}>
                    {brands.map((brand, i) => {
                        if (brand) {
                            return (
                                <li style={{
                                    padding: '5px',
                                    width: '15%',
                                }} key={i}><a onClick={(e) => {
                                    e.preventDefault()
                                    dispatch(fetchGetProductByBrand(brand))
                                }} href=''>{brand}</a></li>
                            )
                        }
                    })}
                </ul>
            </div>
            <div onClick={() => setIsActive(false)} style={{
                display: 'flex',
                height:'100vh'
            }}>
                <div>
                    <Search />
                </div>
                <Items currentItems={currentItems} />
            </div>

        </>
    );
}
export default PaginatedItems
