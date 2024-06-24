const API_BASE_URL = 'http://localhost:4441/api'; // URL вашого бекенду

// Функції для роботи з курсами
export async function getCourses() {
    const response = await fetch(`${API_BASE_URL}/course`);
    if (!response.ok) {
        throw new Error(`Error fetching courses: ${response.statusText}`);
    }
    return response.json();
}

export async function getCourse(courseId) {
    const response = await fetch(`${API_BASE_URL}/course/${courseId}`);
    if (!response.ok) {
        throw new Error(`Error fetching course: ${response.statusText}`);
    }
    return response.json();
}

export async function createCourse(courseData) {
    const response = await fetch(`${API_BASE_URL}/course`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
    });
    if (!response.ok) {
        throw new Error(`Error creating course: ${response.statusText}`);
    }
    return response.json();
}

// Функції для роботи з відео
export async function getVideo(courseId, videoId) {
    const response = await fetch(`${API_BASE_URL}/course/${courseId}/video/${videoId}`);
    if (!response.ok) {
        throw new Error(`Error fetching videos: ${response.statusText}`);
    }
    return response.json();
}

export async function createVideo(courseId, videoData) {
    const response = await fetch(`${API_BASE_URL}/course/${courseId}/video`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(videoData),
    });
    if (!response.ok) {
        throw new Error(`Error creating video: ${response.statusText}`);
    }
    return response.json();
}

// Функції для роботи з користувачами
export async function getUsers() {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
    }
    return response.json();
}

export async function createUser(userData) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error(`Error creating user: ${response.statusText}`);
    }
    return response.json();
}

export async function loginUser(userData) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error(`Error logging in: ${response.statusText}`);
    }
    return response.json();
}
