/* jquery : it's got the dollar sign because it's expensive! */
	var removeClass = function (el, className) {
	  if (el.classList)
	    el.classList.remove(className);
	  else
	    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    };

    var addClass = function (el, className) {
      if (el.classList)
        el.classList.add(className);
      else
        el.className += ' ' + className;
    };
    
    var toggleClass = function (el, className) {
      if (el.classList) {
        el.classList.toggle(className);
      } else {
        var classes = el.className.split(' ');
        var existingIndex = -1;
        for (var i = classes.length; i--;) {
          if (classes[i] === className)
            existingIndex = i;
        }
        if (existingIndex >= 0)
          classes.splice(existingIndex, 1);
        else
          classes.push(className);
      el.className = classes.join(' ');
      }
    };

    var hasClass = function (el, className) {
      if (el.classList) {
        return el.classList.contains(className);
      }
      else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
      }
    };

    var dropContent = function () {

    	var selectedButtons = document.querySelectorAll(".selected");
    	var leftId = "";
    	var rightId = "";

    	for(var i = 0; i < selectedButtons.length; i++) {
    		if (hasClass(selectedButtons[i], "last")) {
    			rightId = selectedButtons[i].id + "-content";
    		} else {
    			leftId = selectedButtons[i].id + "-content";
    		}
    	}

    	var leftContent = document.getElementById(leftId);
    	var rightContent = document.getElementById(rightId);
    	var dropZone = document.getElementById("dropzone");

    	[".title", ".grades", ".experience"].forEach(function(currentValue){
    		insertSection(leftContent, rightContent, currentValue, dropZone);
    	});

    	if (hasClass(dropzone, "inactive")) {
    		removeClass(dropzone, "inactive");
    	}

    };

    var insertSection = function (leftContent, rightContent, className, dropzone) {

    	
    	var section = dropzone.querySelector(className);
    	var leftSection = section.querySelector(".left");
    	var rightSection = section.querySelector(".right");
    	var leftContentSection = leftContent.querySelector(className);
    	var rightContentSection = rightContent.querySelector(className);
      
    	//insert content 

    	leftSection.innerHTML = '';
    	leftSection.innerHTML = leftContentSection.innerHTML;
    	rightSection.innerHTML = '';
    	rightSection.innerHTML = rightContentSection.innerHTML;

    };
    
  var onReady = function () {
    var dropdownLink = document.querySelector('div.dropdown');
    var dropdown = document.getElementById("dropdown");
    var rowtwo = document.querySelector("div.rowtwo");
    var icons = document.querySelector("div.icons");
    var hamburger = document.querySelector("div.hamburgerhelper");
    var leftnav = document.querySelector("div.leftnav");
    var hoverDropdown = document.querySelector("div.dropdown p");
    var list = document.querySelector("ul");
    var fixit = document.querySelector(".fixit");
    var main = document.querySelector(".main");
    var chevron = document.querySelector("i.fa.fa-chevron-down");
    var buttons = document.querySelectorAll(".buttons button");

    dropdownLink.addEventListener("click", function () {

      if (hasClass(dropdown, "open")) {
      	leave();
      }
      else {
      	ntr();
      }
    });

    hoverDropdown.addEventListener("mouseenter", function () {
    	if (!hasClass(dropdown, "open")) {
    		ntr();
    	}
    });

    dropdown.addEventListener("mouseleave", function () {
    	if (hasClass(dropdown, "open")) {
    		leave();
    	}
    });

    hamburger.addEventListener("click", function () {
		  /*toggleClass(fixit, "quick"); */
    	toggleClass(leftnav, "enter");
    	toggleClass(hamburger, "popup");
    	toggleClass(list, "animation");
    	toggleClass(main, "obfuscate");

    });

    for (var i = 0; i < buttons.length; i++) {

    	buttons[i].addEventListener("click", function(event) {

    		//previously selected is no more
    		var selected = document.querySelectorAll("button.selected");

    		if (selected.length && selected.length > 1) {

    			//keep whichever of selected was last, remove "last" class because we have a new "last selected"
    			if (hasClass(selected[0], "last")) {
    				removeClass(selected[1], "selected");
    				removeClass(selected[0], "last");
    			} else {
    				removeClass(selected[0], "selected");
    				removeClass(selected[1], "last");
    			}

    		} else if (selected.length > 0 ) {
    			//if only one has been picked, just remove the "last" class 
    			removeClass(selected[0], "last");
    		}

    		//add selected and last to event.target
    		addClass(event.target, "selected");
    		addClass(event.target, "last");

    		//update content sections in our flexbox manner so that it's awesome
    		if(document.querySelectorAll(".selected").length > 1) {
    			dropContent();
    		}

    	});
    }

    function ntr () {
    	addClass(dropdown, "open");
      addClass(icons, "animate");
      addClass(rowtwo, "drop");
      addClass(hamburger, "hamburgercolor");
      addClass(chevron, "fa-chevron-up");
      removeClass(chevron, "fa-chevron-down");
    }

    function leave () {
    	removeClass(dropdown, "open");
      removeClass(icons, "animate");
      removeClass(rowtwo, 'drop');
      removeClass(hamburger, "hamburgercolor");
      addClass(chevron, "fa-chevron-down");
      removeClass(chevron, "fa-chevron-up");
    }
  };

  function ready (fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
ready(onReady);