// export const weather = {
//     "coord": {
//         "lon": 38.9769,
//         "lat": 45.0328
//     },
//     "weather": [
//         {
//             "id": 800,
//             "main": "Clear",
//             "description": "ясно",
//             "icon": "01d"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 30.57,
//         "feels_like": 30,
//         "temp_min": 30.57,
//         "temp_max": 31.01,
//         "pressure": 1009,
//         "humidity": 37
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 3,
//         "deg": 350
//     },
//     "clouds": {
//         "all": 0
//     },
//     "dt": 1655742003,
//     "sys": {
//         "type": 2,
//         "id": 48809,
//         "country": "RU",
//         "sunrise": 1655689020,
//         "sunset": 1655745251
//     },
//     "timezone": 10800,
//     "id": 542420,
//     "name": "Краснодар",
//     "cod": 200
// }




export function getWeather(setState) {
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
    const token = "b3d44a5235d838a4b052e473b9672e2567345f76";

    const pos = ({ coords }) => {
        const { longitude, latitude } = coords;
        const query = { lon: longitude, lat: latitude, count: 1, language: "ru" }


        const options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify(query)
        }


        fetch(url, options)
            .then(response => response.json())
            .then(({ suggestions }) => {
                const city = suggestions[0].data.city;

                let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c2d82ff54c1f239cd7257a89a200de9b&lang=ru&units=metric`

                fetch(url)
                    .then(response => response.json())
                    .then(result => setState(() => result))
            })

        }

    window.clientInformation.geolocation.getCurrentPosition(pos);
}