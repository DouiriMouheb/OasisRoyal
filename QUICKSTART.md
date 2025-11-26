# Oasis Royal - Quick Start Guide

## Local Development

### Backend
```bash
cd OasisRoyalBack
npm install
cp ../.env.example .env
# Edit .env with your values
npm run dev
```

### Frontend
```bash
cd OasisRoyalFront
npm install
npm run dev
```

## Docker Deployment (DigitalOcean)

### Quick Deploy
```bash
# 1. Copy and configure environment
cp .env.example OasisRoyalBack/.env
nano OasisRoyalBack/.env

# 2. Configure frontend API URL
cp OasisRoyalFront/.env.production.example OasisRoyalFront/.env.production
nano OasisRoyalFront/.env.production

# 3. Deploy
chmod +x deploy.sh
./deploy.sh
```

### Manual Deploy
```bash
docker-compose up -d --build
```

## Access Points

- Frontend: http://your-ip
- Backend: http://your-ip:5000
- API Docs: http://your-ip:5000/api-docs

## Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete setup instructions.
