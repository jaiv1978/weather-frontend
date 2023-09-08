import { Box, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

import { useAppSelector } from '../../../common/hooks/appRedux';
import { selectForecastStatus } from '../forecastReducer';
import { useForecast } from '../hooks/useForecast';
import { FetchingStatus } from '../../../common/enums';

const CustomForm = styled(Box)(() => ({
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    maxWidth: '500px', 
    width: '100%'
}));

const ErrorLabel = styled('span')(() => ({
    color: 'red'
}));

const ForecastForm = () => {
    
    const {
        state:{
            searchParameters,
            searchParametersErrors
        },
        api: {
            handleChangeText,
            handleSearchForecast
        }
    } = useForecast();
    const fetchingStatus = useAppSelector(selectForecastStatus);

    return (
        <CustomForm gap={2}>
            <h2>Weather Forecast Module</h2>
            <Box sx={{ marginBottom: '1rem', textAlign: 'justify' }}>
                Welcome to the Weather Forecast module. Here you can find weather forecasts for the next 7 days by entering your postal address. You must enter Street + City + State Or Street + ZIP.
            </Box>
            <TextField 
                id="street" 
                label="Street" 
                variant="outlined" 
                value={searchParameters.street} 
                onChange={handleChangeText} 
                error={searchParametersErrors.street}
                fullWidth
            />
            { !!searchParametersErrors.street && <ErrorLabel>{'Street is mandatory'}</ErrorLabel> }

            <TextField 
                id="city" 
                label="City" 
                variant="outlined" 
                value={searchParameters.city} 
                onChange={handleChangeText} 
                error={searchParametersErrors.city} 
                fullWidth
            />
            { !!searchParametersErrors.city && <ErrorLabel>{"City is mandatory if you have entered a State or haven't entered a ZIP"}</ErrorLabel> }

            <TextField 
                id="state" 
                label="State" 
                variant="outlined" 
                value={searchParameters.state} 
                onChange={handleChangeText} 
                error={searchParametersErrors.state} 
                fullWidth
            />
            { !!searchParametersErrors.state && <ErrorLabel>{"State is mandatory if you have entered a City or haven't entered a ZIP"}</ErrorLabel> }
            
            <TextField 
                id="zip" 
                label="ZIP" 
                variant="outlined" 
                value={searchParameters.zip} 
                onChange={handleChangeText} 
                error={searchParametersErrors.zip} 
                fullWidth
            />
            { !!searchParametersErrors.zip && <ErrorLabel>{"ZIP is mandatory if you haven't entered a City and State"}</ErrorLabel> }

            <Button 
                id='searchForecastInfo'
                variant="contained" 
                startIcon={<SearchIcon />} 
                onClick={handleSearchForecast}
                disabled={fetchingStatus === FetchingStatus.loading}
            >
                Search
            </Button>
        </CustomForm>
    );
}

export default ForecastForm;