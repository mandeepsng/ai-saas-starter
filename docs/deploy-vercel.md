---

# 📄 `/docs/deploy-vercel.md`

```md
# 🚀 Deploy Frontend (SvelteKit) to Vercel

This guide explains how to deploy the **frontend** of this monorepo to **Vercel**.

The backend (Laravel API) is deployed separately.

---

## 📁 Project Structure

```

ai-saas-starter/
├── backend/   (Laravel API)
├── frontend/  (SvelteKit app)

```

Vercel will only use the **frontend** folder.

---

## 1️⃣ Prerequisites

- GitHub account
- Vercel account
- Backend API already deployed (or URL ready)

Example API URL:
```

[https://api.example.com](https://api.example.com)

```

---

## 2️⃣ Import Project into Vercel

1. Go to https://vercel.com
2. Click **New Project**
3. Import your GitHub repository:
```

mandeepsng/ai-saas-starter

```

---

## 3️⃣ Configure Vercel Settings (IMPORTANT)

### Project Settings

| Setting | Value |
|------|------|
Framework Preset | SvelteKit |
Root Directory | `frontend` |
Build Command | `npm run build` |
Install Command | `npm install` |
Output Directory | (auto-detected) |

---

## 4️⃣ Environment Variables

Go to:
```

Vercel → Project → Settings → Environment Variables

```

Add:

```

VITE_API_BASE_URL=[https://api.example.com](https://api.example.com)

````

> ⚠️ Must start with `VITE_` for SvelteKit.

---

## 5️⃣ Update API Config in Svelte

Example file:
```ts
// frontend/src/lib/config.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
````

Use it in requests:

```ts
fetch(`${API_BASE_URL}/api/user`);
```

---

## 6️⃣ Deploy

Click **Deploy** 🚀

Vercel will:

* Ignore `/backend`
* Build only `/frontend`
* Deploy globally via CDN

---

## ✅ Result

* Frontend URL:

  ```
  https://your-app.vercel.app
  ```
* API calls go to:

  ```
  https://api.example.com
  ```

---

## 🧠 Notes

* Frontend & backend are fully decoupled
* You can redeploy frontend anytime without touching backend
* Custom domains can be added in Vercel

---

## 🆘 Common Issues

❌ API not reachable
👉 Check `VITE_API_BASE_URL`

❌ 404 on refresh
👉 Ensure SvelteKit adapter is configured correctly

---

## 🎉 Done!

Your Svelte frontend is now live on Vercel.

````

---

# 📄 `/docs/deploy-digitalocean.md`

```md
# 🚀 Deploy Backend (Laravel API) to DigitalOcean

This guide explains how to deploy the **Laravel backend** to a **DigitalOcean Droplet**.

Frontend (SvelteKit) is deployed separately (e.g. Vercel).

---

## 📁 Project Structure

````

ai-saas-starter/
├── backend/   (Laravel API)
├── frontend/  (SvelteKit)

````

