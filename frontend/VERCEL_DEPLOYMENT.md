# 🚀 Vercel Frontend Deployment Guide

## Prerequisites
- Vercel account: [vercel.com](https://vercel.com)
- Vercel CLI: `npm install -g vercel`
- React app built and tested locally

## Deployment Methods

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Frontend Directory**
   ```bash
   cd d:\Ecom\frontend
   vercel
   ```

4. **Follow CLI Prompts**
   ```
   ? Set up and deploy "~/frontend"? [Y/n] y
   ? Which scope do you want to deploy to? Your Personal Account
   ? Link to existing project? [y/N] n
   ? What's your project's name? ecommerce-frontend
   ? In which directory is your code located? ./
   ```

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Method 2: Vercel Dashboard (Git Integration)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Vercel configuration"
   git push origin dev
   ```

2. **Import Project**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Select your GitHub repository
   - Configure build settings:
     - **Framework Preset**: Create React App
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`

## Environment Variables

### Add in Vercel Dashboard
1. Go to Project Settings → Environment Variables
2. Add the following:

```
REACT_APP_API_URL = https://your-backend.herokuapp.com
```

## Build Configuration

The `vercel.json` file is already configured with:
- Static file caching for performance
- SPA routing support (all routes → index.html)
- Optimized build settings

## Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to Project → Settings → Domains
   - Add your custom domain

2. **Configure DNS**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or use Vercel nameservers for full management

## Performance Optimization

The deployment includes:
- ✅ **Code Splitting**: Automatic with Create React App
- ✅ **Static Asset Caching**: 1 year cache for static files
- ✅ **Compression**: Automatic gzip compression
- ✅ **Global CDN**: Vercel's edge network
- ✅ **Tree Shaking**: Unused code elimination

## Testing Your Deployment

### Automatic Tests
```bash
# Run before deployment
npm test -- --coverage --watchAll=false
npm run build
```

### Manual Testing
1. **Homepage**: Should load product listings
2. **Authentication**: Register/Login with OTP
3. **Shopping Cart**: Add/remove products
4. **Responsive Design**: Test on mobile/tablet
5. **API Integration**: Check network requests in DevTools

## Monitoring

### Vercel Analytics (Free)
- Automatic performance monitoring
- Core Web Vitals tracking
- Real User Monitoring

### Function Logs
```bash
vercel logs
```

## Rollback

### Quick Rollback
```bash
vercel rollback [DEPLOYMENT_URL]
```

### Git-based Rollback
1. Revert commit in GitHub
2. Vercel auto-deploys the previous version

## Common Issues

### Build Errors
```bash
# Check build locally first
npm run build

# Check for TypeScript errors
npm run type-check
```

### Environment Variables
- Must start with `REACT_APP_`
- Set in Vercel Dashboard, not in code
- Restart deployment after changing

### API CORS Issues
- Update backend `FRONTEND_URL` environment variable
- Ensure HTTPS URLs match exactly

## Success Checklist

- ✅ Frontend deployed and accessible
- ✅ API calls working (check Network tab)
- ✅ Authentication flow functional
- ✅ Responsive design working
- ✅ Environment variables configured
- ✅ Backend CORS updated with Vercel URL

## Next Steps

1. **Connect Custom Domain**
2. **Set up Monitoring/Analytics**
3. **Configure CDN caching**
4. **Add PWA features**
5. **Optimize SEO**
