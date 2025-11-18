/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WORDPRESS_API_URL: string
    // Add more environment variables here as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
