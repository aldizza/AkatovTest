# 🐾 Cats SPA

Простое и аккуратное одностраничное приложение (SPA) со списком карточек продуктов, построенное с использованием React и TypeScript. В качестве источника данных используется [The Cat API](https://api.thecatapi.com/v1/images/search?limit=10), который возвращает изображения кошек.

проект на GitHub Pages https://aldizza.github.io/AkatovTest

---

## 🚀 Описание проекта

Цель проекта — создать SPA, в котором отображается список карточек. Каждая карточка содержит изображение, полученное с API или добавленную пользователем.

Проект демонстрирует умение работать с глобальным состоянием, маршрутизацией, формами, базовой валидацией и пользовательским интерфейсом.

---

## 🛠️ Технологии и стек

- **React** + **TypeScript**
- **Redux Toolkit** или **Zustand** (на выбор)
- **React Router DOM** — маршрутизация
- **React Icons** (`react-icons/fa`) — иконки лайка и удаления
- **MUI** (`@mui/material/Pagination`) — пагинация
- **React** (кнопки и формы)

---

## 📌 Задачи

### 📦 Задача 1: Список продуктов `/products`

- Отображение списка всех продуктов (карточек)
- У каждой карточки:
  - Иконка ❤️ лайка — добавляет/удаляет из избранного
  - Иконка 🗑️ удаления — удаляет карточку
  - При клике на карточку (кроме иконок) — переход на страницу детали продукта
- Фильтр: Все карточки / Только избранные
- Урезанный текст, чтобы карточки были одной высоты

### 📝 Задача 2: Страница продукта `/products/:id`

- Отображение подробной информации о продукте
- Кнопка для возврата на главную страницу

### ➕ Задача 3: Создание продукта `/create-product`

- Форма с обязательными полями и минимальной валидацией
- После отправки — сохранение данных в store

### Бонусные задачи:
- Пагинация
- Редактирование карточки
---

## 📂 Хранение данных

Все данные (полученные и созданные) сохраняются во **внутреннем store** (Redux Toolkit).

---

## 📸 Используемое API

- [The Cat API](https://api.thecatapi.com/v1/images/search?limit=10) — для получения изображений кошек

---

## 📦 Установка и запуск

```bash
git clone https://github.com/aldizza/AkatovTest.git
cd AkatovTest
npm install
npm start
