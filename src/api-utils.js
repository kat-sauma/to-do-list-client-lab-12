import request from 'superagent';

const URL = 'https://kats-to-do-list.herokuapp.com';

export async function signUpUser(email, password) {
    const response = await request
        .post(`${URL}/auth/signup`)
        .send({ email, password })
    return response.body;
}

export async function loginUser(email, password) {
    const response = await request
        .post(`${URL}/auth/signin`)
        .send({ email, password })

    return response.body;
}
export async function addTodo(todo, importance, token) {
    const response = await request
        .post(`${URL}/api/to-dos`)
        .set('Authorization', token)
        .send({ todo, importance })

    return response.body;
}

export async function getTodos(token) {
    const response = await request
        .get(`${URL}/api/to-dos`)
        .set('Authorization', token)

    return response.body;
}


export async function completeTodo(todoId, token) {
    const response = await request
        .put(`${URL}/api/to-dos/${todoId}`)
        .set('Authorization', token)

    return response.body;
}