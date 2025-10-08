# 🚀 Настройка GitHub Pages для портфолио

## Быстрый старт

### 1. Создание репозитория на GitHub
1. Перейдите на https://github.com
2. Нажмите "New repository"
3. Название: `portfolio`
4. Описание: "Персональный сайт-портфолио стажера-системного аналитика"
5. Выберите "Public"
6. НЕ добавляйте README, .gitignore или лицензию

### 2. Загрузка кода на GitHub
```bash
# Инициализация git
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: Portfolio website"

# Подключение к GitHub (замените YOUR_USERNAME на ваш username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Переименование ветки в main
git branch -M main

# Отправка на GitHub
git push -u origin main
```

### 3. Настройка GitHub Pages

#### Способ 1: Через GitHub Actions (рекомендуется)
1. Перейдите в Settings → Pages
2. Source: "GitHub Actions"
3. Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Способ 2: Через ветку gh-pages
1. Перейдите в Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: "gh-pages"
4. Выполните команды:

```bash
# Установка gh-pages
npm install --save-dev gh-pages

# Деплой
npm run deploy
```

### 4. Обновление конфигурации

Обновите `astro.config.mjs` с вашими данными:
```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://YOUR_USERNAME.github.io',
  base: '/portfolio',
  build: {
    assets: '_astro'
  },
  output: 'static'
});
```

### 5. Команды для работы

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Деплой на GitHub Pages
npm run deploy

# Предварительный просмотр
npm run preview
```

## 📁 Структура проекта

```
portfolio/
├── .gitignore              # Игнорируемые файлы
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions
├── src/                    # Исходный код
│   ├── components/         # Компоненты
│   ├── layouts/           # Макеты
│   └── pages/             # Страницы
├── public/                 # Статические файлы
├── package.json           # Зависимости
├── astro.config.mjs       # Конфигурация Astro
├── deploy.sh              # Скрипт деплоя (Linux/Mac)
├── deploy.bat             # Скрипт деплоя (Windows)
└── README.md              # Описание проекта
```

## 🌐 Результат

После настройки ваш сайт будет доступен по адресу:
`https://YOUR_USERNAME.github.io/portfolio`

## 🔧 Настройка для вашего репозитория

Замените в файлах:
- `YOUR_USERNAME` → ваш GitHub username
- `portfolio` → название вашего репозитория (если отличается)

## 📝 Полезные ссылки

- [GitHub Pages документация](https://docs.github.com/en/pages)
- [Astro документация](https://docs.astro.build/)
- [Настройка Astro для GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)

## 🆘 Решение проблем

### Проблема: Сайт не отображается
- Проверьте настройки в Settings → Pages
- Убедитесь, что ветка `gh-pages` существует
- Проверьте логи в Actions

### Проблема: Неправильные пути к ресурсам
- Обновите `base` в `astro.config.mjs`
- Убедитесь, что `site` указан правильно

### Проблема: Ошибки сборки
- Проверьте версию Node.js (требуется 16+)
- Удалите `node_modules` и выполните `npm install`
