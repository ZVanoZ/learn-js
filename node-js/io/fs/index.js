/**
 * Из книги:
 * Томас Хантер II, Брайан Инглиш
 * Многопоточный JavaScript
 *
 * Глава: Конкурентность и параллелизм
 * Пример: стр.24 Конкурентное чтение из файлов в Node.js
 */
import fs from 'fs/promises';

async function getNum(filename) {
    return parseInt(await fs.readFile(filename, 'utf8'), 10);
}

try {
    const numberPromises = [1, 2, 3].map(i => getNum(`${i}.txt`));
    const numbers = await Promise.all(numberPromises);
    console.log(numbers[0] + numbers[1] + numbers[2]);
} catch (err) {
    console.error('Что-то не так:');
    console.error(err);
}