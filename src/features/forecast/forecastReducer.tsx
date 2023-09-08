import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../store';
import axios from 'axios';
import { ForecastPeriodDto } from './entities/DTOs/forecastResponseDto';
import { FetchingStatus } from '../../common/enums';
import { ForecastRequestDto } from './entities/DTOs/forecastRequestDto';
import config from '../../config';

interface ForecastState {
    status: FetchingStatus;
    forecasts: ForecastPeriodDto[];
    error?: string;
}

const initialState = {
    status: FetchingStatus.none,
    forecasts: [],
    error: ''
} as ForecastState;

export const fetchForecast = createAsyncThunk('forecast/getByPostalAddress', async (getRequest: ForecastRequestDto) => {
        const { street, city, state, zip } = getRequest;
        const response = await axios.get(`${config.WEATHER_API}weather/forecast?street=${street}&city=${city}&state=${state}&zipCode=${zip}`);
        return response.data;
    }
)

export const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers:{
        updateFetchingStatus: (state, action: PayloadAction<FetchingStatus>) => {
            state.status = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchForecast.pending, (state) => {
                state.status = FetchingStatus.loading;
                state.forecasts = [];
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.status = FetchingStatus.succeeded;
                state.forecasts = action.payload
            })
            .addCase(fetchForecast.rejected, (state, action) => {
                state.status = FetchingStatus.failed;
                state.error = action.error.message;
            })
    }
});

export const { updateFetchingStatus } = forecastSlice.actions;
export const selectForecastInfo = (state: RootState) => state.forecast.forecasts;
export const selectForecastStatus = (state: RootState) => state.forecast.status;
export const selectForecastError = (state: RootState) => state.forecast.error;
export default forecastSlice.reducer;