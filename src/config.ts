declare var window: any;

const config = {
    WEATHER_API: window.AppConfig ? window.AppConfig.WEATHER_API : ''
}

export default config;