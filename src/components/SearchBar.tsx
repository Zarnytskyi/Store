import { useEffect, useState } from 'react'

interface SearchBarProps {
  onChange: (val: string) => void;
}

const SearchBar = ({onChange}: SearchBarProps) => {

  const [inputvalue, setInputValue] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onChange(inputvalue);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputvalue, onChange]);
  return (
    <>
    <div className='flex justify-center'>
        <input type='text' 
          placeholder='Search' 
          value={inputvalue}
          onChange={(e)=>setInputValue(e.target.value)}
          className="border p-2 rounded w-10/12 "
        /><button onClick={() => setIsFilterOpen(prev => !prev)}>
  {isFilterOpen ? '↑' : '↓'}
</button>
    </div>
    {isFilterOpen && <div>Filters</div>}
    </>
  )
}

export default SearchBar