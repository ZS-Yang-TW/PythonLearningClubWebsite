import { request } from './request';

export type UserRegisterData = {
    username: string;
    email: string;
    password: string;
};

export type UserLoginData = {
    username: string;
    password: string;
};

export type UserId = {
    id: number;
};

export const createUser = async (userData: UserRegisterData) => {
    try {
        const response = await request.post('/api/v1/users/', userData);
        return response.data;
    } catch (error : any) {

        if (error.response) {
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data.detail);
        } else if (error.request) {
            console.error('No response:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
};

export const getUser = async (userId: UserId) => {
    try {
        const response = await request.get(`/api/v1/users/${userId.id}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data.detail);
        } else if (error.request) {
            console.error('No response:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
};

export const loginUser = async (userData: UserLoginData) => {
    try {
        const response = await request.post('api/v1/login/access-token', userData);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data.detail);
        } else if (error.request) {
            console.error('No response:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
}
