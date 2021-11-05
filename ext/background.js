// chrome.browserAction.onClicked.addListener(function (tab) {
//   //Fired when User Clicks ICON
//   chrome.tabs.executeScript(
//     tab.id,
//     {
//       file: "./src/inject/cookiestuff.js",
//     },
//     function () {
//       console.log("Script Executed .. ");
//     }
//   );
//   chrome.extension.sendMessage({}, function (response) {
//     var readyStateCheckInterval = setInterval(function () {
//       if (document.readyState === "complete") {
//         clearInterval(readyStateCheckInterval);
//         console.log("Cookies");
//       }
//     }, 10);
//   });
// });
