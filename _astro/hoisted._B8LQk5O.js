import"./hoisted.DjdVkskV.js";const a=document.getElementById("contact_new");a.onsubmit=t=>{t.preventDefault();const o=t.target,e=new FormData(o);fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(e).toString()}).then(()=>window.alert("Thank you for your submission")).catch(n=>window.alert(n))};
