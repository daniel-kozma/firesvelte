(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerpolicy&&(c.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?c.credentials="include":r.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function l(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}})();function a(){}function N(e){return e()}function E(){return Object.create(null)}function _(e){e.forEach(N)}function A(e){return typeof e=="function"}function C(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function P(e){return Object.keys(e).length===0}function B(e,t,n){e.insertBefore(t,n||null)}function j(e){e.parentNode.removeChild(e)}function I(e){return document.createElement(e)}function M(e){return Array.from(e.childNodes)}let $;function d(e){$=e}const f=[],O=[],m=[],L=[],q=Promise.resolve();let y=!1;function F(){y||(y=!0,q.then(S))}function b(e){m.push(e)}const g=new Set;let h=0;function S(){const e=$;do{for(;h<f.length;){const t=f[h];h++,d(t),H(t.$$)}for(d(null),f.length=0,h=0;O.length;)O.pop()();for(let t=0;t<m.length;t+=1){const n=m[t];g.has(n)||(g.add(n),n())}m.length=0}while(f.length);for(;L.length;)L.pop()();y=!1,g.clear(),d(e)}function H(e){if(e.fragment!==null){e.update(),_(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(b)}}const K=new Set;function z(e,t){e&&e.i&&(K.delete(e),e.i(t))}function D(e,t,n,l){const{fragment:r,on_mount:c,on_destroy:i,after_update:p}=e.$$;r&&r.m(t,n),l||b(()=>{const s=c.map(N).filter(A);i?i.push(...s):_(s),e.$$.on_mount=[]}),p.forEach(b)}function G(e,t){const n=e.$$;n.fragment!==null&&(_(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function J(e,t){e.$$.dirty[0]===-1&&(f.push(e),F(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Q(e,t,n,l,r,c,i,p=[-1]){const s=$;d(e);const o=e.$$={fragment:null,ctx:null,props:c,update:a,not_equal:r,bound:E(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(s?s.$$.context:[])),callbacks:E(),dirty:p,skip_bound:!1,root:t.target||s.$$.root};i&&i(o.root);let x=!1;if(o.ctx=n?n(e,t.props||{},(u,k,...w)=>{const v=w.length?w[0]:k;return o.ctx&&r(o.ctx[u],o.ctx[u]=v)&&(!o.skip_bound&&o.bound[u]&&o.bound[u](v),x&&J(e,u)),k}):[],o.update(),x=!0,_(o.before_update),o.fragment=l?l(o.ctx):!1,t.target){if(t.hydrate){const u=M(t.target);o.fragment&&o.fragment.l(u),u.forEach(j)}else o.fragment&&o.fragment.c();t.intro&&z(e.$$.fragment),D(e,t.target,t.anchor,t.customElement),S()}d(s)}class R{$destroy(){G(this,1),this.$destroy=a}$on(t,n){const l=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return l.push(n),()=>{const r=l.indexOf(n);r!==-1&&l.splice(r,1)}}$set(t){this.$$set&&!P(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function T(e){let t;return{c(){t=I("button"),t.textContent="Hello world!"},m(n,l){B(n,t,l)},p:a,i:a,o:a,d(n){n&&j(t)}}}class U extends R{constructor(t){super(),Q(this,t,null,T,C,{})}}new U({target:document.getElementById("app")});