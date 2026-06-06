const archiveTranslations = {
  en: {
    backHome:"Back to Home", kicker:"Continuous Learning Journey", title:"Learning Archive", copy:"An evolving archive of courses, certificates, camps, and learning programs that documents building the journey step by step.", records:"learning records", categories:"categories", continuing:"continuous journey", cyberTitle:"Cybersecurity Learning Record", healthTitle:"Healthcare AI Learning Record", isTitle:"Information Systems Record", uxTitle:"UX & Design Learning Record", programmingTitle:"Programming & Software Development Record", leadershipArchiveTitle:"Leadership & Volunteering Record", entrepreneurTitle:"Entrepreneurship Record", languagesArchiveTitle:"Language Learning Record", futureTitle:"Future Learning Record", futureProvider:"Provider and date will be added when available.", planned:"Planned", progress:"In Progress", empty:"No matching records yet.", footer:"An archive that evolves with Mariam’s learning and building journey."
  }
};
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);
const archiveArabic = {};
document.querySelectorAll("[data-archive-i18n]").forEach(el => archiveArabic[el.dataset.archiveI18n] = el.textContent);
let archiveLanguage = "ar";
function setArchiveLanguage(lang){
  archiveLanguage=lang;
  const ar=lang==="ar";
  document.documentElement.lang=lang;
  document.documentElement.dir=ar?"rtl":"ltr";
  document.body.classList.toggle("ltr",!ar);
  document.querySelectorAll("[data-archive-i18n]").forEach(el=>{const v=ar?archiveArabic[el.dataset.archiveI18n]:archiveTranslations.en[el.dataset.archiveI18n];if(v)el.textContent=v});
  document.getElementById("archiveLangSwitch").textContent=ar?"EN":"العربية";
  const search=document.getElementById("archiveSearch");
  search.placeholder=ar?search.dataset.placeholderAr:search.dataset.placeholderEn;
  document.querySelectorAll("[data-ar]").forEach(btn=>btn.textContent=ar?btn.dataset.ar:btn.dataset.en);
}
document.getElementById("archiveLangSwitch").addEventListener("click",()=>setArchiveLanguage(archiveLanguage==="ar"?"en":"ar"));
let activeFilter="all";
function filterArchive(){
  const query=document.getElementById("archiveSearch").value.toLowerCase().trim();
  let count=0;
  document.querySelectorAll(".archive-card").forEach(card=>{
    const matchesFilter=activeFilter==="all"||card.dataset.category===activeFilter;
    const matchesQuery=!query||(card.textContent+" "+card.dataset.search).toLowerCase().includes(query);
    card.hidden=!(matchesFilter&&matchesQuery);
    if(!card.hidden)count++;
  });
  document.getElementById("archiveEmpty").hidden=count>0;
  document.getElementById("recordCount").textContent=count;
}
document.getElementById("archiveFilters").addEventListener("click",event=>{
  const button=event.target.closest("button");if(!button)return;
  document.querySelectorAll(".archive-filters button").forEach(item=>item.classList.remove("active"));
  button.classList.add("active");activeFilter=button.dataset.filter;filterArchive();
});
document.getElementById("archiveSearch").addEventListener("input",filterArchive);
