(()=>{"use strict";const e={};"undefined"!=typeof lpDataAdmin&&(e.admin={apiAdminNotice:lpDataAdmin.lp_rest_url+"lp/v1/admin/tools/admin-notices",apiAdminOrderStatic:lpDataAdmin.lp_rest_url+"lp/v1/orders/statistic",apiAddons:lpDataAdmin.lp_rest_url+"lp/v1/addon/all",apiAddonAction:lpDataAdmin.lp_rest_url+"lp/v1/addon/action-n",apiAddonsPurchase:lpDataAdmin.lp_rest_url+"lp/v1/addon/info-addons-purchase",apiSearchCourses:lpDataAdmin.lp_rest_url+"lp/v1/admin/tools/search-course",apiSearchUsers:lpDataAdmin.lp_rest_url+"lp/v1/admin/tools/search-user",apiAssignUserCourse:lpDataAdmin.lp_rest_url+"lp/v1/admin/tools/assign-user-course",apiUnAssignUserCourse:lpDataAdmin.lp_rest_url+"lp/v1/admin/tools/unassign-user-course",apiAJAX:lpDataAdmin.lp_rest_url+"lp/v1/load_content_via_ajax/"}),"undefined"!=typeof lpData&&(e.frontend={apiWidgets:lpData.lp_rest_url+"lp/v1/widgets/api",apiCourses:lpData.lp_rest_url+"lp/v1/courses/archive-course",apiAJAX:lpData.lp_rest_url+"lp/v1/load_content_via_ajax/",apiProfileCoverImage:lpData.lp_rest_url+"lp/v1/profile/cover-image"});const t=e,r=(e,t)=>{const r=new URL(e);return Object.keys(t).forEach((e=>{r.searchParams.set(e,t[e])})),r},s="lp-form-course-filter",l="processing",a="show-lp-course-filter-mobile";let o,n,i;document.addEventListener("submit",(function(e){const t=e.target;t.classList.contains(s)&&(e.preventDefault(),window.lpCourseFilter.submit(t))})),document.addEventListener("click",(function(e){const t=e.target;if(t.classList.contains("course-filter-reset")&&(e.preventDefault(),window.lpCourseFilter.reset(t)),t.closest(".lp-form-course-filter__close")&&(e.preventDefault(),document.querySelector("body").classList.remove(`${a}`)),window.lpCourseFilter.showHideSearchResult(t),window.lpCourseFilter.triggerInputChoice(t),window.lpCourseFilter.clickBtnFilterMobile(t),!t.closest(`.${s}`)&&!t.closest(".course-filter-btn-mobile")){const e=document.querySelector("body");window.outerWidth<=991&&e.classList.contains(`${a}`)&&e.classList.remove(`${a}`)}})),document.addEventListener("keyup",(function(e){e.preventDefault();const t=e.target;t.classList.contains("lp-course-filter-search")&&window.lpCourseFilter.searchSuggestion(t)})),window.lpCourseFilter={searchSuggestion:e=>{if(1!==parseInt(e.dataset.searchSuggest||1))return;const t=e.value.trim(),r=e.closest(`.${s}`),l=r.querySelector(".lp-loading-circle");void 0!==o&&clearTimeout(o),t&&t.length>2?(l.classList.remove("hide"),o=setTimeout((function(){window.lpCourseFilter.callAPICourseSuggest(t,(e=>{document.querySelector(".lp-course-filter-search-result").innerHTML=e.data.content,l.classList.add("hide")}))}),500)):(r.querySelector(".lp-course-filter-search-result").innerHTML="",l.classList.add("hide"))},callAPICourseSuggest:(e,r,s)=>{void 0!==n&&n.abort(),n=new AbortController,i=n.signal;let l=t.frontend.apiCourses+"?c_search="+e+"&c_suggest=1";lpData.urlParams.hasOwnProperty("lang")&&(l+="&lang="+lpData.urlParams.lang);let a={method:"GET"};0!==parseInt(lpData.user_id)&&(a={...a,headers:{"X-WP-Nonce":lpData.nonce}}),fetch(l,{...a,signal:i}).then((e=>e.json())).then((e=>{void 0!==r&&r(e)})).catch((e=>{console.log(e)})).finally((()=>{void 0!==s&&s()}))},loadWidgetFilterREST:e=>{const r=e.closest(`.learnpress-widget-wrapper:not(.${l})`);if(!r)return;r.classList.add(l);const s=e.closest("div[data-widget]");let a=null;if(s){const e=JSON.parse(s.dataset.widget),t=JSON.parse(e.instance).class_list_courses_target||".lp-list-courses-default";a=document.querySelector(t)}const o=r.dataset.widget?JSON.parse(r.dataset.widget):"",n=lpData.urlParams.lang?`?lang=${lpData.urlParams.lang}`:"",i=t.frontend.apiWidgets+n,c=new FormData(e),u={paged:1},p=r.querySelector(".lp-widget-loading-change");p.style.display="block";for(const e of c.entries()){const t=e[0],r=c.getAll(t);if(!u.hasOwnProperty(t)){let e=r;"object"==typeof r&&(e=r.join(",")),u[t]=e}}void 0!==lpData.urlParams.page_term_id_current?u.page_term_id_current=lpData.urlParams.page_term_id_current:void 0!==lpData.urlParams.page_tag_id_current&&(u.page_tag_id_current=lpData.urlParams.page_tag_id_current);const d={params_url:u};lpData.urlParams.hasOwnProperty("lang")?d.params_url.lang=lpData.urlParams.lang:lpData.urlParams.hasOwnProperty("pll-current-lang")&&(d.params_url["pll-current-lang"]=lpData.urlParams["pll-current-lang"]);const g={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...o,...d})};0!==parseInt(lpData.user_id)&&(g.headers["X-WP-Nonce"]=lpData.nonce),((e,t={},r={})=>{"function"==typeof r.before&&r.before(),fetch(e,{method:"GET",...t}).then((e=>e.json())).then((e=>{"function"==typeof r.success&&r.success(e)})).catch((e=>{"function"==typeof r.error&&r.error(e)})).finally((()=>{"function"==typeof r.completed&&r.completed()}))})(i,g,{before:()=>{},success:t=>{const{data:s,status:l,message:a}=t;s&&"success"===l?e.innerHTML=s:a&&r.insertAdjacentHTML("afterbegin",`<div class="lp-ajax-message error" style="display:block">${a}</div>`)},error:e=>{},completed:()=>{const e=setInterval((()=>{a&&!a.classList.contains(l)&&(clearInterval(e),p.style.display="none",r.classList.remove(l))}),1)}})},submit:e=>{let s=t.frontend.apiAJAX;const o=new FormData(e),n=document.querySelector(".learn-press-courses"),i=e.closest("div[data-widget]");let c=null;if(i){const e=JSON.parse(i.dataset.widget),t=JSON.parse(e.instance).class_list_courses_target||".lp-list-courses-default";c=document.querySelector(t)}const u={paged:1};void 0!==window.lpCourseList&&window.lpCourseList.updateEventTypeBeforeFetch("filter");for(const e of o.entries()){const t=e[0],r=o.getAll(t);u.hasOwnProperty(t)||(u[t]=r.join(","))}if(void 0!==lpData.urlParams.page_term_id_current&&(u.page_term_id_current=lpData.urlParams.page_term_id_current),void 0!==lpData.urlParams.page_tag_id_current&&(u.page_tag_id_current=lpData.urlParams.page_tag_id_current),lpData.urlParams.hasOwnProperty("lang")?(u.lang=lpData.urlParams.lang,s=r(s,{lang:lpData.urlParams.lang})):lpData.urlParams.hasOwnProperty("pll-current-lang")&&(u["pll-current-lang"]=lpData.urlParams["pll-current-lang"],s=r(s,{lang:lpData.urlParams["pll-current-lang"]})),"undefined"!=typeof lpSettingCourses&&lpData.is_course_archive&&lpSettingCourses.lpArchiveLoadAjax&&n&&!c&&void 0!==window.lpCourseList)window.lpCourseList.triggerFetchAPI(u);else if(c){if(c.classList.contains(l))return;c.classList.add(l);const t=c.querySelector(".lp-target"),s={...JSON.parse(t.dataset.send)},o=c.closest("div:not(.lp-target)").querySelector(".lp-loading-change");o&&(o.style.display="block");const n=e.elements;for(let e=0;e<n.length;e++)u.hasOwnProperty(n[e].name)?s.args[n[e].name]=u[n[e].name]:delete s.args[n[e].name];s.args.count_fields_selected=window.lpCourseFilter.countFieldsSelected(e),s.args.paged=1,t.dataset.send=JSON.stringify(s),lpData.urlParams=u,window.history.pushState({},"",r((()=>{let e=window.location.href;return e.includes("?")&&(e=e.split("?")[0]),e})(),lpData.urlParams)),window.lpCourseFilter.loadWidgetFilterREST(e);const i={success:e=>{const{status:r,message:s,data:l}=e;t.innerHTML=l.content||""},error:e=>{console.log(e)},completed:()=>{c.classList.remove(l),o&&(o.style.display="none")}};window.lpAJAXG.fetchAJAX(s,i),window.outerWidth<=991&&(c.scrollIntoView({behavior:"smooth"}),document.querySelector("body").classList.remove(`${a}`))}else{const e=lpData.urlParams.page_term_url||lpData.courses_url||"",t=new URL(e);Object.keys(u).forEach((e=>{t.searchParams.set(e,u[e])})),document.location.href=t.href}},reset:e=>{const t=e.closest(`.${s}`);if(!t)return;const r=t.querySelector(".course-filter-submit"),l=t.querySelector(".lp-course-filter-search-result"),a=t.querySelector(".lp-course-filter-search");t.reset(),l&&(l.innerHTML=""),a&&(a.value="");for(let e=0;e<t.elements.length;e++)t.elements[e].removeAttribute("checked");r.click()},showHideSearchResult:e=>{const t=document.querySelector(".lp-course-filter-search-result");t&&(e.closest(".lp-course-filter-search-result")||e.classList.contains("lp-course-filter-search-result")||e.classList.contains("lp-course-filter-search")?t.style.display="block":t.style.display="none")},countFieldsSelected:e=>{const t=document.querySelector(".course-filter-count-fields-selected");if(!t)return;const r=e.querySelectorAll("input:checked");let s="";return r.length&&(s=`(${r.length})`),t.innerHTML=s,s},triggerInputChoice:e=>{const t=e.closest(".lp-course-filter__field");if(!t)return;const r=t.closest(`.${s}`);if("INPUT"===e.tagName){const e=t.closest("div[data-widget]");let r=null;if(e){const l=JSON.parse(e.dataset.widget),a=JSON.parse(l.instance).class_list_courses_target||".lp-list-courses-default";if(r=document.querySelector(a),window.outerWidth>991){const e=t.closest(`.${s}`);window.lpCourseFilter.submit(e)}}}else t.querySelector("input").click();window.lpCourseFilter.countFieldsSelected(r)},clickBtnFilterMobile:e=>{e.closest(".course-filter-btn-mobile")&&document.querySelector("body").classList.toggle(`${a}`)}}})();