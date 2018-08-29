console.log(chrome.devtools);

chrome.devtools.panels.create('Recore', 'icons/128.png', 'devtools.html',(panel) => {
  console.log(panel);
})
