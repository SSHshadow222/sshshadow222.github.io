const { useState, useEffect } = React;

const initialMarkdownText = `
# Hello and welcome to my *React Markdown Previewer*!
## You can edit the text in the **Editor** and see the results in the **Previewer**
For example, if you want to create an HTML \`<h1></h1>\` element, start your paragraph with \`#\`

Below, you can see a short list of the most common markdowns:
+ Headers: \`# text\` 
+ Bold Text: - \`** text **\` or \`__ text__\`
+ Italic Text: - \`*text*\` or \`_text_\`
+ Lists: 
    1. Ordered: \`1 item\`
    1. Unordered: \`* item\`, \`+ item\` or \`- item\` 
+ Links: \`(your link name)[http://yourlink.com]\`
+ Images: \`!(your image name)[http://your_image_link.com]\`
+ Blockquotes: \`> text\`

If you are trying to write some inline code, use two backticks, and write your code in between. Otherwise, use 6. Like this:

\`\`\`javascript
console.log("Happy codding!"); // This is JavaScript!
\`\`\`

That's it! Start playing with the editor, and check out what it can do.

---

If you are interested in seeing other projects I've made, check out my [GitHub](https://github.com/SSHshadow222)
`;

// Components

const Toolbar = ({ title, icon, info, isMaximized, setIsMaximized }) => {
	// States 
	const [toggleBtnIcon, setToggleBtnIcon] = useState("fa fa-maximize");
	
	// Methods
	const handleToggleBtnClicked = (event) => {
		setIsMaximized(!isMaximized);
	}
	
	// Hooks 
	
	useEffect(() => {		// displaying the proper icon
		setToggleBtnIcon((isMaximized) ? "fa fa-minimize" : "fa fa-maximize");
	}, [isMaximized])
	
	return (
		<header className="bg-primary">	
			<strong><i className={"fa fa-" + icon} /> {title}</strong>
			<span className="toolbar-buttons">
				<button id="btn-toggle" className="btn btn-primary" onClick={handleToggleBtnClicked}>
					<i className={toggleBtnIcon} />
				</button>
			</span>
		</header>
	)
}

const Editor = ({ text, handleChange, isMaximized, setIsMaximized }) => {
  return (
    <div id="editor-wrapper" className={ "container-fluid" + (isMaximized ? " maximized-width maximized-height" : "") }>
      <Toolbar title="Editor" icon="code" info="markdown" isMaximized={isMaximized} setIsMaximized={setIsMaximized} />
      <textarea id="editor" value={text} onChange={handleChange} />
    </div>
  );
};

const Preview = ({ text, isMaximized, setIsMaximized }) => {
	// Methods
	
	const handleChange = () => {
		const parsedMarkdown = DOMPurify.sanitize(marked.parse(text, { breaks: true }));
		$("#preview").html(parsedMarkdown);
		$("img").addClass("img-fluid");
		$("a").attr({ "target": "_blank" })
	}
	
	// Hooks
	
	useEffect(handleChange, [text])
	
	return (
		<div id="preview-wrapper" className={ "container-fluid" + (isMaximized ? " maximized-width" : "") }>
			<Toolbar title="Previewer" icon="eye" isMaximized={ isMaximized } setIsMaximized={ setIsMaximized } />
			<div id="preview" className="container-fluid">
			</div>
		</div>
	);
};

const AppManager = () => {
	// States
	
	const [markdownText, setMarkdownText] = useState(initialMarkdownText);
	const [isEditorMaximized, setIsEditorMaximized] = useState(false);
	const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);
	
	// Methods
	
	const markdownTextChanged = (event) => {
		setMarkdownText(event.target.value);
	}
	
	return (
		<div className="wrapper">
			{!isPreviewMaximized && <Editor text={ markdownText } handleChange={ markdownTextChanged } isMaximized={ isEditorMaximized } setIsMaximized={ setIsEditorMaximized } />}
			{!isEditorMaximized && <Preview text={ markdownText } isMaximized={ isPreviewMaximized } setIsMaximized={ setIsPreviewMaximized } />}
		</div>
	);
}

ReactDOM.render(<AppManager />, document.getElementById("root"));