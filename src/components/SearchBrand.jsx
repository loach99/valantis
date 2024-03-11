/* eslint-disable react/prop-types */
const SearchBrand = ({isActive,setIsActive}) => {
    
    return (
        <div style={{
            border:'1px solid black',
            padding:'5px'
        }}
        onMouseEnter={()=>setIsActive(true)} onClick={()=>setIsActive(!isActive)}>BRAND</div>
    );
}

export default SearchBrand;