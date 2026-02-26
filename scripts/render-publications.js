// Store all publications and heights globally
let allPublications = [];
let isExpanded = false;
let collapsedHeight = null;
let expandedHeight = null;

// Render all publications once
function renderAllPublications() {
	const publicationList = document.querySelector('.publication-list');
	if (!publicationList) {
		console.error('Publication list container not found');
		return;
	}
	
	// Clear existing content
	publicationList.innerHTML = '';
	
	// Render all publications
	allPublications.forEach((publication) => {
		const entry = document.createElement('div');
		entry.className = 'publication-entry';
		
		const venue = document.createElement('div');
		venue.className = 'venue';
		venue.textContent = publication.venue;
		
		const title = document.createElement('div');
		title.className = 'title';
		
		const link = document.createElement('a');
		link.href = publication.pdf;
		link.textContent = publication.title;
		
		title.appendChild(link);
		entry.appendChild(venue);
		entry.appendChild(title);
		
		publicationList.appendChild(entry);
	});
	
	// Calculate heights after rendering
	calculateHeights();
}

// Calculate collapsed and expanded heights
function calculateHeights() {
	const publicationList = document.querySelector('.publication-list');
	if (!publicationList) return;
	
	// Calculate expanded height (all publications)
	expandedHeight = publicationList.scrollHeight;
	
	// Calculate collapsed height (first 5 publications fully visible)
	const entries = publicationList.querySelectorAll('.publication-entry');
	if (entries.length >= 5) {
		let height = 0;
		for (let i = 0; i < 4; i++) {
			height += entries[i].offsetHeight + 16; // 16px margin between publications
		}
        height += entries[4].offsetHeight / 3.0 * 2;
		collapsedHeight = height;
	} else {
		// If less than 5 publications, collapsed = expanded
		collapsedHeight = expandedHeight;
	}
}

// Toggle between expanded and collapsed view with slide animation
function togglePublications() {
	const publicationList = document.querySelector('.publication-list');
	const fullListLink = document.querySelector('.full-publications-link');

	if (!publicationList) return;

	// Clean up any previous transition listener
	publicationList.removeEventListener('transitionend', handleTransitionEnd);

	if (!isExpanded) {
		// Expand: animate from collapsedHeight -> expandedHeight
		// Remove fade effect
		publicationList.classList.remove('has-fade');
		
		// Start from collapsed height
		publicationList.style.maxHeight = collapsedHeight + 'px';
		// Force reflow
		publicationList.offsetHeight;
		// Animate to expanded height
		publicationList.style.maxHeight = expandedHeight + 'px';

		publicationList.addEventListener('transitionend', handleTransitionEnd);

		function handleTransitionEnd(e) {
			if (e.propertyName !== 'max-height') return;
			publicationList.removeEventListener('transitionend', handleTransitionEnd);
			isExpanded = true;
			if (fullListLink) {
				fullListLink.textContent = 'show less';
			}
		}
	} else {
		// Collapse: animate from expandedHeight -> collapsedHeight
		// Add fade effect
		publicationList.classList.add('has-fade');
		
		// Start from expanded height
		publicationList.style.maxHeight = expandedHeight + 'px';
		// Force reflow
		publicationList.offsetHeight;
		// Animate to collapsed height
		publicationList.style.maxHeight = collapsedHeight + 'px';

		publicationList.addEventListener('transitionend', handleTransitionEnd);

		function handleTransitionEnd(e) {
			if (e.propertyName !== 'max-height') return;
			publicationList.removeEventListener('transitionend', handleTransitionEnd);
			isExpanded = false;
			if (fullListLink) {
				fullListLink.textContent = 'show more';
			}
		}
	}
}

// Load and render publications from JSON file
async function loadPublications() {
	try {
		const response = await fetch('publications.json');
		if (!response.ok) {
			throw new Error('Failed to load publications');
		}
		allPublications = await response.json();
		
		// Render all publications once
		renderAllPublications();
		
		// Set initial collapsed state with fade
		const publicationList = document.querySelector('.publication-list');
		if (publicationList && collapsedHeight) {
			publicationList.classList.add('has-fade');
			publicationList.style.maxHeight = collapsedHeight + 'px';
		}
		
		// Set up click handler for full publications link
		const fullListLink = document.querySelector('.full-publications-link');
		if (fullListLink) {
			fullListLink.addEventListener('click', function(e) {
				e.preventDefault();
				togglePublications();
			});
		}
	} catch (error) {
		console.error('Error loading publications:', error);
	}
}

// Load publications when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', loadPublications);
} else {
	loadPublications();
}
