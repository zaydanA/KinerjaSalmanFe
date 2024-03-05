/** @type {import('next').NextConfig} */
const nextConfig = { }

module.exports = {
  env: {
    API_BASE_URL: "http://localhost:8000/api/v1",

    SSO_URL: "http://localhost:8080/login?serviceURL=http://localhost:8000&callbackURL=http://localhost:8000/api/v1/sign-in-from-sso"
  }
}