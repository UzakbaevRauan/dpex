// utils.js

export const cloudinaryUpload = async (images) => {
    // В этом примере функция просто имитирует загрузку изображений на сервер Cloudinary
    // Вы можете заменить эту функцию на реальную загрузку изображений на ваш сервер или на Cloudinary

    // Подождем 2 секунды, чтобы имитировать загрузку изображений
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Возвращаем массив с URL загруженных изображений
    return images.map(image => ({
        secure_url: `https://example.com/${image.name}` // Пример URL загруженного изображения
    }));
};
