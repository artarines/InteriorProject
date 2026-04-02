// функція діалогу з користувачем
function userDialogue() {
    let budget;
    let attempts = 0;

    // цикл: питаємо бюджет, поки не введуть число (макс. 3 спроби)
    while (attempts < 3) {
        budget = prompt("Який ваш орієнтовний бюджет на ремонт (грн)?");
        
        if (budget === null) break; // якщо "скасувати"

        if (!isNaN(budget) && budget > 0) {
            // умовне розгалуження
            if (budget < 50000) {
                alert("Ми підберемо для вас чудові бюджетні рішення!");
            } else {
                alert("Ми запропонуємо вам преміальний дизайн-проєкт!");
            }
            break; 
        } else {
            attempts++;
            alert("Будь ласка, введіть коректне число. Спроба " + attempts + " з 3.");
        }
    }
}
//викликаємо 
userDialogue();



//функцію виводу інформації про розробника 
function showDeveloperInfo(lastName, firstName, position = "Веб-розробник") {
    alert("Інформація про розробника:\nПрізвище: " + lastName + "\nІм'я: " + firstName + "\nПосада: " + position);
}

showDeveloperInfo("Гапчинська", "Марія", "Дизайнер інтер'єрів");

showDeveloperInfo("Гапчинська", "Марія");

//функція порівняння довжини рядків
function compareStrings(str1, str2) {
    if (str1.length > str2.length) {
        alert("Довший рядок: " + str1);
    } else if (str2.length > str1.length) {
        alert("Довший рядок: " + str2);
    } else {
        alert("Рядки мають однакову довжину.");
    }
}
compareStrings("Інтер'єр", "Дизайн");


//зміна фону на 30 секунд
let originalBg = document.body.style.backgroundColor;
document.body.style.backgroundColor = "#ef1deb"; 

setTimeout(() => {
    document.body.style.backgroundColor = originalBg;
    alert("30 секунд минуло, фон повернуто до початкового!");
}, 30000);

//функція перенаправлення
function redirectToGoogle() {
    let go = confirm("Перейти на сторінку Google?");
    if (go) {
        location.href = "https://www.google.com";
    }
}
redirectToGoogle(); 

// getElementById — шукаємо навігацію по id
let nav = document.getElementById("main-nav");
console.log("getElementById → знайдено:", nav);

// querySelectorAll — шукаємо всі посилання в навігації
let links = document.querySelectorAll("#main-nav a");
console.log("querySelectorAll → кількість посилань:", links.length);
links.forEach(link => console.log("посилання:", link.textContent));



//використати наступні властивості DOM-вузла: innerHTML, outerHTML, nodeValue / data, textContent.
// innerHTML — HTML-вміст навігації
console.log("innerHTML:", nav.innerHTML);
// outerHTML — елемент разом із самим тегом
console.log("outerHTML:", nav.outerHTML);
// textContent — тільки текст без тегів
console.log("textContent:", nav.textContent);
// nodeValue / data — для текстового вузла
// firstChild навігації — це текстовий вузол (пробіл між тегами)
let textNode = nav.firstChild;
console.log("data текстового вузла:", textNode.data);






document.write("<p style='text-align:center; color:#888;'>© Gapchinska Interior Studio</p>");

//створення (елемента div)
let card = document.createElement("div");
card.style.cssText = "border:2px solid #c8a96e; padding:15px; margin:20px auto; max-width:380px; background:#fdf6ee; text-align:center; border-radius:8px;";
card.innerHTML = "<p><b>Ім'я:</b> Марія Гапчинська</p><p><b>Посада:</b> Дизайнер інтер'єрів</p>";

//створення (елемента h3 та текстового вузла)
let cardHeading = document.createElement("h3");
let headingText = document.createTextNode("Розробник сторінки");
cardHeading.style.color = "#7a4f2e";
cardHeading.appendChild(headingText);

let main = document.querySelector("main");

//вствка(додаємо заголовок на початок картки)
card.prepend(cardHeading);
//вставка(додаємо саму картку в кінець <main>)
main.append(card);

let banner = document.createElement("p");
banner.textContent = "Акція: перша консультація безкоштовно!";
banner.style.cssText = "background:#ffe0f0; padding:8px; text-align:center; color:#dc316a;";

//вставка вузла (додаємо банер відразу ПІСЛЯ елемента nav)
nav.after(banner);

setTimeout(() => {
    let newBanner = document.createElement("p");
    newBanner.textContent = "Зв'яжіться з нами: artarines@gmail.com";
    newBanner.style.cssText = "background:#e0f0e8; padding:8px; text-align:center; color:#2a7a4f;";
    
    //заміна вузла (старий banner замінюється на newBanner)
    banner.replaceWith(newBanner);
    console.log("replaceWith → банер замінено");
}, 5000);

setTimeout(() => {
    //видалення вузла: (картка повністю видаляється з DOM)
    card.remove();
    console.log("remove → картку розробника видалено");
}, 15000);

