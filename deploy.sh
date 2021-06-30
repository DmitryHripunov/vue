#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка приложения
npm run build

# переход в каталог сборки
cd dist

# инициализация репозитория и загрузка кода на GitHab
git init
git add -A
git commit -m "deploy"

git push -f https://github.com/DmitryHripunov/technosaurus.git master:gh-pages

cd -
# ссылка на приложение https://dmitryhripunov.github.io/technosaurus/