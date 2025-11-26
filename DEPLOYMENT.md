# Oasis Royal - DigitalOcean Deployment Guide

## Prerequisites

1. **DigitalOcean Droplet**
   - Ubuntu 22.04 LTS
   - 2 GB RAM / 1-2 vCPUs (minimum)
   - 50 GB SSD

2. **Domain Name** (optional but recommended)
   - Point A record to your droplet IP
   - For SSL/HTTPS setup

## Initial Droplet Setup

### 1. SSH into your droplet
```bash
ssh root@your-droplet-ip
```

### 2. Update system packages
```bash
apt update && apt upgrade -y
```

### 3. Install Docker and Docker Compose
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y

# Verify installations
docker --version
docker-compose --version
```

### 4. Create a non-root user (recommended)
```bash
adduser deployer
usermod -aG sudo deployer
usermod -aG docker deployer
su - deployer
```

### 5. Setup firewall
```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 5000/tcp  # Backend (optional, can be removed after nginx setup)
sudo ufw enable
sudo ufw status
```

## Application Deployment

### 1. Clone your repository
```bash
cd ~
git clone https://github.com/DouiriMouheb/OasisRoyal.git
cd OasisRoyal
```

### 2. Configure environment variables
```bash
# Copy example env file
cp .env.example OasisRoyalBack/.env

# Edit the file with your actual values
nano OasisRoyalBack/.env
```

**Required Environment Variables:**
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - Random secure string
- `CLOUDINARY_*` - Your Cloudinary credentials
- `CLIENT_URL` - Your domain or droplet IP
- OAuth credentials (if using)

### 3. Update API URL in frontend

Edit `OasisRoyalFront/src/store/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://your-droplet-ip:5000/api'
```

Or create `OasisRoyalFront/.env`:
```
VITE_API_URL=http://your-droplet-ip:5000/api
```

### 4. Deploy with Docker Compose
```bash
# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

Or manually:
```bash
docker-compose up -d --build
```

### 5. Verify deployment
```bash
# Check running containers
docker-compose ps

# Check logs
docker-compose logs -f

# Test backend
curl http://localhost:5000/health

# Test frontend
curl http://localhost/health
```

## Access Your Application

- **Frontend**: `http://your-droplet-ip`
- **Backend API**: `http://your-droplet-ip:5000/api`
- **API Docs**: `http://your-droplet-ip:5000/api-docs`

## SSL/HTTPS Setup (Production)

### Option 1: Using Certbot (Recommended for simple setup)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Stop docker containers temporarily
docker-compose down

# Get SSL certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Certificates will be in: /etc/letsencrypt/live/yourdomain.com/
```

### Option 2: Using Nginx Container with SSL

1. Create SSL directory:
```bash
mkdir -p nginx/ssl
```

2. Copy your SSL certificates:
```bash
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/key.pem
sudo chmod 644 nginx/ssl/cert.pem
sudo chmod 600 nginx/ssl/key.pem
```

3. Update `nginx/nginx.conf` with your domain name

4. Deploy with nginx profile:
```bash
docker-compose --profile production up -d
```

## Maintenance Commands

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Restart services
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

### Update application
```bash
git pull origin main
./deploy.sh
```

### Stop application
```bash
docker-compose down
```

### Cleanup (remove unused images/containers)
```bash
docker system prune -a
```

### Database backup (if using local MongoDB)
```bash
# Since you're using remote MongoDB, use MongoDB Atlas backup features
```

## Monitoring & Performance

### Check resource usage
```bash
# Container stats
docker stats

# System resources
htop
df -h
free -m
```

### Setup PM2 for process monitoring (alternative to Docker)
If you prefer running Node.js directly:
```bash
npm install -g pm2

# Backend
cd OasisRoyalBack
pm2 start server.js --name oasisroyal-backend
pm2 startup
pm2 save

# Frontend (build first)
cd ../OasisRoyalFront
npm run build
# Serve with nginx or pm2 serve
```

## Troubleshooting

### Backend not connecting to MongoDB
- Check `MONGODB_URI` in `.env`
- Verify MongoDB Atlas IP whitelist (allow your droplet IP or 0.0.0.0/0)
- Check network connectivity: `docker-compose logs backend`

### Frontend not loading
- Check nginx logs: `docker-compose logs frontend`
- Verify build completed: `docker-compose exec frontend ls /usr/share/nginx/html`

### CORS errors
- Update `CLIENT_URL` in backend `.env`
- Check CORS configuration in `backend/server.js`

### Port conflicts
- Stop services using ports 80/5000: `sudo lsof -i :80` or `sudo lsof -i :5000`
- Kill process: `sudo kill -9 <PID>`

### Container won't start
```bash
# Remove all containers and rebuild
docker-compose down -v
docker-compose up -d --build --force-recreate
```

## Security Best Practices

1. **Never commit `.env` files**
2. **Use strong JWT secrets**
3. **Enable UFW firewall**
4. **Use HTTPS in production**
5. **Keep system updated**: `apt update && apt upgrade`
6. **Use MongoDB Atlas IP whitelist**
7. **Regular backups of data**
8. **Monitor logs for suspicious activity**

## Performance Optimization

1. **Enable gzip compression** (already in nginx.conf)
2. **Use CDN for static assets** (Cloudinary for images ✓)
3. **Implement caching** (Redis for sessions/cart)
4. **Optimize images** before upload
5. **Monitor and scale** as traffic grows

## Scaling Recommendations

### When to scale:
- CPU usage consistently > 80%
- Memory usage > 80%
- Response times > 2 seconds
- Error rates increasing

### How to scale:
1. **Vertical scaling**: Upgrade droplet size
2. **Horizontal scaling**: Multiple droplets + load balancer
3. **Database scaling**: MongoDB Atlas clusters
4. **CDN**: CloudFlare for static content

## Support

For issues, check:
1. Container logs: `docker-compose logs`
2. System logs: `journalctl -xe`
3. Nginx logs: `docker-compose exec frontend cat /var/log/nginx/error.log`

---

**Last Updated**: November 2025  
**Maintained by**: Oasis Royal Team
