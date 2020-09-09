const users = {
    fetchUsers: async() => {
        const res = await fetch('http://localhost:5000/data');
        let data = await res.json();
        return data;
    },
};

export default users;