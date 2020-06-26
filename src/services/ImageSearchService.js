import RestResource from "./RestResource";

const CLIENT_ID = 'M4h2fLH0CUHf2ifsx3jUJEgPuUff1nO4sgnVlkPJf84';
const URL_UNSPLASH = 'https://api.unsplash.com/search/photos';

export default class ImageSearchService{
    getImages(query, page, perPage){
        let url = new URL(URL_UNSPLASH);
        let params = {
            'page': page,
            'per_page': perPage,
            'query': query,
            'client_id': CLIENT_ID
        };
        url.search = new URLSearchParams(params).toString();

        let restResource = new RestResource();
        return restResource.sendGetRequest(url);
    }
}