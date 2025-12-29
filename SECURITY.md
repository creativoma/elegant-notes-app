# Security Configuration

## Overview

Elegant Notes App is built with security and privacy as core principles. This document outlines the security measures implemented and configuration requirements.

## Security Headers

Since this application uses static export (`output: 'export'` in next.config.mjs), security headers must be configured at the hosting/web server level.

### Recommended Headers

Configure the following headers on your web server (nginx, Apache, Vercel, Netlify, etc.):

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
```

### Hosting Platform Examples

#### Vercel

Add to `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
        }
      ]
    }
  ]
}
```

#### Netlify

Add to `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
```

#### GitHub Pages

GitHub Pages doesn't support custom headers. Consider using a CDN like Cloudflare in front of GitHub Pages to add security headers.

## Data Security

### Local Storage

- All user data is stored locally in browser localStorage
- Data is never transmitted to external servers
- Uses Zustand with persistence middleware for state management
- No encryption is applied to localStorage (browser-level security)

### XSS Prevention

- React's built-in XSS protection through JSX escaping
- No use of `dangerouslySetInnerHTML`
- No use of `eval()` or similar unsafe functions
- Input sanitization through React's controlled components

### Privacy

- **No Analytics**: Zero tracking, analytics, or telemetry
- **No External Calls**: No API calls to external services
- **No Cookies**: No tracking cookies or session cookies
- **Local Only**: All data stays on the user's device

## Dependency Security

### Regular Audits

Run security audits regularly:

```bash
npm audit
```

### Update Dependencies

Keep dependencies up to date:

```bash
npm update
npm audit fix
```

### Current Status

All dependencies are vetted for:

- Known vulnerabilities (using npm audit)
- Privacy compliance (no data collection)
- Minimal attack surface
- Active maintenance

## Build Security

### TypeScript

- Strict type checking enabled in production builds
- No `any` types allowed in codebase
- Type safety prevents common runtime errors

### Linting

- ESLint configured with security rules
- No unused variables
- Import order enforcement
- Console.log restrictions (warnings only)

### Build Process

```bash
# Development
npm run dev

# Production build (with type & lint checking)
npm run build

# Lint check
npm run lint
```

## Reporting Security Issues

If you discover a security vulnerability, please email the maintainer directly rather than opening a public issue.

## Security Checklist

- [x] No hardcoded secrets or API keys
- [x] No analytics or tracking code
- [x] No external API calls
- [x] React XSS protection active
- [x] No dangerous HTML rendering
- [x] Dependencies audited and secure
- [x] TypeScript strict mode
- [x] ESLint security rules
- [x] Content Security Policy documented
- [x] Security headers documented
- [x] Local storage only
- [x] No cookie usage
- [x] Frame protection
- [x] MIME type sniffing prevention

## Additional Security Measures

### Browser Compatibility

Test security features in:

- Chrome/Edge (Chromium)
- Firefox
- Safari

### Security Headers Testing

Use tools like:

- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)

### Regular Reviews

- Review dependencies quarterly
- Update Next.js and React regularly
- Monitor security advisories
- Test in latest browsers
