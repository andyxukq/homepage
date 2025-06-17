const authorLinks = {
    'Zhenghang Ren': 'https://home.cse.ust.hk/~zrenak/',
    'Kai Chen': 'https://home.cse.ust.hk/~kaichen/',
    'Junxue Zhang': 'https://snowzjx.me/'
};

function processAuthorLinks() {
    const elements = document.querySelectorAll('.authors');
    
    elements.forEach(element => {
        let content = element.innerHTML;
        Object.entries(authorLinks).forEach(([name, url]) => {
            const regex = new RegExp(`\\b${name}\\b`, 'g');
            content = content.replace(regex, `<a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>`);
        });
        element.innerHTML = content;
    });
}

document.addEventListener('DOMContentLoaded', processAuthorLinks); 