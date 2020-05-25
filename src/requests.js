const DOMAIN = "andyxu.io";
const URL_PREFIX = `https://api.${DOMAIN}`;
const URL_FILE_PREFIX = `https://api.${DOMAIN}/files`;
const URL_ABOUT = "/_/items/keys?single=1&filter[key]=about";
const URL_PROJECTS = "/_/items/posts?fields=*,picture.data.*";

export function get_projects() {
	return fetch(URL_PREFIX+URL_PROJECTS).then(r=>r.json());
}

export function get_about() {
	return fetch(URL_PREFIX+URL_ABOUT).then(r=>r.json());
}
 
export function file_url(url) {
	return URL_FILE_PREFIX + url.replace("/uploads/_","")
}