(window.webpackJsonp=window.webpackJsonp||[]).push([["my-pa-shopware"],{"+2DY":function(e,t,r){"use strict";r.r(t);r("wcNg");var n=r("k8s9"),o=r("FGIj"),i=r("prSB");function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function l(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var s,d,y,f=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),l(this,u(t).apply(this,arguments))}var r,o,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,e),r=t,(o=[{key:"init",value:function(){var e=this;e.loadMethodOptions(e),document.querySelectorAll('[name="shippingMethodId"]').forEach((function(t){t.addEventListener("change",(function(t){e.loadMethodOptions(e)}))}))}},{key:"loadInitialValues",value:function(e){var t=document.querySelectorAll(e.options.shippingForm),r=i.a.getItem(e.options.cookieName);if(!r)return!1;var n=r.split("_"),o=n[0],c=n[1],a=n[2],l=n[3],u=n[4];if(t&&a>0){var p="",s=document.querySelector('div[data-shipping-method-id="'+o+'"]'),d=s.querySelector('.delivery_options[data-date="'+c+'"]');if(c){var y=s.querySelector('select[name="myparcel_delivery_date"]').querySelector('[value="'+c+'"]');y.selected=!0,p+=y.text}if(d.querySelector('input[name="myparcel_delivery_type_'+c+'"][value="'+a+'"]').checked=!0,l>0){var f=s.querySelector('input[name="myparcel_requires_signature"]'),m=s.querySelector('label[for="'+f.id+'"]').textContent;f.checked=!0,p=p+", "+m.toLowerCase()}if(u>0){var v=s.querySelector('input[name="myparcel_only_recipient"]'),h=s.querySelector('label[for="'+v.id+'"]').textContent;v.checked=!0,p=p+", "+h.toLowerCase()}(u>0||l>0)&&(p=" ("+p+")"),document.querySelector(e.options.currentShipping).innerHTML+="<br/><small>"+p+"</small>";var S=document.querySelector(e.options.confirmOrderForm),g=S.querySelector('input[name="myparcel[shipping_method_id]"]'),_=S.querySelector('input[name="myparcel[delivery_date]"]'),b=S.querySelector('input[name="myparcel[delivery_type_'+c+']"]'),w=S.querySelector('input[name="myparcel[requires_signature]"]'),q=S.querySelector('input[name="myparcel[only_recipient]"]');g.value=o,_.value=c,b.value=a,w.value=l,q.value=u,s.querySelectorAll(".delivery_options").forEach((function(e){e.classList.add("d-none")})),d.classList.remove("d-none")}}},{key:"loadMethodOptions",value:function(e){var t=new n.a(window.accessKey,window.contextToken),r=window.router["myparcel.delivery_options"],o=document.querySelector("input[name=shippingMethodId]:checked").value,i=document.querySelector('[data-shipping-method-id="'+o+'"]');i&&"true"!=i.getAttribute("data-options-loaded")&&(console.log(r),t.get(r+"?method="+o,(function(t){if(e.checkIfJsonString(t)){var r=JSON.parse(r);return 0==r.success&&"422"==r.code?void console.log("error 422"):0==r.success?void console.log("no options retrieved"):void 0}i.innerHTML=t,i.setAttribute("data-options-loaded","true");var n=i.querySelector(".date_select select");n.addEventListener("change",(function(e){i.querySelectorAll(".delivery_options").forEach((function(e){e.classList.add("d-none")}));var t=i.querySelector('[data-date="'+e.target.value+'"]');t.classList.remove("d-none"),t.querySelectorAll('[name="myparcel_delivery_type"]').forEach((function(e){e.addEventListener("change",(function(e){var t=e.target.value;if(e.target.checked){var r=i.querySelector('[name="myparcel_only_recipient"]');1!=t&&3!=t||(r.checked=!0)}}))}))}));var o=new Event("change");n.dispatchEvent(o),e.loadInitialValues(e)})))}},{key:"checkIfJsonString",value:function(e){try{JSON.parse(e)}catch(e){return!1}return!0}}])&&a(r.prototype,o),c&&a(r,c),t}(o.a);y={cookieName:"myparcel-cookie-key",shippingForm:".myparcel_shipping_form",confirmOrderForm:"form#confirmOrderForm",currentShipping:"p.confirm-shipping-current"},(d="options")in(s=f)?Object.defineProperty(s,d,{value:y,enumerable:!0,configurable:!0,writable:!0}):s[d]=y,window.PluginManager.register("MyParcelShippingOptions",f)}},[["+2DY","runtime","vendor-node","vendor-shared"]]]);