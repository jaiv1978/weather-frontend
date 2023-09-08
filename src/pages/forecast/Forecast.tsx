import { Box, styled } from '@mui/material';

import ForecastForm from '../../features/forecast/components/ForecastForm';
import ForecastList from '../../features/forecast/components/ForecastList';

const PageContainer = styled(Box)(() => ({
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '2rem 2rem'
}));

const Forecast = () => {
    return (
        <PageContainer>
            <ForecastForm />
            <ForecastList />
        </PageContainer>
    );
}

export default Forecast;