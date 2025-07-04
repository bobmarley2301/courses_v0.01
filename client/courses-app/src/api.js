const API_BASE_URL = "https://courses-v0-01.onrender.com/api";

// Функції для роботи з курсами
export async function getCourses() {
  const userId = localStorage.getItem("userId");
  const response = await fetch(`${API_BASE_URL}/course`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: userId,
    },
  });

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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseData),
  });
  if (!response.ok) {
    throw new Error(`Error creating course: ${response.statusText}`);
  }
  return response.json();
}

export async function deleteCourse(courseId) {
  const response = await fetch(`${API_BASE_URL}/course/${courseId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Error deleting course: ${response.statusText}`);
  }
  return response.json();
}

// Функції для роботи з відео
export async function getVideo(courseId, videoId) {
  const response = await fetch(
    `${API_BASE_URL}/course/${courseId}/video/${videoId}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching video: ${response.statusText}`);
  }
  return response.json();
}

export async function createVideo(courseId, videoData) {
  const response = await fetch(`${API_BASE_URL}/course/${courseId}/video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(videoData),
  });
  if (!response.ok) {
    throw new Error(`Error creating video: ${response.statusText}`);
  }
  return response.json();
}

export async function deleteVideo(courseId, videoId) {
  const response = await fetch(
    `${API_BASE_URL}/course/${courseId}/video/${videoId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error(`Error deleting video: ${response.statusText}`);
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = new Error("Помилка реєстрації");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function updateUser(userId, userData) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(`Error updating user: ${response.statusText}`);
  }
  return response.json();
}

export async function loginUser(userData) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = new Error("Помилка авторизації");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function executeCode(code, language) {
  const response = await fetch(`${API_BASE_URL}/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, language }),
  });

  if (!response.ok) {
    throw new Error(`Помилка виконання коду: ${response.statusText}`);
  }

  return response.json();
}
