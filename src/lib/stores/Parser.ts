export const parseContent = (contents: any) => {
	let parsed_content: string = '';
	if (contents != null) {
		let json_contents = JSON.parse(contents);
		let content = json_contents.content;
		for (let i = 0; i < content.length; i++) {
			if (content[i].type === 'paragraph' || content[i].type === 'heading') {
				if (content[i].content) {
					parsed_content += content[i].content[0].text + ' ';
				}
			} else if (content[i].type === 'bulletList') {
				parsed_content += parseListItems(content[i].content) + ' ';
			}
		}
		return parsed_content;
	}
	return '';
};

const parseListItems = (listItems: any) => {
	let parsed_items: string = '';
	for (let i = 0; i < listItems.length; i++) {
		for (let j = 0; j < listItems[i].content.length; j++) {
			if (listItems[i].content[j].type === 'paragraph') {
				if (listItems[i].content[j].content)
					parsed_items += listItems[i].content[j].content[0].text;
			} else if (listItems[i].content[j].type === 'listItem') {
				parsed_items += parseListItems(listItems[i].content[j].content);
			}
		}
	}
	return parsed_items;
};
