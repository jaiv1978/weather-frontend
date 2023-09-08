import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { ForecastPeriodDto } from '../entities/DTOs/forecastResponseDto';
import { Stack } from '@mui/material';

interface ForecastCardProps {
    forecastInfo: ForecastPeriodDto;
}

const ForecastCard = ({
    forecastInfo
}: ForecastCardProps) => {
    const { detailedForecast, icon, endTime, name, startTime } = forecastInfo;

    return (
        <Card sx={{ width: '100%', backgroundColor: 'lightsteelblue' }}>
          <CardContent>
            <Stack direction='row' sx={{ justifyContent: 'space-between', paddingBottom: '1rem'}}>
                <Typography gutterBottom variant="h5" component="div">
                    {`Forecast for ${name}`}
                </Typography>
                <img src={icon} alt='weather icon'></img>
            </Stack>
            <Typography variant="body2" color="text.secondary">
                {detailedForecast}
            </Typography><br />
            <Typography variant='subtitle2'>{ `Start Date and Time: ${startTime.toLocaleString()}`}</Typography>
            <Typography variant='subtitle2'>{ `End Date and Time: ${endTime.toLocaleString()}`}</Typography>
          </CardContent>
        </Card>
      );
}

export default ForecastCard;