// src/services/api.js

// URL dasar untuk backend PHP Anda
const BASE_URL = 'http://eduspace-backend-php.test/api'; // Pastikan ini URL Laragon Anda!

// Fungsi helper untuk menangani respons API
const handleResponse = async (response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        if (!response.ok) {
            // Jika respons tidak OK (misalnya 400, 401, 500), lempar error dengan pesan dari backend
            // Menambahkan penanganan spesifik untuk 401 di sini untuk konsistensi
            if (response.status === 401) {
                throw new Error('401 Unauthorized: Akses ditolak. Token tidak valid atau kedaluwarsa.');
            }
            throw new Error(data.msg || `Server error: ${response.status} ${response.statusText}`);
        }
        return data;
    } else {
        // Jika bukan JSON, baca sebagai teks dan lempar error
        const errorText = await response.text();
        throw new Error(`Server response was not JSON: ${response.status} ${response.statusText} - ${errorText}`);
    }
};

// Fungsi untuk membuat header otentikasi
const getAuthHeaders = (token) => {
    // Menambahkan pengecekan token di sini untuk memastikan token ada sebelum dimasukkan ke header
    if (!token) {
        console.error("Kesalahan: Token tidak ada saat mencoba membuat header otorisasi.");
        // Anda bisa melempar error di sini juga jika mau, tapi handleResponse akan menangani 401 nanti
        return { 'Content-Type': 'application/json' }; // Kembali tanpa Authorization header
    }
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

// --- AUTHENTICATION API CALLS ---

// Pendaftaran Pengguna
export const registerUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/register.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

// Login Pengguna
export const loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/login.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return handleResponse(response);
};

// Mengambil Profil Pengguna (membutuhkan token)
export const getUserProfile = async (token) => {
    const response = await fetch(`${BASE_URL}/user/profile.php`, {
        method: 'GET',
        headers: getAuthHeaders(token),
    });
    return handleResponse(response);
};

// --- USER PROGRESS API CALLS ---

// Mencatat Progres Baru (membutuhkan token)
export const createProgress = async (progressData, token) => {
    const response = await fetch(`${BASE_URL}/progress/index.php`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(progressData),
    });
    return handleResponse(response);
};

// Mengambil Semua Progres Pengguna (membutuhkan token)
export const getAllProgress = async (token) => { // Menggunakan nama ini agar konsisten dengan LearningPage.jsx
    console.log(`[api.js] Mengambil semua progres dari URL: ${BASE_URL}/progress/index.php`);
    const response = await fetch(`${BASE_URL}/progress/index.php`, {
        method: 'GET',
        headers: getAuthHeaders(token),
    });
    return handleResponse(response);
};

// Mengambil Progres Tunggal (membutuhkan token)
export const getSingleUserProgress = async (courseId, lessonId, token) => {
    const response = await fetch(`${BASE_URL}/progress/index.php?course_id=${courseId}&lesson_id=${lessonId}`, {
        method: 'GET',
        headers: getAuthHeaders(token),
    });
    return handleResponse(response);
};

// Memperbarui Progres (membutuhkan token) - DIREVISI agar sesuai dengan LearningPage.jsx
export const updateProgress = async (courseId, lessonId, progressDetails, token) => {
    console.log(`[api.js] Mengirim UPDATE progress untuk courseId: ${courseId}, lessonId: ${lessonId}`);
    const response = await fetch(`${BASE_URL}/progress/index.php`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify({
            course_id: courseId,
            lesson_id: lessonId,
            ...progressDetails // Ini akan menggabungkan status, quizPassed, unlocked, isFreeCourse
        }),
    });
    return handleResponse(response);
};

// Menghapus Progres (membutuhkan token)
export const deleteProgress = async (progressData, token) => {
    const response = await fetch(`${BASE_URL}/progress/index.php`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
        body: JSON.stringify(progressData),
    });
    return handleResponse(response);
};