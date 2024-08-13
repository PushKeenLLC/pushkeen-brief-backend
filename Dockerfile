# Используем официальный образ Node.js
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код приложения
COPY . .

# Открываем порт, на котором будет работать приложение
EXPOSE 5051

# Запускаем приложение через скрипт
CMD [ "node", "server.js" ]