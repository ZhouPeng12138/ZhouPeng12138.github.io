const translations = {
    zh: {
        title: "欢迎来到我的网站",
        header: "欢迎来到我的网站",
        description: "这是一个多语言网页的示例。"
    },
    en: {
        title: "Welcome to My Website",
        header: "Welcome to My Website",
        description: "This is an example of a multi-language website."
    }
};

// 切换语言函数
function setLanguage(lang) {
    // 将页面中的文本内容替换为指定语言的内容
    document.getElementById('page-title').innerText = translations[lang].title;
    document.getElementById('header-title').innerText = translations[lang].header;
    document.getElementById('description').innerText = translations[lang].description;

    // 还可以设置页面的语言属性
    document.documentElement.lang = lang;
}

// 页面加载时默认显示中文
window.onload = function() {
    setLanguage('zh');
};