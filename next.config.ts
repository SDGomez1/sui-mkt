import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL("https://051hypth9e.ufs.sh/**")]
    }
};

export default nextConfig;
