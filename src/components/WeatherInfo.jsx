import { Box, Typography } from "@mui/material"

export const WeatherInfo = ({weather}) => {
  return (
    <Box
        sx={{ mt:2, display:'grid', gap:2, textAlign:'center'}}
    >
        <Typography variant="h4" component="h2">
            {weather.city}, {weather.country}
        </Typography>
        <Box
            component="img"
            alt={weather.conditionText}
            src={weather.icon}
            sx={{margin:"0 auto"}}
        />
        <Typography variant="h5" component="h3">
            {weather.temp} °C
        </Typography>
        <Typography variant="h6" component="h4">
            {weather.conditionText}
        </Typography>

    </Box>
  )
}
