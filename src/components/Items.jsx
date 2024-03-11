/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
function Items({ currentItems }) {
    const {error} = useSelector(state => state.product);

    return (
        <div style={{
            display:'flex',
            flexWrap:'wrap',
            gap:'50px',
            justifyContent:'center'
        }}>
            
            {error && <h1>{error}</h1>}
            {currentItems &&
                currentItems.map((product) => (
                    <div key={product.id} style={{
                        alignItems:'flex-start',
                        backgroundColor:'rgba(0,0,0,.1)',
                        borderRadius:'15px',
                        width:'15%',
                        padding:'15px',
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'space-between'
                    }}>
                        <div style={{
                            fontSize:'1.2rem'
                        }}>{product.product}</div>
                        <span>{product.brand}</span>
                        <div style={{
                            fontSize:"1rem",
                            marginTop: '30px',
                        }}>{product.price}руб</div>
                    </div>
                ))}
        </div>
    );
}

export default Items