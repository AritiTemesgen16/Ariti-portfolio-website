import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads', 'profile');
const MANIFEST_PATH = path.join(UPLOADS_DIR, 'manifest.json');
const DEFAULT_PHOTO_PATH = '/src/assets/images/ariti_actual_white_suit_studio_1786201703704.jpg';

interface ProfilePhotoManifest { activeFilename: string | null; originalName: string | null; mimeType: string | null; updatedAt: number; }

function ensureUploadsDirectory() {
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function readManifest(): ProfilePhotoManifest {
  try {
    ensureUploadsDirectory();
    if (fs.existsSync(MANIFEST_PATH)) {
      const parsed = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
      if (parsed && parsed.activeFilename) {
        const activePath = path.join(UPLOADS_DIR, parsed.activeFilename);
        if (fs.existsSync(activePath) && fs.statSync(activePath).size > 0) return parsed;
      }
      if (parsed && parsed.activeFilename === null) return parsed;
    }
    if (fs.existsSync(UPLOADS_DIR)) {
      const files = fs.readdirSync(UPLOADS_DIR)
        .filter(f => f.startsWith('profile_') && !f.endsWith('.json'))
        .filter(f => { try { return fs.statSync(path.join(UPLOADS_DIR, f)).size > 0; } catch { return false; } })
        .map(f => ({ filename: f, mtime: fs.statSync(path.join(UPLOADS_DIR, f)).mtimeMs }))
        .sort((a, b) => b.mtime - a.mtime);
      if (files.length > 0) {
        const latest = files[0];
        const ext = path.extname(latest.filename).toLowerCase();
        const mimeMap: Record<string, string> = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif' };
        const recovered: ProfilePhotoManifest = { activeFilename: latest.filename, originalName: 'custom_profile_photo', mimeType: mimeMap[ext] || 'image/jpeg', updatedAt: Math.floor(latest.mtime) || Date.now() };
        writeManifest(recovered);
        return recovered;
      }
    }
  } catch (err) { console.error('[PROFILE PHOTO MANIFEST READ ERROR]', err); }
  return { activeFilename: null, originalName: null, mimeType: null, updatedAt: 0 };
}

function writeManifest(manifest: ProfilePhotoManifest) {
  ensureUploadsDirectory();
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json({ limit: '10mb' }));

  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  const ipRateLimitMap = new Map<string, { count: number; resetTime: number }>();

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', developer: 'Ariti Temesgen Wayu', timestamp: new Date().toISOString(), environment: process.env.NODE_ENV || 'development' });
  });

  // Public users may read the profile photo, but profile-photo mutations are owner-only and disabled here.
  app.use('/api/profile-photo', (req: Request, res: Response, next: NextFunction) => {
    if (['POST', 'DELETE', 'PUT', 'PATCH'].includes(req.method)) {
      res.status(403).json({ error: 'Profile photo changes are restricted to the site owner.' });
      return;
    }
    next();
  });

  app.get('/api/profile-photo/active', (_req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    const manifest = readManifest();
    if (manifest.activeFilename) {
      const filePath = path.join(UPLOADS_DIR, manifest.activeFilename);
      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        res.json({ success: true, url: `/api/profile-photo/image?t=${manifest.updatedAt}`, isCustom: true, updatedAt: manifest.updatedAt });
        return;
      }
    }
    res.json({ success: true, url: '/api/profile-photo/image?default=1', isCustom: false, updatedAt: 0 });
  });

  app.get('/api/profile-photo/image', (req: Request, res: Response) => {
    const isExplicitDefault = req.query.default === '1';
    const manifest = readManifest();
    if (!isExplicitDefault && manifest.activeFilename) {
      const filePath = path.join(UPLOADS_DIR, manifest.activeFilename);
      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        res.setHeader('Content-Type', manifest.mimeType || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400, must-revalidate');
        res.sendFile(filePath);
        return;
      }
    }
    const defaultDiskPath = path.join(process.cwd(), 'src/assets/images/ariti_actual_white_suit_studio_1786201703704.jpg');
    if (fs.existsSync(defaultDiskPath)) {
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400, must-revalidate');
      res.sendFile(defaultDiskPath);
    } else res.redirect(DEFAULT_PHOTO_PATH);
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    const clientIp = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const ipKey = String(clientIp);
    const now = Date.now();
    const windowMs = 15 * 60 * 1000;
    const rateData = ipRateLimitMap.get(ipKey);
    if (rateData && now < rateData.resetTime) {
      if (rateData.count >= 5) { res.status(429).json({ error: 'Too many contact requests from this IP. Please try again in 15 minutes.' }); return; }
      rateData.count += 1;
    } else ipRateLimitMap.set(ipKey, { count: 1, resetTime: now + windowMs });

    const { name, email, company, serviceType, budget, timeline, message, additionalInfo, honeypot } = req.body || {};
    if (honeypot) { res.status(200).json({ success: true, message: 'Message sent successfully.' }); return; }
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) { res.status(400).json({ error: 'Please provide a valid name between 2 and 100 characters.' }); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim()) || email.length > 150) { res.status(400).json({ error: 'Please provide a valid email address.' }); return; }
    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 2000) { res.status(400).json({ error: 'Please enter a message between 10 and 2000 characters.' }); return; }

    const leadRecord = {
      id: `lead_${Date.now()}`,
      name: name.trim().slice(0, 100), email: email.trim().slice(0, 150),
      company: company && String(company).trim() ? String(company).trim().slice(0, 150) : 'N/A',
      serviceType: serviceType && String(serviceType).trim() ? String(serviceType).trim().slice(0, 100) : 'General Inquiry',
      budget: budget && String(budget).trim() ? String(budget).trim().slice(0, 100) : 'Flexible',
      timeline: timeline && String(timeline).trim() ? String(timeline).trim().slice(0, 100) : 'Flexible',
      message: message.trim().slice(0, 2000),
      additionalInfo: additionalInfo && String(additionalInfo).trim() ? String(additionalInfo).trim().slice(0, 1000) : 'None provided',
      receivedAt: new Date().toISOString()
    };
    const emailBodyText = `NEW PROJECT INQUIRY\n\nName: ${leadRecord.name}\nEmail: ${leadRecord.email}\nCompany: ${leadRecord.company}\nProject type: ${leadRecord.serviceType}\nBudget: ${leadRecord.budget}\nTimeline: ${leadRecord.timeline}\n\nProject description:\n${leadRecord.message}\n\nAdditional information:\n${leadRecord.additionalInfo}`;
    const isProduction = process.env.NODE_ENV === 'production';
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactDestination = process.env.CONTACT_EMAIL;
    if (isProduction && (!resendApiKey || !contactDestination)) { res.status(500).json({ error: 'Unable to deliver message at this time. Please try again later or contact me directly.' }); return; }
    const recipientEmail = contactDestination || 'arititemesgen16@gmail.com';
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const { data, error } = await resend.emails.send({ from: 'Portfolio Inquiries <onboarding@resend.dev>', to: [recipientEmail], replyTo: leadRecord.email, subject: `NEW PROJECT INQUIRY: ${leadRecord.serviceType} from ${leadRecord.name}`, text: emailBodyText });
        if (error) { console.error('[EMAIL DELIVERY ERROR]', error); res.status(500).json({ error: 'Unable to deliver message at this time. Please try again later or contact me directly.' }); return; }
        console.log('[EMAIL DELIVERED VIA RESEND]', data);
      } catch (err: unknown) { console.error('[EMAIL EXCEPTION]', err); res.status(500).json({ error: 'Unable to deliver message at this time. Please try again later or contact me directly.' }); return; }
    }
    res.status(200).json({ success: true, message: `Thank you ${leadRecord.name}. Your message has been sent successfully! Ariti will reply to ${leadRecord.email} within 24 hours.`, referenceId: leadRecord.id });
  });

  // Canonical production sitemap: every URL belongs to the verified .com property.
  app.get('/sitemap.xml', (_req: Request, res: Response) => {
    const baseUrl = 'https://arititemesgen.com';
    const today = new Date().toISOString().split('T')[0];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${baseUrl}/projects</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/projects/melala-pharmaceutical</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/projects/smartspend</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/projects/agriconnect-ethiopia</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/projects/pharmacore-ethiopia</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/services</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/about</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${baseUrl}/contact</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  app.get('/robots.txt', (_req: Request, res: Response) => {
    res.header('Content-Type', 'text/plain');
    res.send(`User-agent: *\nAllow: /\nSitemap: https://arititemesgen.com/sitemap.xml\n`);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on http://0.0.0.0:${PORT}`));
}

startServer();
