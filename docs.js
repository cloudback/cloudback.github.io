  function swapGif(sender) {
    var src = sender.src 
    sender.src = sender.getAttribute('data-alt'); 
    sender.setAttribute('data-alt', src);
  }

  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
  }
  
  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  function eraseCookie(name) {
    createCookie(name, "", -1);
  }
    
  function applyStyle(theme) {
    const root = document.documentElement;
    switch (theme) {
      case "Light theme":
        root.style.setProperty("--scrollbar-background", "aliceblue");
        root.style.setProperty("--scrollbar-color", "#a7b8c0");
        root.style.setProperty("--body-background", "aliceblue");
        root.style.setProperty("--docs-menu-background", "aliceblue");
        root.style.setProperty("--docs-content-background", "white");
        root.style.setProperty("--search-results-background", "white");
        root.style.setProperty("--search-input-background", "aliceblue");
        root.style.setProperty("--page-border-color", "lightgrey");
        root.style.setProperty("--shadow-color", "#c0c1d2");
        root.style.setProperty("--custom-link-color", "#007bff");
        root.style.setProperty("--link-active-color", "#007bff");
        root.style.setProperty("--text-color", "#24292e");
        root.style.setProperty("--blur-background", "rgba(255, 255, 255, 0.2)");
        root.style.setProperty("--blur-background-backdrop", "rgba(255, 255, 255, 0.95)");
        break;
      case "Dark theme":
        root.style.setProperty("--scrollbar-background", "#2F3136");
        root.style.setProperty("--scrollbar-color", "#202225");
        root.style.setProperty("--body-background", "#2F3136");
        root.style.setProperty("--docs-menu-background", "#2F3136");
        root.style.setProperty("--docs-content-background", "#36393F");
        root.style.setProperty("--search-results-background", "#36393F");
        root.style.setProperty("--search-input-background", "#2F3136");
        root.style.setProperty("--page-border-color", "#555555");
        root.style.setProperty("--shadow-color", "#202225");
        root.style.setProperty("--custom-link-color", "#3094ff");
        root.style.setProperty("--link-active-color", "#3094ff");
        root.style.setProperty("--text-color", "#DCDDDE");
        root.style.setProperty("--blur-background", "rgba(54, 57, 63, 0.2)");
        root.style.setProperty("--blur-background-backdrop", "rgba(54, 57, 63, 0.95)");
        break;
    }
  }
  
  document.addEventListener("DOMContentLoaded", function (event) {
    var a = document.querySelector("a.active");
    if(a !== null)
    {
      a.scrollIntoView(false);
    }
    var themeSelect = document.getElementById("theme-select");
    var themeCookie = readCookie("mddocs-theme");
    if (themeCookie !== null) {
      themeSelect.value = themeCookie;
    } else {
      if (themeSelect.value !== null) {
        themeSelect.value = "Light theme";
      }
      createCookie("mddocs-theme", themeSelect.value, 365);
    }
    applyStyle(themeSelect.value);
    themeSelect.addEventListener("change", function () {
      var theme = this.value;
      createCookie("mddocs-theme", theme, 365);
      applyStyle(theme);
      var theme = readCookie("mddocs-theme") === "Dark theme" ? "dark" : "light";
      applyBlogTimeline(twttr, theme);
    });
    document.addEventListener("click", function (e) {
      var searchMenu = document.getElementById("menu-search-container");
      if (searchMenu !== null && searchMenu !== undefined && !searchMenu.contains(e.target)) {
        var searchResults = document.getElementById("search-results-container");
        searchResults.style.display = "none";
      }
    }, false);
  });
    
  twttr.ready(function (twttr) {
    var theme = readCookie("mddocs-theme") === "Dark theme" ? "dark" : "light";
    applyBlogTimeline(twttr, theme);
  });
  function applyBlogTimeline(twttr, theme) {
    var target = document.getElementById("blog-timeline");
    if (target !== null && target !== undefined){
      target.innerHTML = "";
      twttr.widgets.createTimeline(
        {
          sourceType: "profile",
          screenName: "CloudbackIt"
        },
        target, 
        {
          id: 'profile:CloudbackIt',
          theme: theme,
          tweetLimit: 3,
          chrome: "noheader, noborders, nofooter"
        }
      );
    }
  }

  function onFocus(input) {
    innerSearch(input);
  }
  function searchMenu(evt, input) {
    var code = evt.charCode || evt.keyCode;
    if (code === 27) {
      input.value = "";//clear input on escape btn
    }
    innerSearch(input);
  }
  function innerSearch(input) {
    var filter = input.value.toUpperCase();
    var searchResults = document.getElementById("search-results-container");
    if (filter.length >= 2) {
      var items = searchResults.getElementsByClassName("search-result-item");
      var foundResult = false;
      for (var i = 0; i < items.length; i++) {
        var s = items[i];
        if (s.innerText.toUpperCase().indexOf(filter) > -1) {
          s.style.display = "flex";
          foundResult = true;
        } else {
          s.style.display = "none";
        }
      }
      var nothingFound = document.getElementById("nothing-found");
      if (!foundResult) {
        nothingFound.style.display = "flex";
      } else {
        nothingFound.style.display = "none";
      }
      searchResults.style.display = "flex";
    } else {
      searchResults.style.display = "none";
    }
  }