// Grid Component System
// Simplifies the complex grid HTML structure

class GridWrapper extends HTMLElement {
	connectedCallback() {
		this.classList.add('grid-wrapper');
	}
}

class GridCell extends HTMLElement {
	connectedCallback() {
		// Wait for children to be parsed - use setTimeout to defer until after parsing
		setTimeout(() => {
			this.processGridCell();
		}, 0);
	}
	
	processGridCell() {
		// Create the complex nested structure
		const wrapper = document.createElement('div');
		wrapper.className = 'grid-instance grid-border-lr';
		
		const borderTb = document.createElement('div');
		borderTb.className = 'grid-border-tb';
		
		const content = document.createElement('div');
		content.className = 'grid-content';
		
		// Move all child nodes from this element to content
		// Collect nodes using firstChild/nextSibling to handle live NodeList
		const nodesToMove = [];
		let node = this.firstChild;
		while (node) {
			nodesToMove.push(node);
			node = node.nextSibling;
		}
		
		// Move each node to content
		nodesToMove.forEach(node => {
			content.appendChild(node);
		});
		
		// Build the nested structure
		borderTb.appendChild(content);
		wrapper.appendChild(borderTb);
		
		// Replace this element with the wrapper
		if (this.parentNode) {
			this.parentNode.replaceChild(wrapper, this);
		}
	}
}

// Register custom elements
customElements.define('grid-wrapper', GridWrapper);
customElements.define('grid-cell', GridCell);
