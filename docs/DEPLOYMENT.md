# 🎉 DEPLOYMENT GUIDE - Agent IA E-Commerce

## 🚀 Quick Deployment (5 minutes)

### Option 1: Docker (Recommended)

```bash
# Build and run
docker-compose up -d

# Access
- API: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard
- Mongo Express: http://localhost:8081
```

### Option 2: Heroku

```bash
# Install Heroku CLI
brewinstall heroku/brew/heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Add buildpacks
heroku buildpacks:add heroku/nodejs

# Set environment variables
heroku config:set OPENAI_API_KEY=sk-xxx
heroku config:set SHOPIFY_ACCESS_TOKEN=shpat_xxx
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# Deploy
git push heroku main

# Logs
heroku logs --tail
```

### Option 3: AWS

```bash
# Using Elastic Beanstalk
eb init
eb create ecommerce-env
eb setenv OPENAI_API_KEY=sk-xxx
eb deploy
```

### Option 4: DigitalOcean

```bash
# Create droplet
doctl compute droplet create ecommerce-ai --region nyc3 --size s-2vcpu-4gb

# SSH into droplet
ssh root@your_droplet_ip

# Clone repo
git clone https://github.com/your-repo
cd Abdoulaye-

# Install Node
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
sudo apt-get install -y mongodb-org

# Install Redis
sudo apt-get install -y redis-server

# Setup app
npm install
cp config/credentials.env.example config/credentials.env
# Edit .env with your keys

# Start with PM2
sudo npm install -g pm2
pm2 start server-complete.js --name "ecommerce-ai"
pm2 startup
pm2 save
```

### Option 5: Google Cloud Run

```bash
# Build container
docker build -t gcr.io/your-project/ecommerce-ai .

# Push to registry
docker push gcr.io/your-project/ecommerce-ai

# Deploy
gcloud run deploy ecommerce-ai \
  --image gcr.io/your-project/ecommerce-ai \
  --platform managed \
  --region us-central1 \
  --set-env-vars OPENAI_API_KEY=sk-xxx
```

## 📋 Pre-Deployment Checklist

- [ ] All API keys configured in `.env`
- [ ] MongoDB database created (local or Atlas)
- [ ] Redis server running
- [ ] Shopify store connected
- [ ] Twilio WhatsApp account set up
- [ ] OpenAI account with credits
- [ ] SSL certificate ready
- [ ] Domain configured
- [ ] Backup strategy in place
- [ ] Monitoring configured

## 🔒 Security Checklist

- [ ] Environment variables not in git
- [ ] HTTPS/TLS enabled
- [ ] Rate limiting configured
- [ ] CORS properly set
- [ ] JWT secrets strong
- [ ] Database backups enabled
- [ ] API keys rotated regularly
- [ ] Logs monitored
- [ ] DDoS protection enabled
- [ ] Firewall rules set

## 📊 Monitoring & Maintenance

### Logs
```bash
# Real-time logs
npm run logs

# Export logs
npm run logs:export
```

### Backups
```bash
# MongoDB backup
mongodump --uri "mongodb://localhost:27017" --out ./backup

# Restore
mongorestore --uri "mongodb://localhost:27017" ./backup
```

### Performance
```bash
# Check uptime
curl http://localhost:3000/health

# Database stats
db.stats()

# Memory usage
free -h
```

## 🎯 Post-Deployment

1. **Test all endpoints**
   ```bash
   npm run test
   ```

2. **Set up alerts**
   - Email notifications
   - Slack integration
   - PagerDuty alerts

3. **Configure backups**
   - Daily database backups
   - Weekly full backups
   - Monthly archives

4. **Enable monitoring**
   - Application Performance Monitoring (APM)
   - Error tracking (Sentry)
   - Log aggregation (ELK Stack)

5. **Setup CI/CD**
   - GitHub Actions
   - Automated tests
   - Automatic deployments

## 🚨 Troubleshooting

### Port Already in Use
```bash
lsof -i :3000
kill -9 <PID>
```

### MongoDB Connection Error
```bash
# Check MongoDB service
sudo systemctl status mongod

# Restart
sudo systemctl restart mongod
```

### High Memory Usage
```bash
# Check processes
ps aux --sort=-%mem

# Kill process
kill -9 <PID>
```

### API Errors
```bash
# Check logs
heroku logs --tail

# Check health
curl http://localhost:3000/health
```

## 🎊 Deployment Success!

Your system is now deployed and ready:

✅ Dashboard live at: https://your-domain.com/dashboard  
✅ API running at: https://your-domain.com/api  
✅ Real-time updates via Socket.io  
✅ Database backups enabled  
✅ Monitoring configured  

---

**Questions? Check docs or contact support!**