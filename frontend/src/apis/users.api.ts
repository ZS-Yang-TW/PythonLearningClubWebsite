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

export const userLogin = async (userData: UserLoginData) => {
    try {

        // 使用 URLSearchParams 來處理表單資料
        const formBody = new URLSearchParams(userData).toString();

        // 指定 Content-Type 為 application/x-www-form-urlencoded
        const response = await request.post('api/v1/login/access-token', formBody, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
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
