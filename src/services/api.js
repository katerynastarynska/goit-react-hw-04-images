const BASE_URL = "https://pixabay.com/api";
const KEY = '35341635-e8056e87c32d0b59c4040edf5';

export const getImages = async ({ searchQuery, limit, currentPage }) => {
console.log('query ', searchQuery)
    const response = await fetch(`${BASE_URL}/?q=${searchQuery}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${limit}`);
    if (!response.ok) {
        return Promise.reject(new Error("Bad request"));
    }
    return response.json();
};