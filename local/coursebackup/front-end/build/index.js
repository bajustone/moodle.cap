this.index=this.index||{},this.index.js=function(t){"use strict";const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new Map;class o{constructor(t,e){if(this._$cssResult$=!0,e!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=i.get(this.cssText);return e&&void 0===t&&(i.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const n=t=>new o("string"==typeof t?t:t+"",s),r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new o(i,s)},l=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return n(e)})(t):t;var a;const d=window.trustedTypes,h=d?d.emptyScript:"",c=window.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},p=(t,e)=>e!==t&&(e==e||t==t),$={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p};class v extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Eh(s,e);void 0!==i&&(this._$Eu.set(i,s),t.push(i))})),t}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||$}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eh(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{e?t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((e=>{const s=document.createElement("style"),i=window.litNonce;void 0!==i&&s.setAttribute("nonce",i),s.textContent=e.cssText,t.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ES(t,e,s=$){var i,o;const n=this.constructor._$Eh(t,s);if(void 0!==n&&!0===s.reflect){const r=(null!==(o=null===(i=s.converter)||void 0===i?void 0:i.toAttribute)&&void 0!==o?o:u.toAttribute)(e,s.type);this._$Ei=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Ei=null}}_$AK(t,e){var s,i,o;const n=this.constructor,r=n._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=n.getPropertyOptions(r),l=t.converter,a=null!==(o=null!==(i=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==i?i:"function"==typeof l?l:null)&&void 0!==o?o:u.fromAttribute;this._$Ei=r,this[r]=a(e,t.type),this._$Ei=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}}var f;v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:v}),(null!==(a=globalThis.reactiveElementVersions)&&void 0!==a?a:globalThis.reactiveElementVersions=[]).push("1.3.2");const m=globalThis.trustedTypes,g=m?m.createPolicy("lit-html",{createHTML:t=>t}):void 0,_=`lit$${(Math.random()+"").slice(9)}$`,y="?"+_,w=`<${y}>`,A=document,b=(t="")=>A.createComment(t),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,S=/-->/g,U=/>/g,T=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,k=/'/g,H=/"/g,P=/^(?:script|style|textarea|title)$/i,M=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),N=M(1),R=M(2),O=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),L=new WeakMap,D=A.createTreeWalker(A,129,null,!1),j=(t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":"",r=x;for(let e=0;e<s;e++){const s=t[e];let l,a,d=-1,h=0;for(;h<s.length&&(r.lastIndex=h,a=r.exec(s),null!==a);)h=r.lastIndex,r===x?"!--"===a[1]?r=S:void 0!==a[1]?r=U:void 0!==a[2]?(P.test(a[2])&&(o=RegExp("</"+a[2],"g")),r=T):void 0!==a[3]&&(r=T):r===T?">"===a[0]?(r=null!=o?o:x,d=-1):void 0===a[1]?d=-2:(d=r.lastIndex-a[2].length,l=a[1],r=void 0===a[3]?T:'"'===a[3]?H:k):r===H||r===k?r=T:r===S||r===U?r=x:(r=T,o=void 0);const c=r===T&&t[e+1].startsWith("/>")?" ":"";n+=r===x?s+w:d>=0?(i.push(l),s.slice(0,d)+"$lit$"+s.slice(d)+_+c):s+_+(-2===d?(i.push(void 0),e):c)}const l=n+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==g?g.createHTML(l):l,i]};class z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,l=this.parts,[a,d]=j(t,e);if(this.el=z.createElement(a,s),D.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=D.nextNode())&&l.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(_)){const s=d[n++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+"$lit$").split(_),e=/([.?@])?(.*)/.exec(s);l.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Q:"?"===e[1]?J:"@"===e[1]?K:Z})}else l.push({type:6,index:o})}for(const e of t)i.removeAttribute(e)}if(P.test(i.tagName)){const t=i.textContent.split(_),e=t.length-1;if(e>0){i.textContent=m?m.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],b()),D.nextNode(),l.push({type:2,index:++o});i.append(t[e],b())}}}else if(8===i.nodeType)if(i.data===y)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(_,t+1));)l.push({type:7,index:o}),t+=_.length-1}o++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function B(t,e,s=t,i){var o,n,r,l;if(e===O)return e;let a=void 0!==i?null===(o=s._$Cl)||void 0===o?void 0:o[i]:s._$Cu;const d=C(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==d&&(null===(n=null==a?void 0:a._$AO)||void 0===n||n.call(a,!1),void 0===d?a=void 0:(a=new d(t),a._$AT(t,s,i)),void 0!==i?(null!==(r=(l=s)._$Cl)&&void 0!==r?r:l._$Cl=[])[i]=a:s._$Cu=a),void 0!==a&&(e=B(t,a._$AS(t,e.values),a,i)),e}class I{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:s},parts:i}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:A).importNode(s,!0);D.currentNode=o;let n=D.nextNode(),r=0,l=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new V(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new F(n,this,t)),this.v.push(e),a=i[++l]}r!==(null==a?void 0:a.index)&&(n=D.nextNode(),r++)}return o}m(t){let e=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class V{constructor(t,e,s,i){var o;this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cg=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=B(this,t,e),C(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==O&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>{var e;return E(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.S(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==q&&C(this._$AH)?this._$AA.nextSibling.data=t:this.k(A.createTextNode(t)),this._$AH=t}T(t){var e;const{values:s,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=z.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(s);else{const t=new I(o,this),e=t.p(this.options);t.m(s),this.k(e),this._$AH=t}}_$AC(t){let e=L.get(t.strings);return void 0===e&&L.set(t.strings,e=new z(t)),e}S(t){E(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new V(this.M(b()),this.M(b()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Z{constructor(t,e,s,i,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=B(this,t,e,0),n=!C(t)||t!==this._$AH&&t!==O,n&&(this._$AH=t);else{const i=t;let r,l;for(t=o[0],r=0;r<o.length-1;r++)l=B(this,i[s+r],e,r),l===O&&(l=this._$AH[r]),n||(n=!C(l)||l!==this._$AH[r]),l===q?t=q:t!==q&&(t+=(null!=l?l:"")+o[r+1]),this._$AH[r]=l}n&&!i&&this.C(t)}C(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Q extends Z{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===q?void 0:t}}const W=m?m.emptyScript:"";class J extends Z{constructor(){super(...arguments),this.type=4}C(t){t&&t!==q?this.element.setAttribute(this.name,W):this.element.removeAttribute(this.name)}}class K extends Z{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=B(this,t,e,0))&&void 0!==s?s:q)===O)return;const i=this._$AH,o=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==q&&(i===q||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class F{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){B(this,t)}}const G=window.litHtmlPolyfillSupport;var X,Y;null==G||G(z,V),(null!==(f=globalThis.litHtmlVersions)&&void 0!==f?f:globalThis.litHtmlVersions=[]).push("2.2.4");class tt extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,s)=>{var i,o;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new V(e.insertBefore(b(),t),t,void 0,null!=s?s:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return O}}tt.finalized=!0,tt._$litElement$=!0,null===(X=globalThis.litElementHydrateSupport)||void 0===X||X.call(globalThis,{LitElement:tt});const et=globalThis.litElementPolyfillSupport;null==et||et({LitElement:tt}),(null!==(Y=globalThis.litElementVersions)&&void 0!==Y?Y:globalThis.litElementVersions=[]).push("3.2.0");const st=R`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#00992d"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;var it;null===(it=window.HTMLSlotElement)||void 0===it||it.prototype.assignedElements,console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");class ot extends tt{static styles=r`
  `;render(){return N`
      <a>Loading....</a>
      `}static get styles(){return r`${n(style)}`}}var nt="http://192.168.1.1/moodle";const rt=`${nt}/local/coursebackup`,lt=`${rt}/get-remote-courses.php`,at=`${rt}/download-remote-course.php?course_id=`,dt=`${rt}/delete-courses.php`,ht=`${rt}/sync-to-online.php?course_id=`,ct=`${rt}/manage.php`,ut=`${rt}/get-current-user.php`,pt=`${rt}/course-feedback.php`,$t=`${rt}/sync-course-feedback.php`,vt=async()=>!!(await(await fetch(ut)).json()).isAdmin;class ft extends tt{static styles=r`
    :host {
      display: block;
      height: calc(100vh - 420px);
      position: relative;
      overflow: auto
    }
    table{
      border-collapse: collapse;
      width: 100%;
      max-width: 700px;
      margin: auto;
    }
    table td, table th{
      border: 1px solid rgba(0, 0, 0, 0.125);
      padding: 8px;
      min-width: 24px;
    }
    .loading{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .table-header{
      display: flex;
      width: 100%;
      max-width: 700px;
      margin: auto;
      padding: 8px 0px 24px 0px;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .table-header button{
      height: 42px;
      background-color: #0f6fc5;
      border: 1px solid  #0f6fc5;
      color: #fff;
      cursor: pointer;
    }
    .table-header h1{
      font-size: 20px;
      
    }
    .index-column{
      position: relative;
    }
    .downloading, .download-complete{
      opacity: 0;
      position: absolute;
      left: -40px;


    }
    .tr-downloading{
      background: rgba(0, 0, 0, 0.1);
    }
    .downloading div{
      width: 18px;
      height: 18px
    }
    .downloading.visible, .download-complete.visible{
      opacity: 1;
    }

    /* Spinner Circle Rotation */
.sp-circle {
  border: 4px rgba(0, 0, 0, 0.25) solid;
  border-top: 4px black solid;
  border-radius: 50%;
  -webkit-animation: spCircRot 0.6s infinite linear;
  animation: spCircRot 0.6s infinite linear;
}

@-webkit-keyframes spCircRot {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}
@keyframes spCircRot {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
  `;static properties={_courses:{state:!0}};static properties={_loading:{state:!0}};constructor(){super(),this.getCourses(),this._courses={},this.loading=!0,this.isAdmin=!1,this.online=navigator.onLine,this.currentCourse,this.selectdCourses=new Map}_offline(){this.online=!1,this.requestUpdate()}_online(){this.online=!0,this.requestUpdate()}async getCourses(){try{const t=await fetch(lt),e=await t.json();if(!1===e.success)return this.loading=!1,this.online=!1,void this.requestUpdate();this._courses=e,this.loading=!1,this.requestUpdate()}catch(t){this.loading=!1,this.online=!1,this.requestUpdate()}}connectedCallback(){super.connectedCallback(),vt().then((t=>{t&&(this.isAdmin=!0,this.requestUpdate())})),window.addEventListener("offline",(()=>this._offline())),window.addEventListener("online",(()=>this._online()));const t=document.querySelector("#page-content")?.getBoundingClientRect();t&&(this.style.height=t.height-62+"px")}offlineView(){return N`<div class="loading">
    ${R`<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m40.9 45.2-5.75-5.75H12.4Q8 39.45 5 36.5t-3-7.35q0-4 2.525-6.7t6.325-3.3q.1-.7.325-1.575T11.8 16L3.5 7.7l2.1-2.1 37.45 37.45Zm-28.5-8.75h19.85l-18-18q-.55.75-.725 1.7-.175.95-.175 1.85h-.95q-3.1 0-5.25 1.975T5 29q0 3.1 2.15 5.275Q9.3 36.45 12.4 36.45Zm10.8-9.05Zm19.5 10.5-2.35-2.35q1.25-.85 1.95-1.9.7-1.05.7-2.5 0-2.15-1.55-3.675t-3.7-1.525H34.4V21.9q0-4.4-3.05-7.375-3.05-2.975-7.45-2.975-1.4 0-3.025.45T17.9 13.45l-2.1-2.1q1.8-1.45 3.875-2.125T23.9 8.55q5.55 0 9.525 3.95Q37.4 16.45 37.4 22v1.05Q41 23 43.5 25.3q2.5 2.3 2.5 5.85 0 1.75-.825 3.675Q44.35 36.75 42.7 37.9ZM29.15 24.5Z"/></svg>`}
  </div>`}render(){return this.isAdmin?this.online?this.loading?N`
        <div class="loading">
          ${R`<svg width="64px" height="64px" viewBox="0 0 128 128"><rect x="0" y="0" width="100%" height="100%" fill="#fff"></rect><path fill="#1a237e" id="ball1" class="cls-1" d="M67.712,108.82a10.121,10.121,0,1,1-1.26,14.258A10.121,10.121,0,0,1,67.712,108.82Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;4 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;" dur="1000ms" repeatCount="indefinite"></animateTransform></path><path fill="#1a237e" id="ball2" class="cls-1" d="M51.864,106.715a10.125,10.125,0,1,1-8.031,11.855A10.125,10.125,0,0,1,51.864,106.715Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;10 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;" dur="1000ms" repeatCount="indefinite"></animateTransform></path><path fill="#1a237e" id="ball3" class="cls-1" d="M33.649,97.646a10.121,10.121,0,1,1-11.872,8A10.121,10.121,0,0,1,33.649,97.646Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;20 64 64;40 64 64;65 64 64;85 64 64;100 64 64;120 64 64;140 64 64;160 64 64;185 64 64;215 64 64;255 64 64;300 64 64;" dur="1000ms" repeatCount="indefinite"></animateTransform></path></svg>`}
        </div>

        `:N`
        <div class="table-header">
          <h1>List of available courses</h1>
          <button @click=${t=>this._downloadCourses()}>Download</button>
          <button @click=${t=>this._uploadAllCoursesUsersData()}>Upload</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <!-- <th>Course Id</th> -->
              <th>Course name</th>
              <th>Description</th>
              <th><input type=checkbox disabled/> </th>
            </tr>
          </thead>
          <tbody>
            ${Object.values(this._courses).map(((t,e)=>{const s=document.createElement("span");if(s.innerHTML=t.summary,1!=t.id)return N`<tr class=${""+(t.downloading?"tr-downloading":"")}>
                <td class="index-column">
                  <span class=${"downloading "+(t.downloading?"visible":"")}>
                    <div class="sp sp-circle"></div>
                  </span>
                  <span class=${"download-complete "+(t.downloadComplete?"visible":"")}>${st}</span>
                  ${e}
                </td>
                <!-- <td>${t.id}</td> -->
                <td>${t.fullname}</td>
                <td>${s}</td>
                <td><input @change=${e=>this._courseSelectionChanged(e,t)} .checked=${this.selectdCourses.has(t.id)}
                 type="checkbox" /></td>
              </tr>`}))}
          </tbody>
        </table>
        `:this.offlineView():N`<div>Unauthorized</div>`}_courseSelectionChanged(t,e){t.target.checked?this.selectdCourses.set(`${e.id}`,e):this.selectdCourses.has(`${e.id}`)&&this.selectdCourses.delete(`${e.id}`)}async deleteAllCourses(t){const e=`${dt}?course_id=${t}`,s=await fetch(e),i=await s.json();console.log("Delete existing course",i)}async _downloadCourses(){this.loading=!0,this.requestUpdate(),await this._uploadAllCoursesUsersData(),this.loading=!1,this.requestUpdate();for(const t of this.selectdCourses.values()){if(1==t.id)continue;await this.deleteAllCourses(t.id),t.downloading=!0,this._courses[t.id]=t,this.requestUpdate();const e=await this._downloadCourse(t.id);t.downloading=!1,t.downloadComplete=!0,this._courses[t.id]=t,console.log("dowload completed: ",e),this.requestUpdate()}}async _downloadCourse(t){const e=await fetch(`${at}${t}`);if(!e.ok){const t=`${e.status}: ${e.statusText}`;return console.error(t),{message:t}}const s=await e.text();return JSON.parse(s).success}async _uploadUserData(t){const e=`${ht}${t}`;try{const s=await fetch(e),i=await fetch(`${pt}?course_id=${t}`),o=await i.json(),n=await fetch(`http://197.243.24.148${$t}`,{method:"post",body:JSON.stringify(o)}),r=await n.json();console.log(r);const l=await s.json();return console.log(l),l}catch(t){console.error(t)}}async _uploadAllCoursesUsersData(){for(const t of this.selectdCourses.values())1!=t.id&&(t.downloading=!0,this._courses[t.id]=t,this.requestUpdate(),await this._uploadUserData(t.id),t.downloading=!1,t.downloadComplete=!0,this._courses[t.id]=t,this.requestUpdate())}}return customElements.define("main-section",ft),customElements.define("f-loading",ot),(async()=>{if(await vt())return;const t=`${nt}${ct}`,e=document.querySelector(`a[href="${t}"]`);if(!e)return void console.error("Sync page link not found");const s=e.parentElement;s.parentElement.removeChild(s)})(),t.App=ft,Object.defineProperty(t,"__esModule",{value:!0}),t}({});
