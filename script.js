// getElementById — шукаємо навігацію по id
let nav = document.getElementById("main-nav");
if (nav) {
    console.log("getElementById → знайдено:", nav);

    let links = document.querySelectorAll("#main-nav a");
    console.log("querySelectorAll → кількість посилань:", links.length);
    links.forEach(link => console.log("посилання:", link.textContent));

    console.log("innerHTML:", nav.innerHTML);
    console.log("outerHTML:", nav.outerHTML);
    console.log("textContent:", nav.textContent);

    let textNode = nav.firstChild;
    if (textNode) console.log("data текстового вузла:", textNode.data);
}

// Лабораторна 7 - Події миші

// --- 1а. Обробник через атрибут HTML ---
// (функція викликається через onclick="handleAttrClick()" у HTML)
function handleAttrClick() {
    alert("Порада від дизайнера: Природне світло візуально розширює простір. Використовуйте дзеркала навпроти вікон, щоб зробити кімнату світлішою!");
}

// --- 1б. Обробник через властивість DOM-елемента ---
// чек завантаження сторінки
document.addEventListener("DOMContentLoaded", function () {

    // ---- 1б через властивість .onclick ----
    let btnProp = document.getElementById("btn-prop");
    if (btnProp) {
        btnProp.onclick = function () {
            //тут обробник через властивість
            alert("Орієнтовна вартість базового дизайн-проєкту (пакет 'Технічний'): від 300 грн/м².");
        };
    }

    // ---- 1в: addEventListener — кілька обробників на одну подію ----
    let btnMulti = document.getElementById("btn-multi");
    if (btnMulti) {

        function handlerFirst() {
            // перший обробник (візуальний ефект + лог)
            console.log("CRM-система: Заявку на зворотний дзвінок успішно створено.");
            btnMulti.style.background = "#f97fde";
            btnMulti.style.transition = "background 0.3s";
            setTimeout(() => { btnMulti.style.background = ""; }, 1000);
        }

        function handlerSecond() {
            // другий обробник на ту ж саму подію (повідомлення)
            alert("Дякуємо! Наш провідний архітектор Олексій Чернов зателефонує вам найближчим часом.");
        }

        btnMulti.addEventListener("click", handlerFirst);
        btnMulti.addEventListener("click", handlerSecond);
    }

    // ---- 1г: Обробник-об'єкт з handleEvent + event.currentTarget ----
    let btnObj = document.getElementById("btn-obj");

    // Об'єкт-обробник
    const mouseHandler = {
        //використання спеціального методу handleEvent
        handleEvent(event) {
            alert("Контакти студії 'Gapchinska interior':\nм. Київ, вул. Володимирська, 10\nEmail: artarines@gmail.com\nТелефон: +38 (067) 000-00-00");
        }
    };

    if (btnObj) {
        btnObj.addEventListener("click", mouseHandler);
    }

    // ---- 1д: Видалення обробника через removeEventListener ----
    let btnRemove = document.getElementById("btn-remove");
    let btnRemoveTarget = document.getElementById("btn-remove-target");

    // Обробник, який потім видалю
    function removableHandler() {
        alert("Спецпропозиція: Отримайте безкоштовний мудборд при замовленні повного дизайн-проєкту до кінця місяця!");
    }

    if (btnRemoveTarget) {
        btnRemoveTarget.addEventListener("click", removableHandler);
    }

    if (btnRemove) {
        btnRemove.addEventListener("click", function () {
            if (btnRemoveTarget) {
                // видаляє обробник, використовуючи ту саму функцію
                btnRemoveTarget.removeEventListener("click", removableHandler);
                
                // візуальна позначка скасування
                this.textContent = "✓ Підписку скасовано";
                this.disabled = true;
                btnRemoveTarget.style.opacity = "0.5";
                
                alert("Ви успішно відмовилися від отримання спецпропозицій. Розсилку зупинено.");
            }
        });
    }

    //2а gідсвічування елементів списку
    //Обробник на батьківському <UL>, використання event.target

    let servicesList = document.getElementById("services-list-lab");
    let highlightedItem = null;

    if (servicesList) {
        servicesList.onclick = function (event) {
            // nтут event.target визначає конкретний <li>, на який клікнули
            let target = event.target;

            // якщо клік не по <li> — ігнор
            if (target.tagName !== "LI") return;

            // знімає стилі з попередньо обраного елемента
            if (highlightedItem) {
                highlightedItem.style.background = "";
                highlightedItem.style.fontWeight = "";
                highlightedItem.style.color = "";
            }

            //підсвітка пот. елемент
            target.style.background = "#f97fde";
            target.style.fontWeight = "bold";
            target.style.color = "#5a0050";
            highlightedItem = target;

            console.log("Додано до попереднього розрахунку:", target.textContent);
        };
    }

    //2б меню з data-action та делегування
    //один обробник на контейнер, виклик методів за атрибутом
    class DesignMenu {
        constructor(elem) {
            this._elem = elem;
            elem.onclick = this.onClick.bind(this);
        }

        // методи, що відповідають за пункти меню
        consultation() {
            alert("Залиште свій номер телефону, і ми зв'яжемося з вами для призначення першої безкоштовної зустрічі.");
        }
        portfolio() {
            alert("Завантаження галереї проєктів... (Тут відкриється сторінка з нашими найкращими роботами у стилі Джапанді та Неокласика).");
        }
        contact() {
            alert("Зв'язатися з нами:\nEmail: artarines@gmail.com\nРобочі години: Пн-Пт, 10:00 - 19:00");
        }
        price() {
            alert("Прайс-лист студії:\nКонсультація — безкоштовно\nОбміри та ТЗ — від 2000 грн\nПакет креслень — 300 грн/м²");
        }

        //єдиний обробник/(делегування)
        onClick(event) {
            let action = event.target.dataset.action;
            if (action && typeof this[action] === "function") {
                this[action]();
            }
        }
    }

    let menuElem = document.getElementById("action-menu");
    if (menuElem) {
        new DesignMenu(menuElem);
    }

    //2в прийом «Поведінка»
    // делегування на рівні document через data-behavior

    document.addEventListener("click", function (event) {

        // поведінка 1: підсвітка блоку
        if (event.target.dataset.behavior === "highlight-box") {
            let targetId = event.target.dataset.target;
            let box = document.getElementById(targetId);
            if (box) {
                box.classList.toggle("behavior-highlight");
                //зміна тексту кнопки
                event.target.textContent = box.classList.contains("behavior-highlight")
                    ? "💡 Зняти акцент"
                    : "💡 Акцентувати увагу на секції";
            }
        }

        // поведінка 2: показ/сховати текст (історія студії)
        if (event.target.dataset.behavior === "show-info") 
        {
            let targetId = event.target.dataset.target;
            let infoBlock = document.getElementById(targetId);
            if (infoBlock) {
                infoBlock.hidden = !infoBlock.hidden;
                //зміна тексту кнопки
                event.target.textContent = infoBlock.hidden
                    ? "📖 Більше про Gapchinska interior"
                    : "📖 Сховати історію";
            }
        }

        // Поведінка 3: лічильник (оцінка портфоліо)
        if (event.target.dataset.behavior === "counter") {
            event.target.dataset.count = (+event.target.dataset.count || 0) + 1;
     
            event.target.value = "❤️ Оцінити портфоліо: " + event.target.dataset.count;
        }
    });

// 8 лаба
// --- Drag'n'Drop фото-карток ---

    let galleryArea = document.getElementById("gallery-area");

    if (galleryArea) {

        let dragCard  = null;  // картка яку зараз тягнемо
        let shiftX    = 0;
        let shiftY    = 0;

        // mousedown на будь-якій картці всередині gallery-area
        galleryArea.addEventListener("mousedown", function (event) {
            // знаходимо картку по якій клікнули (або її дочірній елемент)
            let card = event.target.closest(".photo-card");
            if (!card) return;

            dragCard = card;

            shiftX = event.clientX - card.getBoundingClientRect().left;
            shiftY = event.clientY - card.getBoundingClientRect().top;

            // піднімаємо картку поверх інших
            card.style.zIndex = 10;
            card.style.cursor = "grabbing";
            card.style.boxShadow = "0 8px 24px rgba(144,16,119,0.35)";
            card.style.transform = "rotate(2deg)";

            event.preventDefault();
        });

        // mousemove — рухаємо картку
        galleryArea.addEventListener("mousemove", function (event) {
            if (!dragCard) return;

            let areaRect = galleryArea.getBoundingClientRect();

            let newLeft = event.clientX - areaRect.left - shiftX;
            let newTop  = event.clientY - areaRect.top  - shiftY;

            // не даємо картці вийти за межі поля
            newLeft = Math.max(0, Math.min(newLeft, galleryArea.offsetWidth  - dragCard.offsetWidth));
            newTop  = Math.max(0, Math.min(newTop,  galleryArea.offsetHeight - dragCard.offsetHeight));

            dragCard.style.left = newLeft + "px";
            dragCard.style.top  = newTop  + "px";
        });

        // mouseup — відпускаємо картку
        galleryArea.addEventListener("mouseup", function () {
            if (!dragCard) return;

            dragCard.style.zIndex   = "";
            dragCard.style.cursor   = "grab";
            dragCard.style.boxShadow = "";
            dragCard.style.transform = "";

            dragCard = null;
        });

        // якщо курсор вийшов за межі поля — скидаємо
        galleryArea.addEventListener("mouseleave", function () {
            if (!dragCard) return;

            dragCard.style.zIndex    = "";
            dragCard.style.cursor    = "grab";
            dragCard.style.boxShadow = "";
            dragCard.style.transform = "";

            dragCard = null;
        });

        // mouseover/mouseout на картках — підсвітка рамки
        galleryArea.addEventListener("mouseover", function (event) {
            let card = event.target.closest(".photo-card");
            if (!card) return;
            card.classList.add("card-hovered");
        });

        galleryArea.addEventListener("mouseout", function (event) {
            let card = event.target.closest(".photo-card");
            if (!card) return;
            if (card.contains(event.relatedTarget)) return;
            card.classList.remove("card-hovered");
        });

        // блокуємо вбудований drag браузера на зображеннях
        galleryArea.addEventListener("dragstart", function () {
            return false;
        });
    }
});
