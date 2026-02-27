/**
 * Renders the full publications list on the publications page from publications.json.
 * Each entry shows: title (linked to PDF), authors, venue, venueFull.
 */
const authorLinks = {
	'Zhenghang Ren': 'https://home.cse.ust.hk/~zrenak/',
	'Kai Chen': 'https://home.cse.ust.hk/~kaichen/',
	'Junxue Zhang': 'https://snowzjx.me/',
	'Di Chai': 'https://di-chai.github.io/',
	'Binhang Yuan': 'https://binhangyuan.github.io/',
	'Yilun Jin': 'https://kl4805.github.io/',
	'Han Tian': 'https://tianhan4.github.io/',
	'Fan Lai': 'https://www.fanlai.me/',
	'Xinchen Wan': 'https://xcwanandy.github.io/',
	'Xudong Liao': 'https://xudongliao.github.io/',
	'Hao Wang': 'https://whwh1996.github.io/'
};

async function renderPublicationsPage() {
	const container = document.querySelector('.publication-list');
	if (!container) return;

	try {
		const response = await fetch('publications.json');
		if (!response.ok) throw new Error('Failed to load publications');
		const publications = await response.json();

		publications.forEach((pub) => {
			const entry = document.createElement('div');
			entry.className = 'publication-entry';

			const venueLine = document.createElement('div');
			venueLine.className = 'venue';
			if (pub.venueFull) {
				venueLine.appendChild(document.createTextNode(pub.venue + '   '));
				const venueFull = document.createElement('span');
				venueFull.className = 'venue-full';
				venueFull.textContent = pub.venueFull;
				venueLine.appendChild(venueFull);
			} else {
				venueLine.textContent = pub.venue;
			}
			entry.appendChild(venueLine);

			const title = document.createElement('div');
			title.className = 'title';
			const link = document.createElement('a');
			link.href = pub.pdf;
			link.textContent = pub.title;
			link.rel = pub.pdf.startsWith('http') ? 'noopener noreferrer' : '';
			if (pub.pdf.startsWith('http')) link.target = '_blank';
			title.appendChild(link);
			entry.appendChild(title);

			const authors = document.createElement('div');
			authors.className = 'authors';
			authors.textContent = pub.authors;
			entry.appendChild(authors);


			container.appendChild(entry);
		});
	} catch (err) {
		console.error('Error loading publications:', err);
		container.innerHTML = '<p class="publication-entry">Unable to load publications.</p>';
	}

	processAuthorLinks();
}

function processAuthorLinks() {
	const elements = document.querySelectorAll('.authors');
	const selfName = 'Kaiqiang Xu';
	
	elements.forEach(element => {
		let content = element.innerHTML;
		// Bold + underline for self
		const selfRegex = new RegExp(`\\b${selfName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
		content = content.replace(selfRegex, `<span class="author-self">${selfName}</span>`);
		// Links for other authors
		Object.entries(authorLinks).forEach(([name, url]) => {
			const regex = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
			content = content.replace(regex, `<a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>`);
		});
		element.innerHTML = content;
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', renderPublicationsPage);
} else {
	renderPublicationsPage();
}
