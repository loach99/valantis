import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { fetchGetProductByName, fetchGetProductByPrice } from "../redux/itemSlice";

const Search = () => {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState();
    const [input, setInput] = useState();

    useEffect(()=>{
        if(filter === 'product'){
            setTimeout(()=> dispatch(fetchGetProductByName(input)),1000)   
        }
        if (filter === 'price') {
            setTimeout(()=>dispatch(fetchGetProductByPrice(Number(input))),1000)
        }
    },[filter, input])

    return (
        <>
            <div style={{
                border: '1px solid black',
                padding: '5px',
                cursor: 'pointer'
            }}>ПОИСК</div>
            <div>
                <div>
                    <input onChange={(e) => setFilter(e.target.value)} type="radio" id="product" name="search" value="product" />
                    <label htmlFor="product">ПО НАЗВАНИЮ</label>
                </div>

                <div>
                    <input onChange={(e) => setFilter(e.target.value)} type="radio" id="price" name="search" value="price" />
                    <label htmlFor="price">ПО ЦЕНЕ</label>
                </div>

                <form action="" style={{
                    display: 'flex'
                }}>
                    <input onChange={(e) => {setInput(e.target.value) }} style={{
                        height: '27px'
                    }} type="text" />
                    <button style={{
                        height: '31px',
                        backgroundColor: '#fff',
                        outline: '0'
                    }}>Enter</button>
                </form>
            </div>
        </>

    );
}

export default Search;