
Only the **backend** folder is used here.

---

## 1️⃣ Server Requirements

- Ubuntu 22.04
- PHP 8.3+
- Nginx
- MySQL / PostgreSQL
- Composer
- Node.js (optional for builds)

---

## 2️⃣ Create Droplet

1. Go to DigitalOcean
2. Create Droplet:
   - Ubuntu 22.04
   - Basic plan (1GB is fine to start)
3. SSH into server

---

## 3️⃣ Clone Repository

```bash
cd /var/www
git clone https://github.com/mandeepsng/ai-saas-starter.git
cd ai-saas-starter/backend
````

---

## 4️⃣ Install Dependencies

```bash
composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate
```

---

## 5️⃣ Configure Environment

Edit `.env`:

```
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.example.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=ai_saas
DB_USERNAME=user
DB_PASSWORD=secret
```

---

## 6️⃣ Run Migrations

```bash
php artisan migrate --force
```

---

## 7️⃣ Set Permissions

```bash
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
```

---

## 8️⃣ Nginx Configuration

Create config:

```bash
sudo nano /etc/nginx/sites-available/ai-saas-api
```

Paste:

```nginx
server {
    listen 80;
    server_name api.example.com;

    root /var/www/ai-saas-starter/backend/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/ai-saas-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 9️⃣ Queue Worker (Optional but Recommended)

```bash
php artisan queue:work --daemon
```

Or use **Supervisor** for production.

---

## 🔐 HTTPS (Recommended)

Use Let’s Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.example.com
```

---

## ✅ Result

* API base URL:

  ```
  https://api.example.com/api
  ```
* Frontend can now connect securely

---

## 🧠 Notes

* Backend ignores `/frontend`
* You can deploy updates with `git pull`
* Use Forge / Ploi for easier management

---

## 🎉 Done!

Your Laravel API is now live on DigitalOcean.

````

---

## ✅ What to do next (IMPORTANT)

1. Commit these files:
```bash
git add docs/
git commit -m "docs: add Vercel and DigitalOcean deployment guides"
git push
````

2. Link them in your `README.md`

---
