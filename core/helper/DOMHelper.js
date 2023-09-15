import StringHelper from "./StringHelper";

export default class DOMHelper {

	static addClass(element, css) {
		if (Array.isArray((css)) && css.length > 0) {
			css.forEach((cls) => {
				if (typeof cls === 'string' && cls.length > 0) element.classList.add(cls);
			});
		} else if (css) {
			css.split(' ').forEach((cls) => {
				if (typeof cls === 'string' && cls.length > 0) element.classList.add(cls);
			});
		}
	}

	static removeClass(element, css) {
		element.classList.remove(css);
	}

	static hasClass(element, css) {
		return element.classList.contains(css);
	}

	static toggleClass(element, css, classActive = null) {
		const hasClass = DOMHelper.hasClass(element, css);
		if (hasClass && classActive !== true) {
			DOMHelper.removeClass(element, css);
		} else if (classActive !== false && !hasClass) {
			DOMHelper.addClass(element, css);
		}
	}

	/**
	 *
	 * @param parent Element
	 * @param tag string
	 * @param css string|array|null
	 * @param innerText string|null
	 * @param onClick ()=>any|null
	 * @returns Element
	 */
	static createElement(parent, tag, css = null, innerText = null, onClick = null) {
		const el = document.createElement(tag);
		this.addClass(el, css);
		if (parent) {
			parent.appendChild(el);
		}
		if (innerText) {
			el.innerText = innerText;
		}
		if (onClick) {
			el.addEventListener('click', onClick);
		}
		return el;
	}

	static destroyElement(el) {
		if (el && el.parentNode && typeof el.parentNode.removeChild === 'function') {
			el.parentNode.removeChild(el);
		}
		if (el && typeof el.remove === 'function') {
			el.remove();
		}
	}

	static emptyElement(el) {
		if (el && el.textContent !== undefined) {
			el.textContent = '';
		}
	}

	static isFullscreen() {
		return (window.fullScreen || (window.innerWidth == screen.width && window.innerHeight == screen.height))
	}

	static openFullscreen(elem) {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.webkitRequestFullscreen) { /* Safari */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) { /* IE11 */
			elem.msRequestFullscreen();
		}
		DOMHelper.addClass(document.body, 'fullscreen');
	}

	static closeFullscreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) { /* Safari */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) { /* IE11 */
			document.msExitFullscreen();
		}
		DOMHelper.removeClass(document.body, 'fullscreen');
	}

	static instantEditor(element, setter, textarea = false) {
		if (element.dataset.instantEditor === '1') {
			return;
		}
		element.dataset.instantEditor = '1';
		const text = element.innerText;
		DOMHelper.emptyElement(element);
		const editor = DOMHelper.createElement(element, 'form', 'instant-editor');
		const input = DOMHelper.createElement(editor, textarea ? 'textarea' : 'input');
		input.value = text;
		if (textarea) {
			const cancel = DOMHelper.createElement(editor, 'button');
			cancel.innerText = 'Cancel';
			cancel.addEventListener('click', (e) => {
				e.stopPropagation();
				DOMHelper.destroyElement(editor);
				element.innerText = text;
				element.dataset.instantEditor = '0';
			});
			const save = DOMHelper.createElement(editor, 'input');
			save.setAttribute('type', 'submit');
			save.value = 'Save';
		} else {
			input.setAttribute('type', 'text');
		}
		input.focus();
		editor.addEventListener('submit', (e) => {
			e.preventDefault();
			e.stopPropagation();
			const value = input.value;
			DOMHelper.destroyElement(editor);
			element.dataset.instantEditor = '0';
			element.innerText = value;
			setter(value);
		});
		if (!textarea) {
			editor.addEventListener('focusout', (e) => {
				DOMHelper.destroyElement(editor);
				element.innerText = text;
				element.dataset.instantEditor = '0';
			});
		}
	}

	static magicEditor(element, setter, textarea = false) {
		const addHintIfNeeded = () => {
			if (element.innerText.length === 0) {
				element.innerText = '(edit)';
			}
		}
		addHintIfNeeded();
		element.style.cursor = 'text';
		element.addEventListener('click', () => {
			DOMHelper.instantEditor(
				element,
				(value) => {
					setter(value);
					addHintIfNeeded();
				},
				textarea
			);
		});
	}

	static stripHtmlTags(text) {
		return StringHelper.stripHtmlTags(text);
	}

}
