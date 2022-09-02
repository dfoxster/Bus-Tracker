const accessToken = 'pk.eyJ1IjoiZGZveHN0ZXIiLCJhIjoiY2w0ZWo0YTZnMDA3ODNicGd2NXZxNjR0ayJ9.H4ULqF4lRiutH6QnIxWZZQ';

const api_params = {
    method: "GET",
    host: "api.wmata.com",
    headers: {
        "api_key": "9b8eaebdd4b4487a848a0295d494c842"
    }
};

const mapDefault = {
    center: [-77.036466,38.897404],
    zoom: 14
}
export {
    accessToken,
    api_params,
    mapDefault
};