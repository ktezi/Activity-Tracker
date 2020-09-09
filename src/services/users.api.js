const users = {
    fetchUsers: async() => {
        const res = await fetch('https://fake-rst-api.herokuapp.com/data');
        let data = await res.json();
        return data;
    },
};

export default users;