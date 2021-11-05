let viewed = false;

document.addEventListener("DOMContentLoaded", function () {
  let viewBtn = document.getElementById("cookie-view");
  let deleteBtn = document.getElementById("cookie-delete");

  viewBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      viewCookies(tabs[0].url);
    });
  });
  deleteBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      deleteCookies(tabs[0].url);
    });
  });
});

function viewCookies(fullUrl) {
  if (viewed) {
    viewed = !viewed;
    document.getElementById("view-content").innerHTML = "";
  } else {
    viewed = !viewed;
    let urlObj = new URL(fullUrl);
    let url = urlObj.host;
    let view_content = document.getElementById("view-content");
    // view_content
    chrome.cookies.getAll({ domain: url }, function (cookie) {
      console.log(url);
      console.log(cookie.length);
      if (cookie.length == 0) {
        document.getElementById(
          "view-content"
        ).innerHTML = `<div class="text-warning">No cookies detected!</div>`;
      } else {
        var tablediv = document.createElement("div");
        tablediv.innerHTML = `<table class="table table-dark table-small table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Path</th>
          </tr>
        </thead>
        <tbody id="cookie-tbody">
        </tbody>
        </table>`;
        view_content.appendChild(tablediv);

        for (i = 0; i < cookie.length; i++) {
          console.log(JSON.stringify(cookie[i]));
          console.log(cookie[i].name);
          // view_content.append(JSON.stringify(cookie[i], undefined, 2));
          //   var div = document.createElement("div");
          //   div.innerHTML = `<div class="card m-1" style="background-color: rgb(44,44,44)">

          //     <h5 class="card-text">${cookie[i].name}</h5>
          //     <h5 class="card-text">${cookie[i].path}</h5>

          // </div>`;
          //   view_content.appendChild(div);
          var tr = document.createElement("tr");
          tr.innerHTML = `<td>${cookie[i].name}</td>
          <td>${cookie[i].path}</td>`;

          document.getElementById("cookie-tbody").appendChild(tr);
        }
      }
    });
  }
}

function deleteCookies(fullUrl) {
  let urlObj = new URL(fullUrl);
  let url = urlObj.host;
  chrome.cookies.getAll({ domain: url }, function (cookies) {
    for (var i = 0; i < cookies.length; i++) {
      console.log(cookies[i]);
      chrome.cookies.remove({
        url: "https://" + cookies[i].domain + cookies[i].path,
        name: cookies[i].name,
      });
    }
  });
  document.getElementById("view-content").innerHTML = "Cookies deleted!";
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  let fullUrl = tabs[0].url;
  let urlObj = new URL(fullUrl);
  let url = urlObj.host;
  document.getElementById("url-heading").innerHTML = `Cookies for ${url}`;
});
