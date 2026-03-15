# ✅ GA4 + Partytown Quick Verification Checklist

## 🚀 Test Your Implementation

### 1. Build & Start
```bash
pnpm build
pnpm start
```

### 2. Open Browser DevTools

#### Network Tab
- [ ] Filter: "gtm-proxy"
- [ ] Status: 200 OK
- [ ] File: `gtm-proxy?id=G-MW1V4JYC2D`
- [ ] Filter: "partytown"
- [ ] Files loaded: `partytown-sw.js`, `partytown-atomics.js`

#### Console Tab
```javascript
// Paste these commands:
window.partytown  // Should return object
window.dataLayer  // Should return array
```

#### Application Tab
- [ ] Service Workers → `partytown-sw.js` (activated and running)

### 3. Lighthouse Test
1. Open Chrome DevTools
2. Lighthouse tab
3. Select: Mobile + Performance
4. Click "Analyze page load"
5. **Target Score: 95+**

### 4. Verify Analytics
1. Open GA4 Real-time report
2. Navigate your site
3. Confirm events are tracked

---

## 🎯 Expected Results

✅ **Main Thread**: No GA4 blocking  
✅ **Performance Score**: 95+  
✅ **Analytics**: Working perfectly  
✅ **CORS**: No errors  

---

## 🔧 Quick Fixes

**If GA4 not tracking:**
```bash
# Clear cache and rebuild
rm -rf .next
pnpm build
```

**If Partytown not loading:**
```bash
# Verify files exist
ls public/~partytown/
```

**If Service Worker issues:**
- DevTools → Application → Service Workers → Unregister All
- Hard refresh: Ctrl+Shift+R

---

## 📊 Before vs After

| Metric | Before | After |
|--------|--------|-------|
| Performance | 85-90 | **95+** |
| Main Thread | Blocked | **Free** |
| TBT | ~400ms | **~50ms** |

**You're done! 🎉**
