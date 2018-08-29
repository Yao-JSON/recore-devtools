console.log(chrome.devtools);

// chrome.devtools.panels.create('Recore', 'icons/128.png', 'devtools.html',(panel) => {
//   console.log(panel);
// })
/**
 * create Recore panel 
 */

 const { devtools, runtime } = chrome;
 
class CreateRecore {
  constructor() {
    this.isCreatedRecore = false; // 是否已经创建 Recore panel
    this.isPanelLoaded = false; // 是否已经加载 Recore panel
    this.isPanelShown = false;
    this.checkCount = 0; // 检查创建的次数
    this.checkVueInterval = null;
    this.init(); 
  }
  
  init() {
    this.createPanelIfHasRecore();
    this.checkVueInterval = setInterval(this.createPanelIfHasRecore.bind(this), 1000);
    // 监听 onMessage
    runtime.onMessage.addListener((request) => {
      if(request === 'recore-panel-load') {
        this.onPanelLoad();
      }
    })
  }

  createPanelIfHasRecore() {
    if(this.isCreatedRecore || this.checkCount ++ > 30) {
      clearInterval(this.checkVueInterval)
      return;
    }
    clearInterval(this.checkVueInterval)
    this.isCreatedRecore = true;
    this.isPanelLoaded = false;
    this.isPanelShown = false;
    devtools.panels.create('Recore', 'icons/128.png', 'devtools.html', (panel) =>{
      // panel loaded
      if(this.onPanelHidden) {
        panel.onShown.addListener(this.onPanelShown);
        panel.onHidden.addListener(this.onPanelHidden)
      }
    })
  }

  onPanelShown() {
    this.isPanelShown = true;
    runtime.sendMessage('recore-panel-shown');
    if(this.isPanelLoaded) {

    }
    console.log('Recore panel shown');
  }

  onPanelHidden() {
    this.isPanelShown = false;
    runtime.sendMessage('recore-panel-hidden');
    console.log('Recore panel hidden');
  }

  onPanelLoad() {
    this.isPanelLoaded = true;
  }
}


new CreateRecore();