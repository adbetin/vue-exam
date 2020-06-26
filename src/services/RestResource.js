export default class RestResource{
    sendGetRequest(url){
        return fetch(url).then(response => response.json())
    }
}