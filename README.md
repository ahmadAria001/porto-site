
# Porto Site - Vue.js Portfolio Application

## Project Description

This repository hosts a modern web application built with Vue.js 3, designed as a personal portfolio site. It showcases various web development skills through a clean architecture, efficient state management, and a responsive user interface.

## Features

*   **Responsive User Interface**: An intuitive and responsive interface designed for various screen sizes.
*   **Dynamic Routing**: Utilizes Vue Router for seamless and efficient navigation between different sections/pages.
*   **State Management**: Implements Pinia for robust and scalable state management across the application.
*   **UI Components**: Built with `reka-ui` and other modern UI components for a consistent and appealing design.
*   **Transitions & Suspense**: Enhances user experience with smooth page transitions and efficient handling of asynchronous operations.
*   **Image Generation (Optional)**: Includes integration with the Google Gemini API for image generation, demonstrating AI integration capabilities.

## Technologies Used

*   **Vue.js 3**: The progressive JavaScript framework for building user interfaces.
*   **Vue Router**: Official routing library for Vue.js.
*   **Pinia**: The official state management library for Vue.js.
*   **TypeScript**: For type-safe JavaScript development.
*   **Vite**: Next-generation frontend tooling for a fast development experience.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
*   **@google/genai**: For AI-powered image generation capabilities.
*   **reka-ui**: A UI component library used for building the interface.
*   **@vueuse/core**: Collection of essential Vue Composition API utilities.
*   **lucide-vue-next**: A comprehensive icon library for Vue.js.
*   **@tanstack/vue-table**: For building powerful and flexible data tables.
*   **Vitest**: A fast unit testing framework for Vue.js applications.
*   **Oxlint & ESLint**: For robust code linting and ensuring code quality.
*   **Prettier**: For consistent code formatting.

## Setup and Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/porto-site.git
    cd porto-site
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
    or
    ```bash
    pnpm install
    ```

3.  **Configure Environment Variables**:
    If you plan to use the image generation feature, create a `.env` file in the root of the project and add your Google Gemini API key:
    ```
    VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```
    *Replace `YOUR_GEMINI_API_KEY` with your actual API key obtained from Google Cloud Console or AI Studio.*

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
    or
    ```bash
    pnpm dev
    ```

    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable Vue components
│   │   ├── ui/             # UI component library (e.g., reka-ui components)
│   │   └── ...
│   ├── router/             # Vue Router configuration
│   ├── stores/             # Pinia stores for state management
│   ├── views/              # Vue components for different routes/pages
│   ├── App.vue             # Main application component
│   └── main.ts             # Entry point of the application
├── .env.example            # Example environment variables
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── README.md               # Project description
└── tsconfig.json           # TypeScript configuration
```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is open-sourced under the MIT License.
