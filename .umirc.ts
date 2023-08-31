import { defineConfig } from "umi";

export default defineConfig({
  plugins: ["umi-cesium-plugin"],
  cesium: {
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZTE0YmFlMi02ODc3LTQyYzAtODZmNi0zMjc5ZmQ3YjNmZmUiLCJpZCI6OTk1ODMsImlhdCI6MTY3NTQyMDAyMn0.XpOm_Xbc3Nq2I8KIWtAVd-_1DIxwWlyv9irqsN88hA4",
  },
  routes: [
    { path: "/", component: "index" }
  ],
  npmClient: 'pnpm',
});
