import { useState, useEffect } from 'react';

import { fetchForecast, updateFetchingStatus } from '../forecastReducer';
import { useAppDispatch } from '../../../common/hooks/appRedux';
import { FetchingStatus } from '../../../common/enums';

interface SearchParameters {
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface SearchParametersErrors {
    street: boolean;
    city: boolean;
    state: boolean;
    zip: boolean;
}

export const useForecast = () => {
    const dispatch = useAppDispatch();

    const [ searchParameters, setSearchParameters ] = useState<SearchParameters>({
        street: '',
        city: '',
        state: '',
        zip: ''
    });

    const [ searchParametersErrors, setSearchParametersErrors ] = useState<SearchParametersErrors>({
        street: false,
        city: false,
        state: false,
        zip: false
    });

    useEffect(() => {
        return () => {
            dispatch(updateFetchingStatus(FetchingStatus.none));
        }
    }, [dispatch]);
    
    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        const searchParametersCopy = {...searchParameters};
        searchParametersCopy[id as keyof SearchParameters] = value.trim() as never;
        setSearchParameters(searchParametersCopy);
    }

    const handleSearchForecast = () => {
        if (!handleValidateForm()){
            return;
        }

        dispatch(fetchForecast({ 
            street: searchParameters.street, 
            city: searchParameters.city, 
            state: searchParameters.state,
            zip: searchParameters.zip
        }));
    }

    const handleValidateForm = () => {
        const searchParametersErrorsCopy = {...searchParametersErrors};
        searchParametersErrorsCopy.street = !searchParameters.street.length;
        searchParametersErrorsCopy.city = !!searchParameters.state.length && !searchParameters.city.length && !searchParameters.zip.length;
        searchParametersErrorsCopy.state = !searchParameters.state.length && !!searchParameters.city.length && !searchParameters.zip.length;
        searchParametersErrorsCopy.zip = !searchParameters.state.length && !searchParameters.city.length && !searchParameters.zip.length;
        setSearchParametersErrors(searchParametersErrorsCopy);
       
        return !searchParametersErrorsCopy.street &&
            !searchParametersErrorsCopy.city &&
            !searchParametersErrorsCopy.state &&
            !searchParametersErrorsCopy.zip;
    }

    return {
        state:{
            searchParameters,
            searchParametersErrors
        },
        api: {
            handleChangeText,
            handleSearchForecast
        }
    };
}