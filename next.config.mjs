/** @type {import('next').NextConfig} */
const nextConfig = {
  // Полностью статический экспорт — готовый HTML, который Яндекс гарантированно
  // индексирует, и который разворачивается на любом российском хостинге/CDN.
  output: "export",
  trailingSlash: true,
  images: {
    // при output: 'export' оптимизатор картинок Next недоступен
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
