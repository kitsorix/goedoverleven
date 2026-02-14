import{r as n}from"./index.CzjdDlXV.js";var c={exports:{}},l={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v=Symbol.for("react.transitional.element"),E=Symbol.for("react.fragment");function p(e,r,t){var o=null;if(t!==void 0&&(o=""+t),r.key!==void 0&&(o=""+r.key),"key"in r){t={};for(var s in r)s!=="key"&&(t[s]=r[s])}else t=r;return r=t.ref,{$$typeof:v,type:e,key:o,ref:r!==void 0?r:null,props:t}}l.Fragment=E;l.jsx=p;l.jsxs=p;c.exports=l;var L=c.exports;/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=(...e)=>e.filter((r,t,o)=>!!r&&r.trim()!==""&&o.indexOf(r)===t).join(" ").trim();/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(r,t,o)=>o?o.toUpperCase():t.toLowerCase());/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=e=>{const r=k(e);return r.charAt(0).toUpperCase()+r.slice(1)};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var h={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=e=>{for(const r in e)if(r.startsWith("aria-")||r==="role"||r==="title")return!0;return!1};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=n.forwardRef(({color:e="currentColor",size:r=24,strokeWidth:t=2,absoluteStrokeWidth:o,className:s="",children:a,iconNode:m,...i},x)=>n.createElement("svg",{ref:x,...h,width:r,height:r,stroke:e,strokeWidth:o?Number(t)*24/Number(r):t,className:d("lucide",s),...!a&&!A(i)&&{"aria-hidden":"true"},...i},[...m.map(([C,f])=>n.createElement(C,f)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=(e,r)=>{const t=n.forwardRef(({className:o,...s},a)=>n.createElement(j,{ref:a,iconNode:r,className:d(`lucide-${w(u(e))}`,`lucide-${e}`,o),...s}));return t.displayName=u(e),t};export{T as c,L as j};
