import { Box, Flex, Spacer, Text, Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import ImageScrollbar from "../../components/ImageScrollbar";
import { baseUrl, fetchApi } from "../../utils/fetchApi";

const PropertyDetail = ({property})=>(
    <Box maxWidth="1000px" margin="auto" p="4">
        {property.photos && <ImageScrollbar data={property.photos}/>}
    </Box>
)
export default PropertyDetail

export async function getServerSideProps({params:{id}}){
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
    return{
        props:{
            property: data
        }
    }
}