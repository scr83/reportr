# Vercel Deployment Guide for Puppeteer

## Pre-deployment Checklist

Run the deployment test script to verify readiness:
```bash
./scripts/test-deployment.sh
```

All items should show ✅ before proceeding.

## Environment Variables Required

Set these in Vercel dashboard or via CLI:

### Required for Production
```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-domain.vercel.app
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ANTHROPIC_API_KEY=sk-ant-...
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

### Puppeteer-specific (automatically set)
```env
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
```

## Deployment Steps

1. **Verify Configuration**
   ```bash
   ./scripts/test-deployment.sh
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Test PDF Generation**
   - Visit: `https://your-domain.vercel.app/api/test-puppeteer-pdf`
   - Should return a PDF download

4. **Monitor Function Performance**
   - Check Vercel dashboard for function logs
   - Verify memory usage stays under 1024MB
   - Confirm execution time is under 30 seconds

## Performance Optimizations

### Bundle Size
- Total function size: ~45MB (@sparticuz/chromium) + ~5MB (code)
- Stays under Vercel's 50MB limit
- Optimized with .vercelignore

### Memory Allocation
- Allocated: 1024MB (maximum for reliability)
- Chromium needs ~500-700MB
- Remaining ~300-500MB for Node.js

### Timeout Settings
- Set to 30 seconds (maximum allowed)
- Accounts for cold starts (~5-10s) + PDF generation (~10-20s)

## Troubleshooting

### Common Issues

1. **Function timeout**
   - Check if memory allocation is sufficient
   - Verify Chromium is using @sparticuz/chromium (not downloading)

2. **Memory exceeded**
   - Reduce concurrent operations
   - Optimize HTML template complexity

3. **Bundle size exceeded**
   - Verify .vercelignore is excluding unnecessary files
   - Check that puppeteer (full) is not included

### Debug Commands

```bash
# Check function logs
vercel logs your-domain.vercel.app

# Monitor real-time
vercel logs your-domain.vercel.app --follow

# Check specific function
vercel logs your-domain.vercel.app --scope=function
```

## Success Metrics

- ✅ PDF generation completes in <30 seconds
- ✅ Memory usage stays under 1024MB
- ✅ Bundle size under 50MB
- ✅ No timeout errors
- ✅ PDFs render correctly with all content

## Support

If issues persist:
1. Check Vercel function logs
2. Verify environment variables are set correctly
3. Test locally with `./scripts/setup-local-puppeteer.sh`
4. Monitor Vercel status page for platform issues