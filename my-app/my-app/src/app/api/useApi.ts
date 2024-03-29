// useApi.js
const useApi = async(url:any) => {
//`${baseUrl}${url}`
const res = await fetch(url);
if (!res.ok) {
  throw new Error('Failed to fetch data');
}
return res.json()
};

export default useApi;