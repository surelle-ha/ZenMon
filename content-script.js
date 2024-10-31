var audio = new Audio();
audio.src = "https://dl.dropboxusercontent.com/s/0pbdlm2rivzb452/notif.mp3?dl=0";
const manifest = chrome.runtime.getManifest();

window.onload = function() { 
  var style = document.createElement('style');
  style.innerHTML = `
  @keyframes backgroundColorPalette {
    0% { color: red; }
    25% { color: #60d394; }
    50% { color: red; }
    75% { color: #60d394; }
    100% { color: red; } 
  }
  @keyframes BorderColorPalette {
    0% { border-color: orangered; }
    25% { border-color: purple; }
    50% { border-color: green; }
    75% { border-color: red; }
    100% { border-color: green; } 
  }`;
  document.head.appendChild(style);
  var navigationBar = document.querySelector('[data-garden-id="chrome.nav"]');
  if (navigationBar) {
    navigationBar.style = "transition: all .2s ease;";
    navigationBar.style.background = "black";
  }

  var navigationLogo = document.querySelector('[data-garden-id="chrome.logo_nav_item"]');
  if (navigationLogo) {
    navigationLogo.style.color = "red";
    navigationLogo.setAttribute('title', 'Zendesk Support (ZenMon Activated)');
  }

  var zenmonTrigger = document.querySelector('[data-garden-id="chrome.brandmark_nav_item"]');
  if (zenmonTrigger) {
    zenmonTrigger.style = "animation-name: backgroundColorPalette;animation-duration: 10s;animation-iteration-count: infinite;animation-direction: alternate;cursor: pointer; transition: all .2s ease;";
    zenmonTrigger.setAttribute('title', `ZenMon v${manifest.version}`);
    zenmonTrigger.addEventListener("click", function() {
      if (switchElem.style.display === "none") {
        switchElem.style.display = "inline-block";
        menuDiv.style.display = "inline-block";
      } else {
        switchElem.style.display = "none";
        menuDiv.style.display = "none";
      }
    });
  }
};

// MENU OPTIONS
var menuDiv = document.createElement("div");
menuDiv.className = "custom-switch";
menuDiv.style.borderTopLeftRadius = "5px";
menuDiv.style.borderTopRightRadius = "5px";
menuDiv.style.borderBottomLeftRadius = "5px";
menuDiv.style.borderBottomRightRadius = "5px";
menuDiv.style.display = "none";
menuDiv.animate([
  { opacity: 0, transform: 'scale(0.5)' },
  { opacity: 1, transform: 'scale(1)' }
], {
  duration: 100,
  easing: 'ease-out'
});
menuDiv.style.position = "fixed";
menuDiv.style.padding = "20px";
menuDiv.style.width = "300px";
menuDiv.style.backdropFilter = "blur(6px)";
menuDiv.style.color = "white";
menuDiv.style.bottom = "20px";
menuDiv.style.right = "20px";
menuDiv.style.zIndex = "100000";
menuDiv.style.display = "inline-block";
menuDiv.style.verticalAlign = "middle";
menuDiv.style.border = "1px solid purple";
menuDiv.style.animation = "BorderColorPalette 5s infinite";

var PageHeaderMonitored = document.createElement("p");
PageHeaderMonitored.display = "none";
PageHeaderMonitored.innerText = "";
PageHeaderMonitored.style = "text-align:left;width:100%;color:black;border:1px solid inherit;";
menuDiv.appendChild(PageHeaderMonitored);

var TicketCounter = document.createElement("p");
TicketCounter.display = "none";
TicketCounter.innerText = "";
TicketCounter.style = "text-align:left;width:100%;color:black;border:1px solid inherit;";
menuDiv.appendChild(TicketCounter);

var BeforeTicketCounter = document.createElement("p");
BeforeTicketCounter.display = "none";
BeforeTicketCounter.innerText = "";
BeforeTicketCounter.style = "margin-bottom:20px;text-align:left;width:100%;color:black;border:1px solid inherit;";
menuDiv.appendChild(BeforeTicketCounter);

var loginBtn = document.createElement("input");
loginBtn.type = "button";
loginBtn.value = "Start Test-Notification";
loginBtn.style = "width:100%;background:black;color:white;border:1px solid white;transition: all .2s ease;";
loginBtn.addEventListener('mouseenter', () => { loginBtn.style.backgroundColor = 'white'; loginBtn.style.color = 'black'; loginBtn.style.border = '1px solid black'; });
loginBtn.addEventListener('mouseleave', () => { loginBtn.style.backgroundColor = 'black'; loginBtn.style.color = 'white'; loginBtn.style.border = '1px solid white'; });
loginBtn.addEventListener("click", function() {
  audio.play(); audio.addEventListener('ended', function() { audio.play(); });
  document.querySelector('[data-garden-id="chrome.nav"]').style.animation = "colorChange 1s infinite";
});
menuDiv.appendChild(loginBtn);

var UnresolvedBtn = document.createElement("input");
UnresolvedBtn.type = "button";
UnresolvedBtn.value = "Stop Test-Notification";
UnresolvedBtn.style = "width:100%;background:black;color:white;border:1px solid white;transition: all .2s ease;";
UnresolvedBtn.addEventListener('mouseenter', () => { UnresolvedBtn.style.backgroundColor = 'white'; UnresolvedBtn.style.color = 'black'; UnresolvedBtn.style.border = '1px solid black'; });
UnresolvedBtn.addEventListener('mouseleave', () => { UnresolvedBtn.style.backgroundColor = 'black'; UnresolvedBtn.style.color = 'white'; UnresolvedBtn.style.border = '1px solid white'; });
UnresolvedBtn.addEventListener("click", function() {
  audio.pause();
  document.querySelector('[data-garden-id="chrome.nav"]').style.background = "black"; 
  document.querySelector('[data-garden-id="chrome.nav"]').style.animation = "none";
});
menuDiv.appendChild(UnresolvedBtn);

var refreshSpeedSwitch = document.createElement("input");
refreshSpeedSwitch.type = "button";
refreshSpeedSwitch.value = "Refresh Speed: 5000";
refreshSpeedSwitch.style = "width:100%;background:black;color:white;border:1px solid white;transition: all .2s ease;";
refreshSpeedSwitch.addEventListener('mouseenter', () => { refreshSpeedSwitch.style.backgroundColor = 'white'; refreshSpeedSwitch.style.color = 'black'; refreshSpeedSwitch.style.border = '1px solid black'; });
refreshSpeedSwitch.addEventListener('mouseleave', () => { refreshSpeedSwitch.style.backgroundColor = 'black'; refreshSpeedSwitch.style.color = 'white'; refreshSpeedSwitch.style.border = '1px solid white'; });
let refreshSpeed = 5000;
refreshSpeedSwitch.addEventListener("click", function() {
  refreshSpeed = (refreshSpeed + 1000) > 10000 ? 1000 : (refreshSpeed + 1000);
  refreshSpeedSwitch.value = `Refresh Speed: ${refreshSpeed}`;
});
menuDiv.appendChild(refreshSpeedSwitch);

var alertColorNotif = document.createElement("style");
alertColorNotif.innerHTML = `
  @keyframes colorChange {
    0% { background-color: black; }
    50% { background-color: orangered; }
    100% { background-color: black; }
  }
`;
document.head.appendChild(alertColorNotif);

var switchElem = document.createElement("label");
switchElem.animate([
  { opacity: 0, transform: 'scale(0.5)' },
  { opacity: 1, transform: 'scale(1)' }
], {
  duration: 100,
  easing: 'ease-out'
});
switchElem.className = "custom-switch";
switchElem.style.verticalAlign = "middle";
var checkboxElem = document.createElement("input");
checkboxElem.type = "checkbox";
checkboxElem.style.display = "inline-block";
checkboxElem.style.verticalAlign = "middle";
checkboxElem.style.marginRight = "5px";
checkboxElem.addEventListener("change", function() {
  var initialTicketCount = document.querySelector('[data-test-id="views_views-header-counter"]').textContent.trim();
  var PageBeingMonitored = document.querySelector('[data-test-id="views_views-header"]').textContent.trim();
  if (this.checked) {
    refreshSpeedSwitch.style.display = 'none';
    setTimeout(function() {
      BeforeTicketCounter.innerHTML = `<b>Ticket Count Before</b>: ${initialTicketCount}`;
      PageHeaderMonitored.innerHTML = `<b>Monitoring</b>: ${PageBeingMonitored}`;
      console.log("ZD Started");
      var ticketCounter = document.querySelector('[data-test-id="views_views-header-counter"]');
      refreshPID = setInterval(function() {
        TicketCounter.innerHTML = `<b>Ticket Count Now</b>: ${ticketCounter.textContent}`;
        console.log(`Scraping Zendesk-DOM: ${ticketCounter.textContent}`);
        document.querySelector('[aria-label="Refresh views pane"]').click();
        if(ticketCounter.textContent.trim() <= initialTicketCount){
          audio.pause();
          document.querySelector('[data-garden-id="chrome.nav"]').style.background = "black"; 
          document.querySelector('[data-garden-id="chrome.nav"]').style.animation = "none";
        }else{
          audio.play(); audio.addEventListener('ended', function() { audio.play(); });
          document.querySelector('[data-garden-id="chrome.nav"]').style.animation = "colorChange 1s infinite";
        }
      }, parseInt(refreshSpeedSwitch.value.match(/\d+/)[0]));
    }, 2000);
  } else {
    refreshSpeedSwitch.style.display = 'inline-block';
    console.log("ZD Stopped");
    clearInterval(refreshPID);
    audio.pause();
    document.querySelector('[data-garden-id="chrome.nav"]').style.background = "black"; 
    document.querySelector('[data-garden-id="chrome.nav"]').style.animation = "none";
  }
});
switchElem.appendChild(checkboxElem);
var spanElem = document.createElement("span");
spanElem.className = "switch-text";
spanElem.innerText = "Zendesk Refresh Automation";
spanElem.style.display = "inline-block";
spanElem.style.verticalAlign = "middle";
spanElem.style.marginRight = "5px";
spanElem.style.color = "black";
switchElem.appendChild(spanElem);
menuDiv.appendChild(switchElem)

document.body.appendChild(menuDiv);