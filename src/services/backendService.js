// Backend API Service for EzTravel Full Stack Application
const API_BASE_URL = 'http://localhost:8000/api';

// Helper to get authorization headers
const getHeaders = (contentType = 'application/json') => {
  const headers = {};
  if (contentType) {
    headers['Content-Type'] = contentType;
  }
  const token = localStorage.getItem('eztravel_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Handle response errors
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = 'Something went wrong';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // JSON parsing failed, use status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

export const backendService = {
  // Auth: Register
  async register(name, email, password, passwordConfirmation) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    });
    const data = await handleResponse(response);
    // Save token and user details to localStorage
    if (data.token) {
      localStorage.setItem('eztravel_token', data.token);
      localStorage.setItem('eztravel_user', JSON.stringify(data.user));
    }
    return data;
  },

  // Auth: Login
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);
    // Save token and user details to localStorage
    if (data.token) {
      localStorage.setItem('eztravel_token', data.token);
      localStorage.setItem('eztravel_user', JSON.stringify(data.user));
    }
    return data;
  },

  // Auth: Logout
  async logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: getHeaders(),
      });
      await handleResponse(response);
    } catch (error) {
      console.warn('Logout request to server failed, clearing local session anyway.', error);
    } finally {
      // Always clear local session
      localStorage.removeItem('eztravel_token');
      localStorage.removeItem('eztravel_user');
    }
  },

  // Auth: Get Profile Details
  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const user = await handleResponse(response);
    localStorage.setItem('eztravel_user', JSON.stringify(user));
    return user;
  },

  // Auth: Update Profile Details
  async updateProfile(name, email, password = null, passwordConfirmation = null) {
    const body = { name, email };
    if (password) {
      body.password = password;
      body.password_confirmation = passwordConfirmation;
    }
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await handleResponse(response);
    if (data.user) {
      localStorage.setItem('eztravel_user', JSON.stringify(data.user));
    }
    return data;
  },

  // Favorites: Get list
  async getFavorites() {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // Favorites: Save destination
  async addFavorite(city) {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        city_name: city.name,
        country_name: city.country,
        lat: city.lat,
        lon: city.lon,
        rating: city.rating || null,
        image_url: city.image || null,
      }),
    });
    return handleResponse(response);
  },

  // Favorites: Remove destination
  async removeFavorite(id) {
    const response = await fetch(`${API_BASE_URL}/favorites/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // Admin: Get all users
  async getAdminUsers() {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // Admin: Delete user
  async deleteAdminUser(id) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // Get country details (REST Countries API proxy to bypass CORS)
  async getCountryDetails(countryName) {
    const response = await fetch(`${API_BASE_URL}/country/${encodeURIComponent(countryName)}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // Helper to check authentication state locally
  isAuthenticated() {
    return !!localStorage.getItem('eztravel_token');
  },

  // Helper to get current user locally
  getCurrentUser() {
    const userStr = localStorage.getItem('eztravel_user');
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  }
};
