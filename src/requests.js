const DOMAIN = "andyxu.io";
const URL_PREFIX = `https://api.${DOMAIN}/homepage`;

const URL_PROFILE = "/profile";
const URL_ACADEMIA_PROFILE = URL_PROFILE;

const URL_PROJECTS = "/_/items/posts?fields=*,picture.data.*";
const URL_FILE_PREFIX = `https://api.${DOMAIN}/files`;


export function get_about() {
	if (window.location.hostname.search("ust") !== -1) {
		return fetch(URL_PREFIX+URL_ACADEMIA_PROFILE).then(r=>r.json()); 
	}
	return fetch(URL_PREFIX+URL_PROFILE).then(r=>r.json());
}
 
export function get_projects() {
	return fetch(URL_PREFIX+URL_PROJECTS).then(r=>r.json());
}

export function file_url(url) {
	return URL_FILE_PREFIX + url.replace("/uploads/_","")
}