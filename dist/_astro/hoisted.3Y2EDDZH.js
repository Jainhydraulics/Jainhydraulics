import"./hoisted.-NB6PHm6.js";document.addEventListener("DOMContentLoaded",function(){const t=document.getElementById("scrolling-container"),e=document.getElementById("left-button"),n=document.getElementById("right-button");function i(){t.scrollLeft>0?e.classList.remove("hidden"):e.classList.add("hidden"),t.scrollLeft<t.scrollWidth-t.clientWidth-50?n.classList.remove("hidden"):n.classList.add("hidden")}function d(){t.scrollLeft-=t.clientWidth}function l(){t.scrollLeft+=t.clientWidth}i(),window.addEventListener("resize",i),t.addEventListener("scroll",i),e.addEventListener("click",d),n.addEventListener("click",l)});
