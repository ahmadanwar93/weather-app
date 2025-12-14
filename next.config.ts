import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

const withNextIntl = require("next-intl/plugin")("./i18n/request.ts");

module.exports = withNextIntl(nextConfig);
