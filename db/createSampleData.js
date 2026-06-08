const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const DATABASE_URL = "postgresql://odi000:1997@localhost:5432/the_longue";
const { loremIpsum } = require('lorem-ipsum');

const pool = new Pool({
    connectionString: DATABASE_URL
})



const usernameBase = 'username';
const email = 'example@email.com';
const psw_as_entered = 'password';
const hashedPassword = '$2b$04$GO.a6u0LuijE7.lb3Zj/xuN7d7fnDpvpKvugsx7t/uPWUlANYxxBK';

// createUsers()
// console.log(loremIpsum({
//     count: 9,
//     units: "sentences"
// }).length)
createPosts();

async function createUsers() {
    let result;
    for (let i = 0; i < 4; i++) {
        const username = usernameBase + i;
        const checkIfExists = (await pool.query("SELECT username FROM users WHERE username = $1", [username])).rows[0];

        if (checkIfExists) continue;

        const query = "INSERT INTO users (username,email,password,psw_as_entered) VALUES ($1,$2,$3,$4);";
        const values = [username, email, hashedPassword, psw_as_entered];

        result = (await pool.query(query, values)).rowCount;

        console.log('New Users created: ' + result);
    }
}

async function createPosts() {
    let result = 0;
    const users = (await pool.query("SELECT id,username FROM users WHERE username LIKE 'username%'")).rows;
    console.log(users);
    try {
        for (const user of users) {
            const values = generatePost(user.id);
            result += (await pool.query("INSERT INTO posts (title,content,author,created_at) VALUES ($1,$2,$3,$4)", values)).rowCount;
        }
        console.log('New posts created' + result);
    } catch (err) {
        console.log(err.message);
    } finally {
        console.log('Bac u kry!')
    }
}

function generatePost(authorId) {
    const title = loremIpsum({
        count: generateRandomNumber(3, 5),
        units: "words"
    });
    const content = loremIpsum({
        count: generateRandomNumber(3, 9),
        units: "sentences"
    });

    const created_at = new Date().toISOString();

    return [title, content, authorId, created_at];
}

function generateRandomNumber(min = 0, max = 10) {
    const difference = max - min + 1;
    return Math.floor(Math.random() * difference + min);
}