import React, { useState } from "react";
import { faSun, faCloudSun, faCloud, faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import nubes01 from "../../../src/img/nubes03.mp4";

const URL_BASE = "https://api.openweathermap.org/data/2.5/weather?appid=xxxxxxxxaquilakeyxxxxxxxxx&units=metric&lang=es&"

// key  
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

const Home = () => {
	const [searchWeather, setSearchWaether] = useState({
		city: "",
		country: "",
		humidity: "",
		feels_like: "",
		weather: "",
		description:""
	})

	const weatherIcons = {
		"soleado": faSun,
		"cielo claro": faSun,
		"nuboso": faCloudSun,
		"muy nuboso": faCloud,
		"lluvioso": faCloudRain,
	};

	const weatherDescription = weather?.weather[0]?.description.toLowerCase() || "";
	const weatherIcon = weatherIcons[weatherDescription] || faCloud; // Por defecto, muestra una nube.

	const [weather, setWeather] = useState(null)
	const handleChange = (event) => {
		setSearchWaether({
			...searchWeather,
			[event.target.name]: event.target.value
		})
	}
	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			if (searchWeather.city.trim() === "" || searchWeather.country.trim() === "") {
				console.log("Campos vacios")
				return
			}
			const response = await fetch(`${URL_BASE}q=${searchWeather.city},${searchWeather.country}`)
			const data = await response.json()
			setWeather(data)
			console.log(data)

		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="video-container">
			<video
				className="background-video"
				autoPlay
				loop
				muted
			>
				<source src={nubes01} type="video/mp4" />

			</video>
			<div className="container" id="contenedor1">
				<div className="row container" id="contenedor2">
					<div className="col-12 border border-light">
						<h1 className="text-center">Aplicación del clima</h1>
					</div>
					<div className="col-12 col-md-6 border border-light p-3">
						<form
							onSubmit={handleSubmit}
						>
							<div className="form-group">
								<label htmlFor="city"><strong>Ciudad:</strong></label>
								<input
									type="text"
									className="form-control"
									placeholder="Escribe la ciudad"
									id="city"
									name="city"
									onChange={handleChange}
								/>
							</div>
							<div className="form-group mt-3">
								<label htmlFor="country"><strong>País:</strong></label>
								<select
									className="form-control"
									id="country"
									name="country"
									onChange={handleChange}
								>
									<option value="">Selecciona un país</option>
									<option value="DEU">Alemania</option>
									<option value="AUS">Australia</option>
									<option value="ESP">España</option>
									<option value="FRA">Francia</option>
									<option value="IT">Italia</option>
									<option value="MX">Mexico</option>
									<option value="GBR">Reino Unido</option>
									<option value="US">USA</option>
									<option value="VE">Venezuela</option>
								</select>
							</div>
							<button
								className="w-100 mt-3"
							><span className="text">Consultar clima</span></button>
						</form>
					</div>
					<div
						className="col-12 col-md-6 d-flex justify-content-center align-items-center border border-light p-3">  {/* si no colocamos el ternario abajo la app sin datos dice NAN */}
						{
							!weather ? "Aún no has consultado el clima" :
								weather.cod === "404" ? "Verifica si la ciudad corresponde con el país" :
									<>
										<div>
											<p className="p-5 display-5 ">
												<strong>{Math.ceil(weather?.main?.temp)}c°</strong>  {/* math.ceil es para redondear hacia arriba un numero */}
											</p>
										</div>
										<div>
											<div className="d-flex">
												<h2>{weather?.name}</h2>
												<p>
													{weatherDescription}
													<FontAwesomeIcon icon={weatherIcon} className="mx-2" />
												</p>
											</div>
											<p>
												<span><strong>Temp-max: </strong></span> {Math.ceil(weather?.main?.temp_max)}c° .
											</p>
											<p>
												<span><strong>Temp-min: </strong></span> {Math.ceil(weather?.main?.temp_min)}c° .
											</p>
											<p>
												<span><strong>Sensacion térmica: </strong></span> {Math.ceil(weather?.main?.feels_like)}c° .
											</p>
											<p>
												<span><strong>Humedad: </strong></span> {Math.ceil(weather?.main?.humidity)}% .
											</p>
										</div>
									</>
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
