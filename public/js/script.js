const M = window.M;
const defaultPage = "about";
const sections = document.querySelectorAll(".section");

const scrollInView = id => {
    try {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", inline: "nearest" });
        }
    } catch (err) {
        console.warn(err.message);
    }
};

const getPageId = (url) => {
    try {
        const ref = url ? url : window.location.href;
        return ref.split("#").pop();
    } catch (err) {
        console.warn(err.message);
        return defaultPage;
    }
};

const elementInViewport = el => {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    let width = el.offsetWidth;
    let height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top >= window.pageYOffset &&
        left >= window.pageXOffset &&
        (top + height) <= (window.pageYOffset + window.innerHeight) &&
        (left + width) <= (window.pageXOffset + window.innerWidth)
    );
}

window.addEventListener("hashchange", function (e) {
    scrollInView(getPageId(e.newURL));
});

window.addEventListener("scroll", () => {
    const hashTimer = setTimeout(() => {
        sections.forEach(section => {
            if (elementInViewport(section)) {
                window.location.hash = section.id;
                clearTimeout(hashTimer);
            }
        });
    }, 0);
});

window.addEventListener("DOMContentLoaded", function () {
    const linkList = document.querySelectorAll(".menu-link");
    const elems = document.querySelectorAll(".sidenav");
    const instances = M.Sidenav.init(elems, {
        draggable: true,
        preventScrolling: false
    });
    if (linkList && linkList.length > 0) {
        linkList.forEach(item => item.addEventListener("click", () => {
            instances[0].close();
            scrollInView(getPageId());
        }));
    }
    scrollInView(getPageId());
});
