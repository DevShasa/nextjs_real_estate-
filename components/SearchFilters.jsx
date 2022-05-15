import React, { useState } from 'react';
import { Flex, Select, Box, Input, Spinner, Button, InputGroup,  InputLeftElement} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaSearchLocation } from "react-icons/fa";
import { filterData, getFilterValues } from '../utils/filterData';
import { fetchApi, baseUrl } from "../utils/fetchApi";
import Link from 'next/link';

const SearchFilters = () => {
    const [filters, setFilters] =  useState(filterData)
    const [ displaySearch, setDisplaySearch ] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults ] = useState([]);
    const [spinner, setSpinner] = useState(false)

    const router = useRouter()
    const searchProperties = (filterValues) =>{
        const path = router.pathname; // Get current path
        const { query } = router; // Query parameters
        
        const values = getFilterValues(filterValues);
        // loop over the values
        values.forEach((item) =>{
            // append the values to query parameters
            if(item.value && filterValues[item.name]){
                query[item.name] = item.value
            }
        })

        router.push({pathname: path, query})
    }



    const searchFormSubmitHandler = (e)=>{
        e.preventDefault();
        
        const fetchData = async ()=>{
            try{
                setSpinner(true)
                const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm.trim()}&hitsPerPage=10`)
                setSearchResults(data.hits)
                setSpinner(false)
            }catch(error){
                alert("Ni kama kuko na kashida, async fetch request imeleta ngori")
                console.log(error)
            }
        };

        fetchData()
        
    }

    return (
        <Box>
            <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap" flex="1">
                {filters.map((filter)=>(
                    <Box key={filter.queryName}>
                        <Select 
                            onChange={(e) =>searchProperties({[filter.queryName]: e.target.value})}
                            placeholder = {filter.placeholder}
                            width ="fit-content"
                            p="2"
                            border="1px"
                            borderColor="blue.400"
                        >
                            {filter?.items?.map((item)=>(
                                <option key={item.name} value={item.value}>{item.name}</option>
                            ))}
                        </Select>
                    </Box>
                ))}
            </Flex>
            <Flex bg="gray.100" p="4" align="center">
                <Button 
                    onClick={()=>setDisplaySearch((previousValue) => !previousValue)} 
                    marginRight="3"
                    variant='solid'
                    border="1px"
                    borderColor="blue.500"
                    fontWeight="light"
                >
                    Search by word
                </Button>
                { displaySearch &&(
                    <form onSubmit={searchFormSubmitHandler}>
                        <InputGroup marginRight="3">
                            <InputLeftElement pointerEvents='none' >
                                {<FaSearchLocation/>}
                            </InputLeftElement>
                            <Input
                                placeholder="Enter search term"
                                color="grey.700"
                                value= {searchTerm}
                                onChange = {(e)=>setSearchTerm(e.target.value)}
                            />
                        </InputGroup>
                    </form>
                ) }
                {spinner && <Box marginLeft="5"><Spinner/></Box>}
            </Flex>
            {displaySearch && searchResults.length > 0 && (
                <Flex flexWrap="wrap">
                    {searchResults.map((property) =>(
                        <Link 
                            key={property.id} 
                            href={`/property/${property?.externalID}`} 
                            passHref
                        >
                            <Button p="2" m="3" border="1px" borderColor="green.300" cursor="pointer">
                                { property.name }
                            </Button>
                        </Link>

                    ))}
                </Flex>
            )}
        </Box>
    )
}

export default SearchFilters