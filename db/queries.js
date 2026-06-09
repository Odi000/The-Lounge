const pool = require('./pool');
const { formatDate } = require('./functions');

module.exports = {
    getAllColumnsUsers: async () => {
        const { rows } = await pool.query("SELECT * FROM users");
        console.log(rows);
    },
    createUser: async (username, email, hashedPassword, psw_as_entered) => {
        try {
            const query = "INSERT INTO users (username,email,password,psw_as_entered) VALUES ($1,$2,$3,$4);"
            const values = [username, email, hashedPassword, psw_as_entered];
            const result = await pool.query(query, values);

            if (result.rowCount === 0) {
                throw new Error('Failed to create user');
            }

            return result;
        } catch (error) {
            if (error.code === '23505') {
                throw new Error('This username is already taken');
            }
        }
    },
    getUserByUsername: async (username) => {
        const query = "SELECT * FROM users WHERE username = $1"
        const values = [username];
        const { rows } = await pool.query(query, values);
        const user = rows[0]

        return user;
    },
    getUserById: async (id) => {
        const query = "SELECT * FROM users WHERE id = $1"
        const values = [id];
        const { rows } = await pool.query(query, values);
        const user = rows[0]

        return user;
    },
    getAllPosts: async () => {
        const query = `SELECT posts.title,posts.content,posts.created_at,users.username AS author
                FROM posts
                INNER JOIN users
                ON posts.author_id = users.id;
        `;
        const { rows } = await pool.query(query);

        for (const row of rows) {
            row.created_at = formatDate(row.created_at);
        }

        return rows;
    },
    createPost: async ({ author_id, title, content, created_at }) => {
        const query = "INSERT INTO posts (title,content,author_id,created_at) VALUES ($1,$2,$3,$4)";
        const values = [title, content, author_id, created_at];
        const result = (await pool.query(query, values)).rowCount;

        return result;
    },
    becomeMember: async (userId) => {
        const query = `UPDATE users
                SET is_member = true
                WHERE id = $1;`;
        const values = [userId];
        const result = await pool.query(query, values);

        console.log(result);
        return result;
    }
}