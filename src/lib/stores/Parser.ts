export const parseContent = (content: string) => {
	let total_chars = 0;
	let c = content;
	let ps = c.split('<p>');
	for (let i = 0; i < ps.length; i++) {
		if (ps[i].includes('</p>')) {
			ps[i] = ps[i].split('</p>')[0];
		}
		if (ps[i].includes('<em>')) {
			ps[i] = ps[i].replace('<em>', '');
		}
		if (ps[i].includes('</em>')) {
			ps[i] = ps[i].replace('</em>', '');
		}
		if (ps[i].includes('<strong>')) {
			ps[i] = ps[i].replace('<strong>', '');
		}
		if (ps[i].includes('</strong>')) {
			ps[i] = ps[i].replace('</strong>', '');
		}
	}
	ps.shift();
	let h4s = c.split('<h4>');
	for (let i = 0; i < h4s.length; i++) {
		if (h4s[i].includes('</h4>')) {
			h4s[i] = h4s[i].split('</h4>')[0];
		}
	}
	h4s.shift();
	for (let i = 0; i < ps.length; i++) {
		total_chars += ps[i].length;
	}
	for (let i = 0; i < h4s.length; i++) {
		total_chars += h4s[i].length;
	}
	let chars: string = '';
	for (let i = 0; i < ps.length; i++) {
		chars += ps[i] + '...';
	}
	return { total_chars: total_chars, chars: chars };
};
