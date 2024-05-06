let basePath;

if (window.location.hostname === 'localhost') {
    basePath = '/';  // Localhost root
} else {
    basePath = '/study-web/';  // GitHub Pages root
}

export const loginUrl = basePath