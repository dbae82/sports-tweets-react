const url = 'https://sportstweetsapi.herokuapp.com/api/v1/teams';

class Team {
    static all() {
        return fetch(url).then(response => response.json());
    }
};

export default Team;