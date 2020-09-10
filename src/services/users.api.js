
const users = {
    fetchUsers: async () => {
        const res = await fetch('https://fake-rst-api.herokuapp.com/data');
        let data = res.json();
        return data;
    },
};

export default users;