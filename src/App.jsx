import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { WeatherInfo } from "./components/WeatherInfo";

const API_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`

export const App = () => {

    //*Manejamos los estados de nuestra app
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        error: false,
        message: "",
    });
    const [weather, setWeather] = useState({
        city:"",
        country:"",
        temp:"",
        condition:"",
        icon:"",
        conditionText:"",
    })


    const onSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        setError({ error:false, message:"", })

        try {

            if(!city.trim()) throw { message: 'El campo ciudad es obligatorio' };
            
            //*Hacemos el fetch
            const response = await fetch(`${API_WEATHER}${city}`)
            const data = await response.json();
            //*Si hay un error en la peticion puedo manejarlo aca
            if(data.error) throw {message: data.error.message };
            
            //*Si sale todo bien establecemos los datos en nuestro estado
            setWeather({
                city:data.location.name,
                country:data.location.country,
                temp:data.current.temp_c,
                condition:data.current.condition.code,
                icon:data.current.condition.icon,
                conditionText:data.current.condition.text,
            })


        } catch (error) {
            setError({
                error: true,
                message: error.message
            })
        } finally {
            setLoading(false)   
        }
    }

  return (
    <Container
        maxWidth="xs"
        sx={{mt: 2}}
    >
        <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
        >
            Weather App
        </Typography>
        <Box
            sx={{display:"grid", gap:2}}
            component="form"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <TextField
                id="city"
                label="Ciudad"
                variant="outlined"
                size="small"
                required
                fullWidth
                value={city}
                onChange={(e)=> setCity(e.target.value)}
                error={error.error}
                helperText={error.message}
            />
            <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                loadingIndicator="Cargando..."
            >
                Buscar
            </LoadingButton>
        </Box>

        {weather.city&&(
            <WeatherInfo weather={weather}/>
        )}

        <Typography
            textAlign="center"
            sx={{mt: 2,fontSize:"10px"}}
        >
            Powered by: {" "}
            <a 
                href="https://www.weatherapi.com/"
                title="Weather API"
            >
                WeatherAPI.com
            </a>
        </Typography>
    </Container>
  )
}
