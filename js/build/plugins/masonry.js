export function initMasonry(){var n=document.querySelector(".loading-placeholder"),e=document.querySelector("#masonry-container");if(n&&e){n.style.display="block",e.style.display="none";for(var t=document.querySelectorAll("#masonry-container .masonry-item img"),o=0,a=0;a<t.length;a++){var i=t[a];i.complete?onImageLoad():i.addEventListener("load",onImageLoad)}o===t.length&&initializeMasonryLayout()}function onImageLoad(){++o===t.length&&initializeMasonryLayout()}function initializeMasonryLayout(){n.style.opacity=0,setTimeout((()=>{var t;n.style.display="none",e.style.display="block",t=window.innerWidth>=768?255:150,new MiniMasonry({baseWidth:t,container:e,gutterX:10,gutterY:10,surroundingGutter:!1}).layout(),e.style.opacity=1}),100)}}if(data.masonry){try{swup.hooks.on("page:view",initMasonry)}catch(n){}document.addEventListener("DOMContentLoaded",initMasonry)}
//# sourceMappingURL=masonry.js.map