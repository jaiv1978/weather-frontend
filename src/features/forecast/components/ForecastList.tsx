import { useEffect, useState } from 'react';
import { Box, Stack, styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppSelector } from '../../../common/hooks/appRedux';
import { selectForecastStatus, selectForecastInfo, selectForecastError } from '../forecastReducer';
import { FetchingStatus } from '../../../common/enums';
import ForecastCard from './ForecastCard';
import { ForecastPeriodDto } from '../entities/DTOs/forecastResponseDto';
import CustomSnackbar, { CustomSnackbarProps } from '../../../common/components/CustomSnackbar';

const ForecastContainer = styled(Box)(() => ({
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    maxWidth: '600px', 
    width: '100%',
    padding: '1rem'
}));

interface SnackbarParameters extends Omit<CustomSnackbarProps, 'onClose'> {}

const snackbarInitialParameters: SnackbarParameters = {
    message: '',
    open: false,
    severety: 'info'    
}

const ForecastList = () => {
    const [ snackbarParameters, setSnackbarParameters ] = useState<SnackbarParameters>(snackbarInitialParameters);
    const fetchingStatus = useAppSelector(selectForecastStatus);
    const forecastInfo = useAppSelector(selectForecastInfo);
    const forecastError = useAppSelector(selectForecastError);

    useEffect(() => {
        if (fetchingStatus === FetchingStatus.failed){
            setSnackbarParameters({
                message: forecastError ?? 'An error occurred while fetching forecasts.',
                open: true,
                severety: 'error'
            })
        }

        if (fetchingStatus === FetchingStatus.succeeded && !forecastInfo.length){
            setSnackbarParameters({
                message: 'No forecasts were found.',
                open: true,
                severety: 'warning'
            })
        }
    }, [fetchingStatus])

    const handleCloseSnackbar = () => setSnackbarParameters(snackbarInitialParameters);

    return(
        <ForecastContainer>
            {
                fetchingStatus === FetchingStatus.loading &&
                <CircularProgress />
            }
            {
                <Stack spacing={3}>
                    {
                        fetchingStatus === FetchingStatus.succeeded &&
                        forecastInfo.map((item: ForecastPeriodDto, index: number) => 
                            <ForecastCard forecastInfo={item} key={`forecast-${index}`} ></ForecastCard>
                        )
                    }
                </Stack>
            }
            <CustomSnackbar 
                open={snackbarParameters.open}
                message={snackbarParameters.message}
                severety={snackbarParameters.severety}
                onClose={handleCloseSnackbar}
            />
        </ForecastContainer>
    );
}

export default ForecastList;