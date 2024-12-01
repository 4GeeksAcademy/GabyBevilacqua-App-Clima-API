import React, { useState } from "react";

const URL_BASE = "https://api.openweathermap.org/data/2.5/weather?appid=d90906b8f92814f0140f64fea0437fb3&units=metric&lang=es&"

// key  d90906b8f92814f0140f64fea0437fb3
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

const Home = () => {
	const [searchWeather, setSearchWaether] = useState({
		city: "",
		country: ""
	})
	
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

		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<h1 className="text-center">Aplicacion del clima</h1>
				</div>
				<div className="col-12 col-md-6 border border-secondary p-3">
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
							<label htmlFor="country"><strong>Pais:</strong></label>
							<select
								className="form-control"
								id="country"
								name="country"
								onChange={handleChange}
							>
								<option value="">Selecciona un pais</option>
								<option value="ES">España</option>
								<option value="FR">Francia</option>
								<option value="IT">Italia</option>
								<option value="MX">Mexico</option>								
								<option value="US">USA</option>
								<option value="VE">Venezuela</option>
							</select>
						</div>
						<button
							className="btn btn-secondary w-100 mt-3"
						>Consultar clima</button>
					</form>
				</div>
				<div
					className="col-12 col-md-6 d-flex align-items-center border border-secondary p-3">  {/* si no colocamos el ternario abajo la app sin datos dice NAN */}
					{
						!weather ? "Aún no has consultado el clima" :
							weather.cod === "404" ? "Verifica si la ciudad corresponde con el país" : 
								<>
									<div>
										<p className="p-2 display-5 ">
											{Math.ceil(weather?.main?.temp)}c°  {/* math.ceil es para redondear hacia arriba un numero */}
										</p>
									</div>
									<div>
										<p>
											<span>Temp-max: </span> {Math.ceil(weather?.main?.temp_max)}c°
										</p>
										<p>
											<span>Temp-min: </span> {Math.ceil(weather?.main?.temp_min)}c°
										</p>
									</div>
								</>
					}
				</div>
			</div>
		</div>
	);
};

export default Home;
