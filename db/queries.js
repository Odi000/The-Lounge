const pool = require('./pool');

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
}